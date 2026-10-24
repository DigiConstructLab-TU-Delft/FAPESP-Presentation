<script setup lang="ts">
import { useAutoSteps } from '../composables/useAutoSteps'
import { asset } from '../composables/asset'

// UrbanHealthTwin: project summary on the left, partner and funder logos on the right (source: NWO project page).
const academic = [
  { name: 'TU Delft', logo: 'tudelft.svg' },
  { name: 'University of São Paulo', logo: 'usp.png', mono: true },
  { name: 'University of Groningen', logo: 'groningen.svg' },
  { name: 'Federal University of ABC (UFABC)', logo: 'ufabc.svg' },
  { name: 'Leiden University', logo: 'leiden.png' },
  { name: 'CEPEDOC Cidades Saudáveis', logo: 'cepedoc.svg' },
]
const industry = [
  { name: 'Avia-GIS', logo: 'avia-gis.png' },
  { name: 'Bentley Systems', logo: 'bentley.svg' },
]
const funders = [
  { name: 'NWO', logo: 'nwo.svg' },
  { name: 'FAPESP', logo: 'fapesp.svg' },
]
const step = useAutoSteps(4, 450, 150)
</script>

<template>
  <div class="uht">
    <div class="uht-text reveal" :class="{ shown: step >= 1 }">
      <p class="lead">A participatory digital twin to investigate the effects of nature-based solutions on climate change-induced urban health challenges.</p>
      <p class="facts"><b>2026–2030</b> · NWO–FAPESP Cooperation Brazil · Leads: Johan Ninan and Ranjith Soman (TU Delft), Estela Macedo Alves (University of São Paulo, Brazil)</p>
      <img src="/figures/uht-participatory.png" alt="People around a shared digital map exploring climate risks and co-creating interventions" class="uht-figure" />
    </div>
    <div class="uht-logos">
      <p class="uht-label reveal" :class="{ shown: step >= 2 }">Participating academic institutions</p>
      <div class="academic reveal" :class="{ shown: step >= 2 }">
        <div v-for="p in academic" :key="p.name" class="logo-cell">
          <img :src="asset(`figures/logos/${p.logo}`)" :alt="p.name" :class="{ mono: p.mono }" />
        </div>
      </div>
      <p class="uht-label reveal" :class="{ shown: step >= 3 }">Industry collaborators</p>
      <div class="industry reveal" :class="{ shown: step >= 3 }">
        <div v-for="i in industry" :key="i.name" class="logo-cell">
          <img :src="asset(`figures/logos/${i.logo}`)" :alt="i.name" />
        </div>
      </div>
      <p class="uht-label reveal" :class="{ shown: step >= 4 }">Funded by</p>
      <div class="funders reveal" :class="{ shown: step >= 4 }">
        <div v-for="f in funders" :key="f.name" class="logo-cell">
          <img :src="asset(`figures/logos/${f.logo}`)" :alt="f.name" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.uht { display: grid; grid-template-columns: 1.05fr 0.95fr; gap: 36px; align-items: start; margin-top: 4px; }
.lead { margin: 0 0 10px; font-size: 0.82em !important; line-height: 1.35; }
.uht-figure { display: block; width: 100%; max-height: 200px; margin-top: 10px; object-fit: contain; }
.facts { margin: 0; padding: 10px 14px; border-left: 5px solid #00aeef; background: #eff9fc; color: #40525a; font-size: 0.58em !important; line-height: 1.4; }
.facts b { color: #007fa8; }
.uht-logos { padding: 14px 16px 16px; background: #f7fbfc; border-top: 5px solid #00aeef; }
.uht-label { margin: 0 0 8px; color: #007fa8; font-size: 0.46em !important; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; }
.uht-label:not(:first-child) { margin-top: 11px; }
.academic { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; }
.industry { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
.funders { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
.logo-cell { height: 46px; padding: 6px 10px; box-sizing: border-box; background: #fff; border: 1px solid #d9e2e6; }
.logo-cell img { display: block; width: 100%; height: 100%; object-fit: contain; }
.logo-cell img.mono { filter: brightness(0); }
.reveal { opacity: 0; transform: translateY(12px); transition: opacity 0.35s ease, transform 0.35s ease; }
.reveal.shown { opacity: 1; transform: none; }
</style>
