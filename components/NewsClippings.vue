<script setup lang="ts">
import { useAutoSteps } from '../composables/useAutoSteps'

// Recent press reports as compact clippings in two columns: reports linking nature-based solutions to mosquitoes,
// and mosquito-borne disease risk headlines. Each shows the original headline plus an English line.
type Item = { src: string; date: string; head: string; line: string }
type Column = { label: string; items: Item[] }

const columns: Column[] = [
  {
    label: 'Nature-based solutions and mosquitoes',
    items: [
      { src: 'NRC (Netherlands)', date: '27 Aug 2026', head: 'Nederland moet ruimte maken voor water. Maar dat geeft óók ruimte aan muggen die virussen overdragen – zoals het westnijlvirus', line: 'Making the country wetter to adapt to climate change also creates habitat for virus-carrying mosquitoes.' },
      { src: 'Open Access Government', date: '14 Nov 2025', head: 'From drought resilience to disease risk', line: 'Wetlands and constructed ponds can hold standing water and dense vegetation, giving mosquitoes places to breed. Design and management decide the outcome.' },
      { src: 'H2O (Netherlands)', date: '21 Apr 2025', head: 'Klimaatadaptatie en de ‘dark side of biodiversity’: effecten op muggen en teken', line: 'Wadis drain within days and pose little risk. The bigger breeding risk is grey sewer storage, such as street gullies.' },
      { src: 'Urban Acres (India)', date: '21 Sep 2026', head: 'Delhi Biodiversity Parks Show Why Wetlands Matter for Mosquito Control', line: 'Restored wetlands support dragonflies that prey on mosquitoes, but only when the water is clean and stable.' },
    ],
  },
  {
    label: 'Mosquito-borne disease risk',
    items: [
      { src: 'De Morgen (Belgium)', date: '4 Jul 2026', head: 'Mag de mug weg? Wat we moeten aanvangen met het grootste massavernietigingswapen van de natuur', line: 'Should the mosquito go? What to do with nature’s biggest weapon of mass destruction.' },
      { src: 'Resource, Wageningen (Netherlands)', date: '7 Sep 2026', head: 'Acht vragen over het westnijlvirus', line: 'Eight questions about West Nile virus.' },
      { src: 'Portal de Prefeitura (Brazil)', date: '27 Jan 2026', head: 'Alerta para surto de dengue dispara após semana de temporais em diversas regiões', line: 'Dengue outbreak alert soars after a week of storms in several regions.' },
      { src: 'Afya (Brazil)', date: '8 Oct 2026', head: 'Alerta ou risco para Aedes aegypti atinge 49,2% das cidades', line: 'Alert or risk for Aedes aegypti reaches 49.2% of cities.' },
      { src: 'O POVO+ (Brazil)', date: '18 Oct 2026', head: 'Ceará chega a 15 mil casos de dengue em 2026, quase 4 vezes mais que ano passado', line: 'Ceará reaches 15 thousand dengue cases in 2026, almost four times last year’s total.' },
    ],
  },
]
// reveal order: left column top to bottom, then right column
const order = columns.flatMap((c, ci) => c.items.map((_, i) => `${ci}-${i}`))
const step = useAutoSteps(order.length, 220, 150)
const shown = (ci: number, i: number) => step.value > order.indexOf(`${ci}-${i}`)
</script>

<template>
  <div class="news">
    <section v-for="(c, ci) in columns" :key="c.label" class="col" :class="{ big: ci === 0 }">
      <p class="g-label">{{ c.label }}</p>
      <article v-for="(it, i) in c.items" :key="it.src" class="clip reveal" :class="{ shown: shown(ci, i) }">
        <p class="meta"><b>{{ it.src }}</b> · {{ it.date }}</p>
        <h3>{{ it.head }}</h3>
        <p class="line">{{ it.line }}</p>
      </article>
    </section>
  </div>
</template>

<style scoped>
.news { display: grid; grid-template-columns: 1fr 1fr; gap: 22px; margin-top: 0; }
.col { display: grid; gap: 6px; align-content: start; }
.g-label { margin: 0 0 1px; color: #007fa8; font-size: 0.5em !important; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; }
.clip { padding: 5px 10px 6px; background: #fff; border: 1px solid #d9e2e6; border-left: 4px solid #00aeef; box-shadow: 0 1px 4px rgba(1, 1, 1, 0.06); }
.meta { margin: 0 0 1px; color: #64727a; font-size: 0.42em !important; letter-spacing: 0.02em; line-height: 1.2; }
.meta b { color: #1d2830; }
h3 { margin: 0 0 2px; color: #010101; font: 700 0.54em/1.2 Georgia, 'Times New Roman', serif; }
.line { margin: 0; color: #51616a; font-size: 0.44em !important; line-height: 1.3; font-style: italic; }
.big { gap: 6px; }
.big .clip { padding: 5px 11px 6px; }
.big .meta { font-size: 0.44em !important; margin-bottom: 1px; }
.big h3 { font-size: 0.57em; margin-bottom: 2px; }
.big .line { font-size: 0.47em !important; }
.reveal { opacity: 0; transform: translateY(8px); transition: opacity 0.3s ease, transform 0.3s ease; }
.reveal.shown { opacity: 1; transform: none; }
</style>
