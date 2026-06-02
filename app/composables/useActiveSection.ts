/**
 * Scroll-spy: observa las <section id> y expone cuál está activa, para resaltar
 * el nodo correspondiente en la nav (diagrama desktop y pills móviles).
 * Solo corre en cliente (IntersectionObserver no existe en SSR/prerender).
 *
 * @param ids  ids de las secciones a observar, en orden de aparición.
 */
export function useActiveSection(ids: string[]) {
  const active = ref('')

  let observer: IntersectionObserver | null = null

  onMounted(() => {
    // rootMargin recorta la ventana a una banda central: la sección activa es la
    // que ocupa el centro del viewport, no la que apenas asoma por los bordes.
    observer = new IntersectionObserver(
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
  })

  onBeforeUnmount(() => observer?.disconnect())

  return { active }
}

/** Lleva el scroll a una sección de forma suave (usado por la nav). */
export function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
