/**
 * Estado compartido del command palette (⌘K).
 * useState lo hace SSR-safe y único en toda la app, así el atajo de teclado
 * (TheCommandPalette) y el botón del HUD controlan la misma instancia.
 */
export function useCommandPalette() {
  const isOpen = useState('cmdk-open', () => false)

  return {
    isOpen,
    open: () => {
      isOpen.value = true
    },
    close: () => {
      isOpen.value = false
    },
    toggle: () => {
      isOpen.value = !isOpen.value
    }
  }
}
