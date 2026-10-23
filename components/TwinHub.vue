<script setup lang="ts">
import { useAutoSteps } from '../composables/useAutoSteps'

// How UrbanHealthTwin enables an integral vision: three inputs flow into the digital twin (a boundary object),
// which serves six roles. step: 1-3 inputs · 4 twin · 5-10 roles
const step = useAutoSteps(10, 250, 150)

const inputs = [
  { ill: 'ht-climate', y: 4, title: 'Climate and water simulations', lines: ['Uncertain climate projections run as', 'scenarios for floods, droughts and', 'the urban microclimate'], at: 1 },
  { ill: 'ht-mozzie', y: 120, title: 'Mosquito and epidemiology models', lines: ['How environmental, biological and', 'human-driven factors shape the', 'mosquito life cycle'], at: 2 },
  { ill: 'ht-people', y: 236, title: 'Local knowledge', lines: ['Participatory workshops on how', 'climate, water and topography have', 'changed and keep changing'], at: 3 },
]
const roles = [
  { title: 'Stores local knowledge', sub: 'from people embedded in the community and area' },
  { title: 'Holds possible futures', sub: 'risks from engineering, climate and epidemiological models' },
  { title: 'Plans blue-green interventions', sub: 'with local knowledge, showing intended and unintended effects' },
  { title: 'Builds shared understanding', sub: 'of opportunities and risks for stakeholders and decision makers' },
  { title: 'Enables risk-informed decisions', sub: 'evidence-based decision making' },
  { title: 'Living lab and knowledge hub', sub: 'for the region, now and in the future' },
]
const roleY = (i: number) => 4 + i * 56
const hub = { x: 392, y: 168, r: 72 }
</script>

<template>
  <p class="twin-lead">One shared umbrella that brings together <b>community knowledge</b>, <b>engineering</b> and <b>urban planning</b> expertise, and <b>future climate scenarios</b> with their uncertainties, so communities and decision makers can co-create and learn from each other.</p>
  <svg class="hubsvg" viewBox="0 0 804 340" role="img" aria-label="Climate and water simulations, mosquito and epidemiology models and local knowledge feed the UrbanHealthTwin digital twin, a boundary object with six roles">
    <defs>
      <marker id="ht-arr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="context-stroke" /></marker>
      <g id="ht-climate">
        <g stroke="#1d2830" stroke-width="1.1" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="-8" cy="-10" r="8" fill="#ffc933" />
          <path d="M-12 6 a6 6 0 0 1 1 -11 a9 9 0 0 1 17 -1 a6 6 0 0 1 3 12 z" fill="#e6eef2" />
          <path d="M-6 8 l-2 5 M1 8 l-2 5 M8 8 l-2 5" fill="none" stroke="#1d7fb5" />
          <path d="M-22 18 q5 -4 10 0 t10 0 t10 0 t10 0 t10 0 V24 H-22 Z" fill="#4fb3e8" stroke="#1d7fb5" />
        </g>
      </g>
      <g id="ht-mozzie">
        <g stroke="#1d2830" stroke-width="1.1" stroke-linecap="round" stroke-linejoin="round">
          <ellipse cx="-2" cy="16" rx="20" ry="5" fill="#7a8f5a" stroke="#4d5e36" />
          <g transform="translate(2 -4) rotate(-18)">
            <ellipse cx="-4" cy="-7" rx="8" ry="4" fill="#cfeaf8" fill-opacity="0.9" transform="rotate(-25 -4 -7)" /><ellipse cx="2" cy="-8" rx="8" ry="4" fill="#cfeaf8" fill-opacity="0.9" transform="rotate(-5 2 -8)" />
            <ellipse cx="0" cy="0" rx="12" ry="4.5" fill="#1d2830" /><circle cx="-13" cy="0" r="4.5" fill="#1d2830" /><path d="M-17 1 l-9 4" stroke-width="1.4" fill="none" />
            <circle cx="-14" cy="-1.5" r="1.3" fill="#fff" stroke="none" /><path d="M-3 4 l-3 8 M2 4 l1 8 M7 3 l4 7" fill="none" />
          </g>
        </g>
      </g>
      <g id="ht-people">
        <g stroke="#1d2830" stroke-width="1.1" stroke-linejoin="round">
          <ellipse cx="0" cy="14" rx="24" ry="6" fill="#d9ae72" />
          <path d="M-22 10 q0 -12 8 -12 q8 0 8 12 z" fill="#2e9e5b" /><circle cx="-14" cy="-7" r="5" fill="#f2c9a0" />
          <path d="M-6 8 q0 -14 6 -14 q6 0 6 14 z" fill="#00aeef" /><circle cx="0" cy="-11" r="5" fill="#c68b59" />
          <path d="M6 10 q0 -12 8 -12 q8 0 8 12 z" fill="#e85d3f" /><circle cx="14" cy="-7" r="5" fill="#8d5a3b" />
          <path d="M-4 12 q4 -3 8 0" fill="none" stroke="#1d7fb5" stroke-width="1.6" />
        </g>
      </g>
    </defs>

    <!-- inputs -->
    <g v-for="(c, i) in inputs" :key="c.title" class="r" :class="{ on: step >= c.at }">
      <rect x="1" :y="c.y" width="243" height="100" rx="7" fill="#fff" stroke="#d9e2e6" stroke-width="1.2" />
      <use :href="`#${c.ill}`" :transform="`translate(32 ${c.y + 50})`" />
      <text x="66" :y="c.y + 30" class="it">{{ c.title }}</text>
      <text v-for="(l, j) in c.lines" :key="j" x="66" :y="c.y + 46 + j * 12" class="is">{{ l }}</text>
    </g>
    <g class="r" :class="{ on: step >= 2 }">
      <path d="M32 106 V 116" stroke="#829099" stroke-width="2" fill="none" marker-end="url(#ht-arr)" />
    </g>

    <!-- inputs into the twin -->
    <g class="r" :class="{ on: step >= 4 }" fill="none" stroke="#00aeef" stroke-width="2.2">
      <path d="M244 54 C 290 54, 290 128, 328 138" marker-end="url(#ht-arr)" />
      <path d="M244 170 H 316" marker-end="url(#ht-arr)" />
      <path d="M244 286 C 290 286, 290 208, 328 198" marker-end="url(#ht-arr)" />
    </g>

    <!-- the twin -->
    <g class="r" :class="{ on: step >= 4 }">
      <circle :cx="hub.x" :cy="hub.y" :r="hub.r + 8" fill="#eff9fc" />
      <circle :cx="hub.x" :cy="hub.y" :r="hub.r" fill="#fff" stroke="#00aeef" stroke-width="3" />
      <g :transform="`translate(${hub.x} ${hub.y - 22})`" stroke="#1d2830" stroke-width="1.1" stroke-linejoin="round">
        <rect x="-30" y="-20" width="60" height="38" rx="4" fill="#e6eef2" />
        <path d="M-30 4 q12 -10 24 -4 t36 -6" fill="none" stroke="#4fb3e8" stroke-width="5" stroke-linecap="round" />
        <rect x="-22" y="-14" width="7" height="7" fill="#fff" /><rect x="-10" y="-16" width="7" height="9" fill="#fff" /><rect x="10" y="-13" width="8" height="6" fill="#fff" />
        <circle cx="16" cy="8" r="4.5" fill="#4caf50" /><circle cx="-18" cy="10" r="3.5" fill="#4caf50" />
        <path d="M-8 18 h16 M0 18 v6" fill="none" />
      </g>
      <text :x="hub.x" :y="hub.y + 26" text-anchor="middle" class="ht">UrbanHealthTwin</text>
      <text :x="hub.x" :y="hub.y + 40" text-anchor="middle" class="hs">digital twin as a</text>
      <text :x="hub.x" :y="hub.y + 51" text-anchor="middle" class="hb">boundary object</text>
    </g>

    <!-- roles -->
    <g v-for="(r, i) in roles" :key="r.title" class="r" :class="{ on: step >= 5 + i }">
      <path :d="`M${hub.x + hub.r - 2} ${hub.y + (i - 2.5) * 16} C 500 ${hub.y + (i - 2.5) * 16}, 500 ${roleY(i) + 25}, 520 ${roleY(i) + 25}`" fill="none" stroke="#00aeef" stroke-width="1.6" stroke-opacity="0.55" />
      <rect x="520" :y="roleY(i)" width="282" height="50" rx="6" fill="#f7fbfc" stroke="#d9e2e6" />
      <circle cx="542" :cy="roleY(i) + 25" r="11" fill="#00aeef" />
      <text x="542" :y="roleY(i) + 29" text-anchor="middle" class="rn">{{ i + 1 }}</text>
      <text x="562" :y="roleY(i) + 21" class="rt">{{ r.title }}</text>
      <text x="562" :y="roleY(i) + 34" class="rs">{{ r.sub }}</text>
    </g>
  </svg>
</template>

<style scoped>
.twin-lead { margin: 0 0 6px; padding: 7px 14px; border-left: 5px solid #00aeef; background: #eff9fc; color: #40525a; font-size: 0.6em !important; line-height: 1.4; }
.twin-lead b { color: #00a6d6; }
.hubsvg { display: block; width: 100%; height: 290px; margin-top: 0; font-family: Arial, Helvetica, sans-serif; }
.r { opacity: 0; transition: opacity 0.35s ease; }
.r.on { opacity: 1; }
.it { font-size: 10px; font-weight: 700; fill: #010101; }
.is { font-size: 8px; fill: #51616a; }
.ht { font-size: 11px; font-weight: 700; fill: #010101; }
.hs { font-size: 8px; fill: #64727a; }
.hb { font-size: 9.5px; font-weight: 700; fill: #007fa8; }
.rn { font-size: 10px; font-weight: 700; fill: #fff; }
.rt { font-size: 9.5px; font-weight: 700; fill: #010101; }
.rs { font-size: 7.6px; fill: #51616a; }
</style>
