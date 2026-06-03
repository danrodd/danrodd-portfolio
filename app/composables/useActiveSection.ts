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

function useObserverOnce(key: string, ids: string[], active: Ref<string>) {
  onMounted(() => {
    if (_observers.has(key)) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) active.value = entry.target.id
        }
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
    // Solo desconectar cuando no queda ningún componente vivo que use este key.
    // Como Nuxt no provee un ref-count por useState, usamos un contador manual.
    const count = (_mountCount.get(key) ?? 0) - 1
    _mountCount.set(key, count)
    if (count <= 0) {
      _observers.get(key)?.disconnect()
      _observers.delete(key)
      _mountCount.delete(key)
    }
  })

  // Incrementar contador al montar.
  onMounted(() => {
    _mountCount.set(key, (_mountCount.get(key) ?? 0) + 1)
  })
}

const _mountCount = new Map<string, number>()
