<script setup lang="ts">
import { useAutoSteps } from '../composables/useAutoSteps'
import { asset } from '../composables/asset'

// September 2026 team visit, the planned 2027 visit to São Paulo, and a simplified linear timeline of the project.
// Milestones are condensed from the project's task plan (months 0-48, tasks T1-T6).
const step = useAutoSteps(9, 250, 150)

const milestones = [
  { name: 'Map', months: 'Months 0–24', text: 'Map stakeholders and set up the transdisciplinary collaboration framework', at: 4 },
  { name: 'Listen', months: 'Months 6–36', text: 'Take stock of vulnerability and inequalities, carry out field work and gather local blue-green knowledge', at: 5 },
  { name: 'Build the twin', months: 'Months 6–36', text: 'Flood risk mapping and simulation, climate uncertainty modelling and simulation, urban microclimate modelling and simulation, a knowledge graph for data integration and the interactive digital twin', at: 6 },
  { name: 'Model disease risk', months: 'Months 12–36', text: 'Epidemiological framework and disease-risk scenarios, linked to urban climate and ecological models', at: 7 },
  { name: 'Co-create', months: 'Months 18–48', text: 'Co-design workshops and climate-health adaptation strategies with communities and decision makers', at: 8 },
]
</script>

<template>
  <div class="top">
    <figure class="photo reveal" :class="{ shown: step >= 1 }">
      <img :src="asset('figures/brazil/team-visit-sept-2026.jpg')" alt="The Brazilian team visiting TU Delft for UrbanHealthTwin, September 2026" />
    </figure>
    <div class="side">
      <p class="when reveal" :class="{ shown: step >= 2 }">September 2026</p>
      <p class="what reveal" :class="{ shown: step >= 2 }">The Brazilian team visited TU Delft for UrbanHealthTwin.</p>
      <div class="next reveal" :class="{ shown: step >= 3 }">
        <span>Next</span>
        A delegation from the UrbanHealthTwin team plans to visit São Paulo in spring/summer 2027, to engage with:
        <em><i>The project consortium</i><i>Local stakeholders</i><i>Partners and ideas beyond the project</i></em>
      </div>
    </div>
  </div>
  <div class="tl">
    <p class="tl-label reveal" :class="{ shown: step >= 4 }">Project timeline · 2026–2030 (48 months)</p>
    <ol>
      <li v-for="m in milestones" :key="m.name" class="reveal" :class="{ shown: step >= m.at }">
        <span class="dot" />
        <small>{{ m.months }}</small>
        <b>{{ m.name }}</b>
        <p>{{ m.text }}</p>
      </li>
    </ol>
    <p class="through reveal" :class="{ shown: step >= 9 }"><b>Throughout, months 0–48:</b> project coordination, governance and communication.</p>
  </div>
</template>

<style scoped>
.top { display: grid; grid-template-columns: 250px 1fr; gap: 20px; align-items: center; }
.photo { margin: 0; }
.photo img { display: block; width: 100%; height: 132px; object-fit: cover; object-position: 50% 45%; border: 1px solid #d9e2e6; }
.when { margin: 0 0 2px; color: #007fa8; font-size: 0.5em !important; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; }
.what { margin: 0 0 10px; color: #1d2830; font-size: 0.84em !important; font-weight: 700; line-height: 1.25; }
.next { padding: 8px 12px; background: #010101; color: #fff; font-size: 0.58em; line-height: 1.4; }
.next em { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 6px; font-style: normal; }
.next i { padding: 2px 9px; border: 1px solid #00aeef; border-radius: 10px; color: #fff; font-size: 0.9em; font-style: normal; }
.next span { display: block; margin-bottom: 2px; color: #00aeef; font-size: 0.82em; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; }
.tl { margin-top: 10px; padding: 8px 14px 10px; background: #f7fbfc; border-top: 5px solid #00aeef; }
.tl-label { margin: 0 0 10px; color: #007fa8; font-size: 0.5em !important; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; }
ol { position: relative; display: grid; grid-template-columns: repeat(5, 1fr); gap: 10px; margin: 0; padding: 0; list-style: none; }
ol::before { content: ''; position: absolute; left: 6px; right: 6px; top: 6px; height: 3px; background: #00aeef; }
li { position: relative; padding-top: 18px; }
.dot { position: absolute; top: 1px; left: 0; width: 13px; height: 13px; border-radius: 50%; background: #fff; border: 3px solid #00aeef; box-sizing: border-box; }
li small { display: block; color: #64727a; font-size: 0.48em; font-weight: 700; letter-spacing: 0.04em; }
li b { display: block; margin: 1px 0 3px; color: #010101; font-size: 0.72em; }
li p { margin: 0; color: #51616a; font-size: 0.54em !important; line-height: 1.35; }
.through { margin: 10px 0 0; padding-top: 7px; border-top: 1px dashed #c3d1d6; color: #51616a; font-size: 0.52em !important; }
.through b { color: #1d2830; }
.reveal { opacity: 0; transform: translateY(8px); transition: opacity 0.35s ease, transform 0.35s ease; }
.reveal.shown { opacity: 1; transform: none; }
</style>
