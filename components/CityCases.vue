<script setup lang="ts">
import { useAutoSteps } from '../composables/useAutoSteps'

// Rotterdam and São Paulo as the two UrbanHealthTwin cases. Facts: Wikipedia (population), Poder360 (São Paulo dengue 2024),
// RIVM (West Nile 2026), GGD Rotterdam-Rijnmond (tiger mosquito 2024), Studio Urbanisten (Benthemplein).
const step = useAutoSteps(4, 350, 150)

const cities = [
  {
    key: 'rotterdam', name: 'Rotterdam', tag: 'Planning-led',
    facts: [
      '674,000 residents, Europe’s largest seaport, much of the city below sea level',
      'Water squares such as Benthemplein (2013) store stormwater and double as sports and public space, co-designed with local groups',
      'So far in 2026, its province, Zuid-Holland, has the most West Nile cases in the Netherlands (41 of 72). The tiger mosquito was found in Delfshaven in 2024',
    ],
    brings: 'Long-term adaptation planning, designed blue-green space, data and models',
    at: 1,
  },
  {
    key: 'saopaulo', name: 'São Paulo', tag: 'Experience- and community-led',
    facts: [
      '11.9 million residents (21.5 million in the metro region), humid subtropical climate',
      'Floods are handled mainly with detention basins (piscinões), and the climate plan leans on linear parks',
      'Record dengue in 2024: 623,437 cases and 475 deaths in the city, about six times the 2015 record. Health agents went door to door',
    ],
    brings: 'Hard-won experience with floods and dengue, and strong community knowledge',
    at: 2,
  },
]
</script>

<template>
  <div class="cases">
    <article v-for="c in cities" :key="c.key" class="city reveal" :class="[c.key, { shown: step >= c.at }]">
      <header>
        <div class="head"><h3>{{ c.name }}</h3><p class="tag">{{ c.tag }}</p></div>

      <svg v-if="c.key === 'rotterdam'" class="banner" viewBox="0 0 300 70" preserveAspectRatio="xMaxYMax meet" role="img" aria-label="Simplified Rotterdam skyline with the Erasmus Bridge, Euromast, De Rotterdam and the cube houses">
        <g stroke="#1d2830" stroke-width="1" stroke-linejoin="round" stroke-linecap="round">
          <g fill="#1d2830">
            <rect x="52" y="24" width="10" height="32" /><rect x="60" y="14" width="10" height="42" /><rect x="68" y="30" width="10" height="26" />
            <rect x="84" y="6" width="12" height="50" /><rect x="98" y="22" width="10" height="34" />
            <path d="M118 56 L119.5 30 H123.5 L125 56 Z" /><rect x="113" y="20" width="16" height="9" rx="4" /><path d="M121.5 20 V4" fill="none" />
            <rect x="270" y="18" width="11" height="38" /><rect x="283" y="30" width="12" height="26" />
          </g>
          <g fill="#ffc933">
            <rect x="0" y="0" width="9" height="9" transform="translate(8 40) rotate(45)" /><rect x="0" y="0" width="9" height="9" transform="translate(21 36) rotate(45)" /><rect x="0" y="0" width="9" height="9" transform="translate(34 41) rotate(45)" />
          </g>
          <path d="M182 50 L190 50 L192.5 6 L188.5 6 Z" fill="#fff" />
          <path d="M190.5 8 L204 50 M190.5 8 L216 50 M190.5 8 L228 50 M190.5 8 L240 50 M190.5 8 L252 50 M190.5 8 L264 50 M189 8 L176 50 M189 8 L166 50 M189 8 L156 50" fill="none" stroke-width="0.8" />
          <rect x="132" y="49" width="140" height="3.2" fill="#e6eef2" />
          <path d="M0 62 q8 -4 16 0 t16 0 t16 0 t16 0 t16 0 t16 0 t16 0 t16 0 t16 0 t16 0 t16 0 t16 0 t16 0 t16 0 t16 0 t16 0 t16 0 t16 0 t16 0 V70 H0 Z" fill="#4fb3e8" stroke="#1d7fb5" />
        </g>
      </svg>
      <svg v-else class="banner" viewBox="0 0 300 70" preserveAspectRatio="xMaxYMax meet" role="img" aria-label="Simplified São Paulo skyline with the cable-stayed Octávio Frias bridge, Edifício Itália, Altino Arantes, Copan and MASP">
        <g stroke="#1d2830" stroke-width="1" stroke-linejoin="round" stroke-linecap="round">
          <g fill="#1d2830">
            <rect x="2" y="32" width="10" height="24" /><rect x="14" y="20" width="9" height="36" /><rect x="25" y="28" width="12" height="28" /><rect x="39" y="14" width="10" height="42" />
            <rect x="58" y="8" width="12" height="48" /><rect x="60" y="4" width="8" height="5" />
            <rect x="90" y="30" width="24" height="26" /><rect x="96" y="20" width="12" height="10" /><rect x="100" y="12" width="4" height="8" /><path d="M102 12 V2" fill="none" />
            <path d="M126 24 q6 -6 12 0 t12 0 t12 0 V56 H126 Z" />
          </g>
          <path d="M130 32 h32 M130 40 h32 M130 48 h32" fill="none" stroke="#e6eef2" stroke-width="1.2" />
          <rect x="176" y="36" width="36" height="8" fill="#e85d3f" /><rect x="181" y="44" width="3.2" height="12" fill="#1d2830" /><rect x="204" y="44" width="3.2" height="12" fill="#1d2830" />
          <path d="M226 52 Q 262 44 298 52" fill="none" stroke-width="3" />
          <path d="M246 54 L282 6 M282 54 L246 6" fill="none" stroke="#1d2830" stroke-width="3.2" />
          <path d="M246 7 L232 50 M246 7 L240 49 M246 7 L252 49 M282 7 L292 50 M282 7 L276 49 M282 7 L270 49" fill="none" stroke-width="0.8" />
          <rect x="0" y="56" width="300" height="14" fill="#cfe3d0" stroke="#9cc3a0" />
          <circle cx="170" cy="60" r="3.2" fill="#4caf50" stroke="none" /><circle cx="214" cy="61" r="3.2" fill="#4caf50" stroke="none" /><circle cx="120" cy="61" r="3.2" fill="#4caf50" stroke="none" />
        </g>
      </svg>
      </header>
      <ul>
        <li v-for="f in c.facts" :key="f">{{ f }}</li>
      </ul>
      <p class="brings"><span>Brings</span>{{ c.brings }}</p>
    </article>
    <div class="swap reveal" :class="{ shown: step >= 3 }" aria-hidden="true">
      <svg viewBox="0 0 40 60"><g fill="none" stroke="#00aeef" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M6 20 H32 M26 13 L33 20 L26 27" /><path d="M34 40 H8 M14 33 L7 40 L14 47" /></g></svg>
    </div>
  </div>
  <p class="teaching-note platform reveal" :class="{ shown: step >= 4 }">UrbanHealthTwin becomes a <b>learning platform</b> for two cities with very different characters: Rotterdam learns from São Paulo’s experience and community knowledge, and São Paulo from Rotterdam’s planning and design practice.</p>
</template>

<style scoped>
.cases { display: grid; grid-template-columns: 1fr 34px 1fr; align-items: stretch; margin-top: 2px; }
.city { grid-row: 1; padding: 12px 16px 12px; background: #f7fbfc; border-top: 5px solid #00aeef; }
.city.rotterdam { grid-column: 1; }
.city.saopaulo { grid-column: 3; border-top-color: #2e9e5b; }
.swap { grid-column: 2; grid-row: 1; display: grid; place-items: center; }
.swap svg { width: 30px; }
header { display: flex; align-items: flex-end; gap: 10px; margin-bottom: 6px; }
.banner { flex: none; display: block; width: 62%; height: auto; margin-left: auto; }
h3 { margin: 0; color: #010101; font-size: 1.1em; }
.tag { margin: 2px 0 0; color: #007fa8; font-size: 0.5em !important; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; }
.saopaulo .tag { color: #2e7d4f; }
ul { margin: 0 0 6px; padding-left: 1.05em; }
li { margin-bottom: 5px; color: #40525a; font-size: 0.6em !important; line-height: 1.38; }
.brings { margin: 0; padding: 6px 9px; background: #fff; border-left: 4px solid #00aeef; color: #1d2830; font-size: 0.6em !important; font-weight: 700; line-height: 1.35; }
.saopaulo .brings { border-left-color: #2e9e5b; }
.brings span { display: block; margin-bottom: 2px; color: #007fa8; font-size: 0.85em; letter-spacing: 0.1em; text-transform: uppercase; }
.saopaulo .brings span { color: #2e7d4f; }
.platform { margin-top: 12px; padding: 10px 16px; font-size: 0.68em !important; line-height: 1.4; }
.platform b { color: #00a6d6; }
.reveal { opacity: 0; transform: translateY(10px); transition: opacity 0.35s ease, transform 0.35s ease; }
.reveal.shown { opacity: 1; transform: none; }
</style>
