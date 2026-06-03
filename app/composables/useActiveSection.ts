/**
 * Scroll-spy: observa las <section id> y expone cuál está activa, para resaltar
 * el nodo correspondiente en la nav (diagrama desktop y pills móviles).
 * Solo corre en cliente (IntersectionObserver no existe en SSR/prerender).
 *
 * Singleton por lista de ids: múltiples consumidores (SidebarNav, MobileNav)
 * comparten un único IntersectionObserver y el mismo estado reactivo.
 *
 * @param ids  ids de las secciones a observar, en orden de aparición.
 */
export function useActiveSection(ids: string[]) {
  // Clave determinista basada en los ids para aislar distintas listas si las hubiera.
  const key = `active-section:${ids.join(',')}`

  // useState de Nuxt: el mismo state se comparte entre todos los componentes
  // que llamen a este composable con los mismos ids.
  const active = useState<string>(key, () => '')

  // El observer solo se crea una vez en cliente (guardado en un Map module-level).
  if (import.meta.client) {
    useObserverOnce(key, ids, active)
  }

  return { active }
}

/**
 * Registra el IntersectionObserver una sola vez por key.
 * Cada instancia posterior reutiliza el observer existente.
 */
const _observers = new Map<string, IntersectionObserver>()

// Pending rAF handle per key — used to cancel on disconnect.
const _rafHandles = new Map<string, number>()

function useObserverOnce(key: string, ids: string[], active: Ref<string>) {
  onMounted(() => {
    if (_observers.has(key)) return

    const observer = new IntersectionObserver(
      (entries) => {
        // Coalesce multiple synchronous entries into one state write per frame.
        // Any pending rAF for this key is cancelled so only the last batch wins.
        const pending = _rafHandles.get(key)
        if (pending !== undefined) cancelAnimationFrame(pending)

        // Snapshot the intersecting ids from this batch.
        const intersecting: string[] = []
        for (const entry of entries) {
          if (entry.isIntersecting) intersecting.push(entry.target.id)
        }

        if (intersecting.length === 0) return

        const handle = requestAnimationFrame(() => {
          _rafHandles.delete(key)
          // Write only the last intersecting entry to keep behavior identical
          // to the original (last writer wins across entries in a batch).
          const last = intersecting[intersecting.length - 1]
          if (last !== undefined) active.value = last
        })

        _rafHandles.set(key, handle)
      },
      { rootMargin: '-40% 0px -50% 0px' }
    )

    for (const id of ids) {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    }

    _observers.set(key, observer)
  })

  onBeforeUnmount(() => {
    // Only disconnect when no live component still uses this key.
    // Nuxt does not provide a ref-count per useState, so we track it manually.
    const count = (_mountCount.get(key) ?? 0) - 1
    _mountCount.set(key, count)
    if (count <= 0) {
      // Cancel any pending rAF before disconnecting the observer.
      const pending = _rafHandles.get(key)
      if (pending !== undefined) {
        cancelAnimationFrame(pending)
        _rafHandles.delete(key)
      }
      _observers.get(key)?.disconnect()
      _observers.delete(key)
      _mountCount.delete(key)
    }
  })

  // Increment mount counter.
  onMounted(() => {
    _mountCount.set(key, (_mountCount.get(key) ?? 0) + 1)
  })
}

const _mountCount = new Map<string, number>()
