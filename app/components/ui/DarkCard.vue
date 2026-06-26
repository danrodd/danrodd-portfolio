<template>
  <!--
    Tarjeta oscura "terminal". Colores fijos (siempre dark, no reacciona al tema).
    Usada en SectionNow y error.vue. Slot default para contenido interno.
  -->
  <div
    class="relative overflow-hidden rounded-2xl border border-[#1c241c] bg-[#0c100c] shadow-[0_24px_60px_-30px_rgba(0,0,0,0.5)]"
  >
    <slot />
  </div>
</template>
