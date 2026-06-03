<script setup lang="ts">
import { NAV_SECTIONS } from '~/data/nav'

/**
 * Navegación del sidebar como diagrama de secciones (afordancia de desktop;
 * en móvil la reemplaza <MobileNav />). Cada nodo enlaza a su sección y se
 * resalta con scroll-spy (useActiveSection).
 */
const { t } = useI18n()

// Geometría del diagrama (viewBox 280×320): raíz "DR" arriba y 6 nodos en 2
// filas de 3. Posiciones fijas; el texto se sitúa 27px bajo cada nodo.
// El tipo garantiza que toda id de NAV_SECTIONS tenga una posición definida.
const NODE_POS: Record<(typeof NAV_SECTIONS)[number]['id'], { cx: number; cy: number }> = {
  about: { cx: 50, cy: 128 },
  experience: { cx: 140, cy: 128 },
  work: { cx: 230, cy: 128 },
  decisions: { cx: 50, cy: 228 },
  stack: { cx: 140, cy: 228 },
  now: { cx: 230, cy: 228 }
}

// Nodos = secciones (id + número) con su posición en el diagrama.
const nodes = NAV_SECTIONS.map((s) => ({
  id: s.id,
  num: s.num,
  ...NODE_POS[s.id]
}))

// Aristas: raíz → fila 1 (curvas) y fila 1 → fila 2 (rectas).
const EDGES = [
  { target: 'about', d: 'M140,42 Q90,80 50,120' },
  { target: 'experience', d: 'M140,42 L140,120' },
  { target: 'work', d: 'M140,42 Q190,80 230,120' },
  { target: 'decisions', d: 'M50,135 L50,220' },
  { target: 'stack', d: 'M140,135 L140,220' },
  { target: 'now', d: 'M230,135 L230,220' }
]

// Scroll-spy: resalta el nodo (y su arista) de la sección visible.
const { active } = useActiveSection(NAV_SECTIONS.map((s) => s.id))
</script>

<template>
  <nav
    class="schema mt-8 hidden flex-1 items-start justify-center lg:flex"
    :aria-label="t('a11y.navSections')"
  >
    <svg
      viewBox="0 0 280 320"
      class="schema-svg"
      aria-hidden="true"
    >
      <!-- Aristas (raíz → nodos). Se activan junto con su nodo destino. -->
      <g class="schema-paths">
        <path
          v-for="edge in EDGES"
          :key="edge.target"
          :d="edge.d"
          :class="{ 'is-active': active === edge.target }"
        />
      </g>

      <!-- Raíz: "DR" con anillo pulsante -->
      <g class="schema-root">
        <circle cx="140" cy="42" r="20" class="schema-root-ring" />
        <circle cx="140" cy="42" r="14" />
        <text x="140" y="46" text-anchor="middle">DR</text>
      </g>

      <!-- Nodos navegables -->
      <g
        v-for="node in nodes"
        :key="node.id"
        class="schema-node"
        :class="{ 'is-active': active === node.id }"
        role="button"
        tabindex="0"
        :aria-label="`${node.num} · ${t(`nav.${node.id}`)}`"
        :aria-current="active === node.id ? 'location' : undefined"
        @click="scrollToSection(node.id)"
        @keydown.enter.prevent="scrollToSection(node.id)"
        @keydown.space.prevent="scrollToSection(node.id)"
      >
        <circle :cx="node.cx" :cy="node.cy" r="7" />
        <text :x="node.cx" :y="node.cy + 27" text-anchor="middle">
          {{ node.num }} · {{ t(`nav.${node.id}`) }}
        </text>
      </g>
    </svg>
  </nav>
</template>

<style scoped>
.schema-svg {
  width: 100%;
  height: auto;
  max-width: 300px;
}

/* Aristas punteadas; la activa se vuelve sólida y de acento */
.schema-paths path {
  fill: none;
  stroke: var(--line-strong);
  stroke-width: 1;
  stroke-dasharray: 3 4;
  transition:
    stroke 180ms ease,
    stroke-dasharray 180ms ease,
    stroke-width 180ms ease;
}
.schema-paths path.is-active {
  stroke: var(--accent);
  stroke-dasharray: none;
  stroke-width: 1.8;
}

/* Raíz "DR" */
.schema-root circle:nth-of-type(2) {
  fill: var(--ink);
  stroke: none;
}
.schema-root-ring {
  fill: none;
  stroke: var(--accent);
  stroke-width: 1;
  opacity: 0.3;
  animation: rootRing 3s ease-in-out infinite;
}
@keyframes rootRing {
  0%,
  100% {
    opacity: 0.2;
    r: 20;
  }
  50% {
    opacity: 0.5;
    r: 24;
  }
}
.schema-root text {
  fill: var(--bg);
  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: -0.02em;
  pointer-events: none;
}

/* Nodos */
.schema-node {
  cursor: pointer;
}
.schema-node:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 4px;
  border-radius: 50%;
}
.schema-node circle {
  fill: var(--paper);
  stroke: var(--line-strong);
  stroke-width: 1.5;
  transition:
    fill 180ms ease,
    stroke 180ms ease,
    r 180ms ease;
}
.schema-node text {
  fill: var(--muted);
  font-family: var(--font-mono);
  font-size: 8.5px;
  letter-spacing: 0.02em;
  transition: fill 180ms ease;
  pointer-events: none;
}
.schema-node:hover circle,
.schema-node:focus-visible circle {
  stroke: var(--accent);
  fill: var(--accent-soft);
  r: 8;
}
.schema-node:hover text,
.schema-node:focus-visible text {
  fill: var(--ink);
}
.schema-node.is-active circle {
  fill: var(--accent);
  stroke: var(--accent);
}
.schema-node.is-active text {
  fill: var(--accent);
  font-weight: 600;
}

/* Respeta a quien prefiere menos movimiento */
@media (prefers-reduced-motion: reduce) {
  .schema-root-ring {
    animation: none;
  }
}
</style>
