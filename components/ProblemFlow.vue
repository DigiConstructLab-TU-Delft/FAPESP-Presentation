<script setup lang="ts">
import { useAutoSteps } from '../composables/useAutoSteps'
import { useClickStages } from '../composables/useClickStages'

// The problem as a branching flow with hand-drawn (SVG) cartoons.
// Automatic: 1 climate · 2 flood/drought · 3 blue-green · 4 intended branch.
// Click 1: the unintended branch, the heat note and the "why mosquitoes thrive" cards, all at once.
const step = useAutoSteps(4, 380, 150)
const [after1] = useClickStages([1])

type Part = { t: string; hl?: boolean }
type Tone = 'good' | 'risk'
const cards: { ill: string; cx: number; cy: number; w: number; title: Part[]; sub: string; at: number; c1?: number; tone?: Tone; tab?: string }[] = [
  { ill: 'climate', cx: 66, cy: 102, w: 124, title: [{ t: 'Climate extremes' }], sub: 'heat, storms, shifting rain', at: 1 },
  { ill: 'flood', cx: 222, cy: 52, w: 124, title: [{ t: 'Floods' }], sub: 'too much water', at: 2 },
  { ill: 'drought', cx: 222, cy: 152, w: 124, title: [{ t: 'Drought' }], sub: 'too little water', at: 2 },
  { ill: 'bgi', cx: 388, cy: 102, w: 132, title: [{ t: 'Blue-green interventions' }], sub: 'wetlands, ponds, green roofs', at: 3 },
  { ill: 'good', cx: 566, cy: 52, w: 136, title: [{ t: 'Fewer floods and droughts' }], sub: 'water held in the city', at: 4, tone: 'good', tab: 'Intended' },
  { ill: 'city', cx: 730, cy: 52, w: 124, title: [{ t: 'More resilience' }], sub: 'to heat and floods', at: 4, tone: 'good' },
  { ill: 'mozzie', cx: 566, cy: 152, w: 136, title: [{ t: 'Without an ' }, { t: 'integral', hl: true }, { t: ' vision' }], sub: 'standing, warm water', at: 0, c1: 1, tone: 'risk', tab: 'Unintended' },
  { ill: 'virus', cx: 730, cy: 152, w: 124, title: [{ t: 'Vector-borne disease' }], sub: 'dengue, Zika, West Nile', at: 0, c1: 2, tone: 'risk' },
]
const arrows: { d: string; at: number; c1?: number; tone?: Tone }[] = [
  { d: 'M128 94 C 144 94, 144 52, 158 52', at: 2 },
  { d: 'M128 110 C 144 110, 144 152, 158 152', at: 2 },
  { d: 'M284 52 C 304 52, 304 94, 320 94', at: 3 },
  { d: 'M284 152 C 304 152, 304 110, 320 110', at: 3 },
  { d: 'M454 94 C 476 94, 476 52, 496 52', at: 4, tone: 'good' },
  { d: 'M634 52 H 666', at: 4, tone: 'good' },
  { d: 'M454 110 C 476 110, 476 152, 496 152', at: 0, c1: 1, tone: 'risk' },
  { d: 'M634 152 H 666', at: 0, c1: 2, tone: 'risk' },
  { d: 'M600 208 V 200', at: 0, c1: 3, tone: 'risk' },
]
const causes: { title: Part[]; text: string }[] = [
  { title: [{ t: 'No ' }, { t: 'integral', hl: true }, { t: ' view' }], text: 'Water, green space and health are planned apart.' },
  { title: [{ t: 'Still water' }], text: 'Standing water is where mosquitoes breed.' },
  { title: [{ t: 'Warmth' }], text: 'Heat speeds up mosquito growth and virus spread.' },
  { title: [{ t: 'Vegetation' }], text: 'Shade and humidity attract mosquitoes.' },
]
const on = (it: { at: number; c1?: number }) => (it.c1 ? after1.value >= 1 : step.value >= it.at)
const stroke = (t?: string) => (t === 'good' ? '#2e9e5b' : t === 'risk' ? '#e85d3f' : '#829099')
</script>

<template>
  <svg class="flow" viewBox="0 -2 804 242" role="img" aria-label="Flow: climate extremes lead to floods and drought, then blue-green interventions, which without an integral vision can lead to vector-borne disease">
    <defs>
      <marker id="uh-arr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="context-stroke" /></marker>

      <g id="ill-climate">
        <g stroke="#1d2830" stroke-width="1.1" stroke-linecap="round">
          <circle cx="-9" cy="-7" r="10" fill="#ffc933" />
          <path d="M-9 -22 v-3 M-24 -7 h-3 M-21 -19 l-2 -2 M3 -19 l2 -2 M-21 5 l-2 2" fill="none" />
          <path d="M-12 14 a7 7 0 0 1 1 -13 a10 10 0 0 1 19 -1 a7 7 0 0 1 3 14 z" fill="#e6eef2" />
          <polygon points="9,8 3,19 8,19 5,27 15,14 10,14" fill="#ffc933" />
        </g>
      </g>
      <g id="ill-flood">
        <g stroke="#1d2830" stroke-width="1.1" stroke-linejoin="round">
          <rect x="-28" y="-6" width="17" height="16" fill="#fff" /><polygon points="-30,-6 -19.5,-16 -9,-6" fill="#e85d3f" />
          <rect x="3" y="-10" width="20" height="20" fill="#fff" /><polygon points="1,-10 13,-21 25,-10" fill="#e85d3f" />
          <rect x="-22" y="-2" width="5" height="5" fill="#ffe9a8" /><rect x="8" y="-5" width="6" height="6" fill="#ffe9a8" />
          <path d="M-36 5 q6 -5 12 0 t12 0 t12 0 t12 0 t12 0 t12 0 V24 H-36 Z" fill="#4fb3e8" fill-opacity="0.9" stroke="#1d7fb5" />
        </g>
      </g>
      <g id="ill-drought">
        <g stroke="#1d2830" stroke-width="1.1" stroke-linejoin="round" stroke-linecap="round">
          <circle cx="18" cy="-12" r="9" fill="#ffc933" />
          <rect x="-32" y="4" width="64" height="18" fill="#d9ae72" />
          <path d="M-22 4 l5 7 l-6 5 l4 6 M2 4 l-4 7 l7 4 l-3 7 M20 4 l-3 6 l6 5" fill="none" />
          <path d="M-8 4 v-14" fill="none" stroke="#8a6a3a" stroke-width="1.6" /><path d="M-8 -6 q-8 -2 -9 -8 M-8 -9 q7 0 8 -6" fill="none" stroke="#8a6a3a" stroke-width="1.4" />
        </g>
      </g>
      <g id="ill-bgi">
        <g stroke="#1d2830" stroke-width="1.1" stroke-linejoin="round" stroke-linecap="round">
          <rect x="-30" y="-14" width="18" height="14" fill="#fff" /><rect x="-32" y="-19" width="22" height="6" rx="1.5" fill="#4caf50" />
          <ellipse cx="-6" cy="12" rx="22" ry="8" fill="#4fb3e8" stroke="#1d7fb5" />
          <path d="M-14 12 q-2 -9 -4 -14 M-10 12 q0 -10 2 -15" fill="none" stroke="#2e7d32" />
          <rect x="21" y="-4" width="3.6" height="14" fill="#8a6a3a" /><circle cx="22.8" cy="-8" r="9" fill="#4caf50" />
        </g>
      </g>
      <g id="ill-good">
        <g stroke="#1d2830" stroke-width="1.1" stroke-linejoin="round" stroke-linecap="round">
          <rect x="-26" y="-2" width="16" height="14" fill="#fff" /><rect x="-28" y="-7" width="20" height="6" rx="1.5" fill="#4caf50" />
          <rect x="2" y="2" width="3.6" height="12" fill="#8a6a3a" /><circle cx="3.8" cy="-4" r="9" fill="#4caf50" />
          <ellipse cx="-4" cy="18" rx="22" ry="4" fill="#4fb3e8" stroke="#1d7fb5" />
          <circle cx="20" cy="-14" r="8" fill="#2e9e5b" /><path d="M16 -14 l3 3 l5 -6" fill="none" stroke="#fff" stroke-width="2" />
        </g>
      </g>
      <g id="ill-city">
        <g stroke="#1d2830" stroke-width="1.1" stroke-linejoin="round" stroke-linecap="round">
          <rect x="-30" y="-8" width="14" height="26" fill="#e6eef2" /><rect x="-12" y="-16" width="16" height="34" fill="#fff" /><rect x="8" y="-2" width="14" height="20" fill="#e6eef2" />
          <path d="M-26 -3 h6 M-26 4 h6 M-8 -10 h8 M-8 -3 h8 M-8 4 h8 M12 4 h6 M12 11 h6" fill="none" />
          <rect x="-12" y="-21" width="16" height="5" rx="1.5" fill="#4caf50" />
          <circle cx="26" cy="12" r="7" fill="#4caf50" /><rect x="25" y="14" width="2.4" height="6" fill="#8a6a3a" />
        </g>
      </g>
      <g id="ill-mozzie">
        <g stroke="#1d2830" stroke-width="1.1" stroke-linejoin="round" stroke-linecap="round">
          <ellipse cx="-6" cy="14" rx="24" ry="7" fill="#7a8f5a" stroke="#4d5e36" />
          <path d="M-18 14 q2 -2 4 0 M-4 16 q2 -2 4 0 M6 13 q2 -2 4 0" fill="none" stroke="#c9d8a8" />
          <g transform="translate(4 -5) rotate(-18)">
            <ellipse cx="-4" cy="-7" rx="8" ry="4" fill="#cfeaf8" fill-opacity="0.9" transform="rotate(-25 -4 -7)" /><ellipse cx="2" cy="-8" rx="8" ry="4" fill="#cfeaf8" fill-opacity="0.9" transform="rotate(-5 2 -8)" />
            <ellipse cx="0" cy="0" rx="12" ry="4.5" fill="#1d2830" /><circle cx="-13" cy="0" r="4.5" fill="#1d2830" /><path d="M-17 1 l-9 4" stroke="#1d2830" stroke-width="1.4" fill="none" />
            <circle cx="-14" cy="-1.5" r="1.3" fill="#fff" stroke="none" /><path d="M-3 4 l-3 8 M2 4 l1 8 M7 3 l4 7" fill="none" />
          </g>
        </g>
      </g>
      <g id="ill-virus">
        <g stroke="#1d2830" stroke-width="1.1" stroke-linecap="round">
          <g stroke="#e85d3f" stroke-width="2.2">
            <path d="M0 -19 v-5 M0 19 v5 M-19 0 h-5 M19 0 h5 M-13.5 -13.5 l-3.5 -3.5 M13.5 13.5 l3.5 3.5 M-13.5 13.5 l-3.5 3.5 M13.5 -13.5 l3.5 -3.5" />
          </g>
          <circle cx="0" cy="0" r="15" fill="#e85d3f" />
          <circle cx="-5.5" cy="-2" r="3.6" fill="#fff" /><circle cx="5.5" cy="-2" r="3.6" fill="#fff" />
          <circle cx="-5" cy="-1.5" r="1.5" fill="#1d2830" stroke="none" /><circle cx="6" cy="-1.5" r="1.5" fill="#1d2830" stroke="none" />
          <path d="M-9 -8 l7 3 M9 -8 l-7 3 M-6 8 q6 -4 12 0" fill="none" />
        </g>
      </g>
    </defs>

    <g v-for="(a, i) in arrows" :key="i" class="r" :class="{ on: on(a) }">
      <path :d="a.d" fill="none" :stroke="stroke(a.tone)" stroke-width="2" marker-end="url(#uh-arr)" />
    </g>

    <g v-for="c in cards" :key="c.ill" class="r" :class="{ on: on(c) }">
      <rect :x="c.cx - c.w / 2" :y="c.cy - 46" :width="c.w" height="92" rx="7" fill="#fff" :stroke="stroke(c.tone) === '#829099' ? '#d9e2e6' : stroke(c.tone)" :stroke-width="c.tone ? 2 : 1.2" />
      <use :href="`#ill-${c.ill}`" :transform="`translate(${c.cx} ${c.cy - 14})`" />
      <text :x="c.cx" :y="c.cy + 26" text-anchor="middle" class="ct"><tspan v-for="(p, i) in c.title" :key="i" :class="{ hl: p.hl }">{{ p.t }}</tspan></text>
      <text :x="c.cx" :y="c.cy + 37" text-anchor="middle" class="cs">{{ c.sub }}</text>
      <g v-if="c.tab">
        <rect :x="c.cx - c.w / 2 + 8" :y="c.cy - 53" width="62" height="13" rx="6.5" :fill="stroke(c.tone)" />
        <text :x="c.cx - c.w / 2 + 39" :y="c.cy - 43.5" text-anchor="middle" class="tab">{{ c.tab }}</text>
      </g>
    </g>

    <g class="r" :class="{ on: after1 >= 1 }">
      <rect x="330" y="208" width="462" height="31" rx="6" fill="#fff8f5" stroke="#e85d3f" stroke-dasharray="4 3" />
      <g transform="translate(350 223)" stroke="#1d2830" stroke-width="1.1">
        <rect x="-3" y="-12" width="6" height="18" rx="3" fill="#fff" /><rect x="-1.4" y="-3" width="2.8" height="9" fill="#e85d3f" stroke="none" /><circle cx="0" cy="8" r="5" fill="#e85d3f" />
      </g>
      <text x="366" y="221" class="cb">Rising temperatures speed up mosquito growth.</text>
    </g>

  </svg>
  <div class="why">
    <p class="why-label reveal" :class="{ shown: after1 >= 1 }">Why mosquitoes thrive in blue-green spaces</p>
    <div class="why-grid">
      <div v-for="(c, i) in causes" :key="i" class="why-card reveal" :class="{ shown: after1 >= 1 }">
        <h4><template v-for="(p, j) in c.title" :key="j"><span :class="{ hl: p.hl }">{{ p.t }}</span></template></h4>
        <p>{{ c.text }}</p>
      </div>
    </div>
  </div>
  <div class="click-markers" aria-hidden="true"><span v-click="1" /></div>
</template>

<style scoped>
.flow { display: block; width: 100%; height: auto; margin-top: 2px; font-family: Arial, Helvetica, sans-serif; }
.r { opacity: 0; transition: opacity 0.4s ease; }
.r.on { opacity: 1; }
.ct { font-size: 9px; font-weight: 700; fill: #010101; }
.ct .hl { fill: #00a6d6; }
.cs { font-size: 7.2px; fill: #64727a; }
.cb { font-size: 9px; font-weight: 700; fill: #1d2830; }
.tab { font-size: 7.5px; font-weight: 700; fill: #fff; letter-spacing: 0.06em; text-transform: uppercase; }
.cs2 { font-size: 8px; fill: #51616a; }
.why { margin-top: 2px; }
.click-markers { height: 0; overflow: hidden; }
.why-label { margin: 0 0 6px; color: #007fa8; font-size: 0.5em !important; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; }
.why-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; }
.why-card { padding: 6px 10px 7px; border-top: 4px solid #e85d3f; background: #fff8f5; }
.why-card h4 { margin: 0 0 3px; color: #010101; font-size: 0.62em; font-weight: 700; }
.why-card h4 .hl { color: #00a6d6; }
.why-card p { margin: 0; color: #51616a; font-size: 0.47em !important; line-height: 1.35; }
.reveal { opacity: 0; transform: translateY(10px); transition: opacity 0.35s ease, transform 0.35s ease; }
.reveal.shown { opacity: 1; transform: none; }
</style>
