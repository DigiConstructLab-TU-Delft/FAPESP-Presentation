<script setup lang="ts">
import { useAutoSteps } from '../composables/useAutoSteps'
import { asset } from '../composables/asset'

// Past collaboration with Brazil on one slide. Photos: TU Delft news item "TU Delft extends strong collaboration with Brazil"
// (1 May 2023), a group photo supplied for the deck, and a P1MC cistern by Moacir Ximenes (Wikimedia Commons, public domain).
const step = useAutoSteps(8, 280, 150)

const timeline = [
  { when: '2015', place: 'São Paulo', text: 'Prof. Marcel Hertogh directed the international seminar on the Architectural and Urban Articulation of the Metropolitan Waterway System of São Paulo.', at: 1 },
  { when: 'March 2023', place: 'FAU-USP', text: 'Seminar “The architectural project of fluid grounds”. Hertogh’s keynote: “Towards Resiliency: Transdisciplinary approaches for future infrastructures”.', at: 2 },
  { when: 'March 2023', place: 'City of São Paulo', text: 'Meetings with Fernando Barrancos Chucre (SGM-SEPEP) on fluvial mobility and waterway transport (the Aquático Project) and circular wastewater recovery.', at: 3 },
  { when: 'March 2023', place: 'Brasília', text: 'Hertogh and Dr. Yirang Lim met Dr. Jorge Barros (CEO Brazil, Smart Cities Business America) and framed an MoU with the Resilient Delta Initiative.', at: 4 },
  { when: '23–25 May 2023', place: 'SCBA Congress, São Paulo', text: 'Keynotes and collaborative workshops.', at: 5 },
]
const photos = [
  { src: 'group-photo.png', alt: 'Group photo from the visit', cap: 'Group photo', pos: '50% 40%' },
  { src: 'usp-fau-seminar.jpg', alt: 'Seminar at USP-FAU', cap: 'FAU-USP seminar', pos: '50% 50%' },
  { src: 'city-meeting.jpg', alt: 'Fernando Barrancos Chucre, Marcel Hertogh and Patricia Osseweijer', cap: 'With F. B. Chucre', pos: '50% 22%' },
  { src: 'brasilia-meeting.jpg', alt: 'Marcel Hertogh, Yirang Lim and Jorge Barros in Brasília', cap: 'Brasília meeting', pos: '50% 35%' },
]
</script>

<template>
  <div class="collab">
    <section class="col main">
      <header class="reveal" :class="{ shown: step >= 1 }">
        <h3>Smart Cities and Urban Water Governance Initiative</h3>
        <p class="where">São Paulo and Brasília</p>
      </header>
      <ol>
        <li v-for="t in timeline" :key="t.text" class="reveal" :class="{ shown: step >= t.at }">
          <b>{{ t.when }}<span> · {{ t.place }}</span></b>
          <p>{{ t.text }}</p>
        </li>
      </ol>
      <div class="strip reveal" :class="{ shown: step >= 5 }">
        <figure v-for="p in photos" :key="p.src">
          <img :src="asset(`figures/brazil/${p.src}`)" :alt="p.alt" :style="{ objectPosition: p.pos }" />
          <figcaption>{{ p.cap }}</figcaption>
        </figure>
      </div>
    </section>
    <section class="col side">
      <header class="reveal" :class="{ shown: step >= 6 }">
        <h3>One Million Cisterns Programme (P1MC)</h3>
        <p class="where">Viability assessment · 2023–2024</p>
      </header>
      <div class="reveal" :class="{ shown: step >= 6 }">
        <p class="desc">Institutional assessment applying the <b>Viable System Model (VSM)</b> to examine the governance and maintenance challenges of decentralised rainwater harvesting systems across Brazilian extractive reserves.</p>
        <div class="chips"><span>Governance</span><span>Maintenance</span><span>Rainwater harvesting</span><span>Extractive reserves</span></div>
      </div>
      <figure class="cist reveal" :class="{ shown: step >= 7 }">
        <img src="/figures/brazil/p1mc-cistern.jpg" alt="A P1MC rainwater cistern with its programme plaque" />
        <figcaption>A P1MC cistern in Ceará (Moacir Ximenes, Wikimedia Commons)</figcaption>
      </figure>
      <div class="next reveal" :class="{ shown: step >= 8 }">
        <span>Next</span>
        A delegation from the UrbanHealthTwin team plans to visit São Paulo in spring/summer 2027, to explore collaboration beyond the project itself.
      </div>
    </section>
  </div>
  <p class="src">Source: <a href="https://www.tudelft.nl/2023/brazil-china-india-collaborations/tu-delft-extends-strong-collaboration-with-brazil">TU Delft extends strong collaboration with Brazil (2023)</a></p>
</template>

<style scoped>
.collab { display: grid; grid-template-columns: 1.6fr 1fr; gap: 16px; }
.col { padding: 10px 14px 12px; background: #f7fbfc; border-top: 5px solid #00aeef; }
h3 { margin: 0; color: #010101; font-size: 0.72em; line-height: 1.2; }
.where { margin: 2px 0 7px; color: #007fa8; font-size: 0.44em !important; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; }
ol { margin: 0 0 8px; padding: 0; list-style: none; border-left: 2px solid #00aeef; }
li { position: relative; margin: 0 0 4px; padding-left: 12px; }
li::before { content: ''; position: absolute; left: -6px; top: 3px; width: 9px; height: 9px; border-radius: 50%; background: #00aeef; border: 2px solid #f7fbfc; }
li b { display: block; color: #1d2830; font-size: 0.6em; }
li b span { color: #007fa8; }
li p { margin: 1px 0 0; color: #40525a; font-size: 0.54em !important; line-height: 1.35; }
.strip { display: grid; grid-template-columns: repeat(4, 1fr); gap: 7px; }
figure { margin: 0; }
.strip img { display: block; width: 100%; height: 60px; object-fit: cover; border: 1px solid #d9e2e6; }
figcaption { margin-top: 2px; color: #64727a; font-size: 0.42em; line-height: 1.2; }
.desc { margin: 0 0 8px; color: #40525a; font-size: 0.6em !important; line-height: 1.4; }
.desc b { color: #007fa8; }
.chips { display: flex; flex-wrap: wrap; gap: 5px; margin-bottom: 8px; }
.chips span { padding: 2px 8px; border-radius: 10px; background: #fff; border: 1px solid #d9e2e6; color: #51616a; font-size: 0.48em; }
.cist img { display: block; width: 100%; height: 84px; object-fit: cover; object-position: 50% 72%; border: 1px solid #d9e2e6; }
.next { margin-top: 8px; padding: 7px 10px; background: #010101; color: #fff; font-size: 0.5em; line-height: 1.4; }
.next span { display: block; margin-bottom: 2px; color: #00aeef; font-size: 0.82em; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; }
.src { margin: 4px 0 0; color: #829099; font-size: 0.4em !important; }
.src a { color: #829099; }
.reveal { opacity: 0; transform: translateY(8px); transition: opacity 0.35s ease, transform 0.35s ease; }
.reveal.shown { opacity: 1; transform: none; }
</style>
