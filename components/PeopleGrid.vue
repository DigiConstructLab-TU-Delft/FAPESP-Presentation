<script setup lang="ts">
import { useAutoSteps } from '../composables/useAutoSteps'
import { asset } from '../composables/asset'

// Scientific staff of the IDM section as a network (names and photos from the TU Delft staff page).
// Positions are % of the stage; links are drawn between neighbours and are not labelled.
const people = [
  { name: 'Marian Bosch-Rekveldt', photo: 'marian-bosch-rekveldt.jpg', x: 9, y: 20 },
  { name: 'Marcel Hertogh', photo: 'marcel-hertogh.jpg', x: 30, y: 15 },
  { name: 'Eleni Papadonikolaki', photo: 'eleni-papadonikolaki.png', x: 52, y: 25 },
  { name: 'Erik-Jan Houwing', photo: 'erik-jan-houwing.jpg', x: 74, y: 14 },
  { name: 'Sander van Nederveen', photo: 'sander-van-nederveen.jpg', x: 92, y: 36 },
  { name: 'Ranjith Soman', photo: 'ranjith-soman.png', x: 8, y: 64 },
  { name: 'Leon Hombergen', photo: 'leon-hombergen.png', x: 26, y: 55 },
  { name: 'Johan Ninan', photo: 'johan-ninan.jpg', x: 42, y: 64 },
  { name: 'Maria Nogal', photo: 'maria-nogal.jpg', x: 63, y: 58 },
  { name: 'Hans Ramler', photo: 'hans-ramler.jpg', x: 83, y: 66 },
  { name: 'Yirang Lim', photo: 'yirang-lim.png', x: 56, y: 85 },
]
const links = [[0, 1], [0, 6], [0, 5], [5, 6], [6, 1], [1, 2], [6, 7], [1, 7], [2, 7], [2, 3], [2, 8], [7, 8], [3, 8], [3, 4], [8, 4], [8, 9], [4, 9], [10, 7], [10, 8]]
// every other pair gets a very faint dotted line, so the whole group reads as connected without clutter
const key = (a: number, b: number) => `${Math.min(a, b)}-${Math.max(a, b)}`
const main = new Set(links.map(([a, b]) => key(a, b)))
const faint: number[][] = []
for (let i = 0; i < people.length; i++) for (let j = i + 1; j < people.length; j++) if (!main.has(key(i, j))) faint.push([i, j])
const initials = (n: string) => n.split(' ').filter(w => /^[A-Z]/.test(w)).map(w => w[0]).slice(0, 2).join('')
const step = useAutoSteps(people.length + 1, 180, 150)
const linkShown = ([a, b]: number[]) => step.value > Math.max(a, b) + 1
</script>

<template>
  <p class="teaching-note group-line" :class="{ shown: step >= 1 }">An interdisciplinary group of <b>engineers</b>, <b>social scientists</b>, <b>architects</b>, <b>computer scientists</b>, <b>numerical modellers</b> and <b>managers</b>, working together on transdisciplinary research on built-environment problems from a socio-technical perspective.</p>
  <div class="stage">
    <svg class="mesh" aria-hidden="true">
      <line v-for="l in faint" :key="'f' + l.join('-')" class="faint" :x1="people[l[0]].x + '%'" :y1="people[l[0]].y + '%'" :x2="people[l[1]].x + '%'" :y2="people[l[1]].y + '%'" :class="{ shown: linkShown(l) }" />
      <line v-for="l in links" :key="l.join('-')" :x1="people[l[0]].x + '%'" :y1="people[l[0]].y + '%'" :x2="people[l[1]].x + '%'" :y2="people[l[1]].y + '%'" :class="{ shown: linkShown(l) }" />
    </svg>
    <div v-for="(p, i) in people" :key="p.name" class="person" :style="{ left: p.x + '%', top: p.y + '%' }">
      <div class="node" :class="{ shown: step > i + 1 }">
        <img v-if="p.photo" :src="asset(`figures/people/${p.photo}`)" :alt="p.name" />
        <div v-else class="initials" :aria-label="p.name">{{ initials(p.name) }}</div>
        <p>{{ p.name }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.stage { position: relative; height: 262px; margin-top: 2px; }
.mesh { position: absolute; inset: 0; width: 100%; height: 100%; overflow: visible; }
.mesh line { stroke: #00aeef; stroke-width: 2; opacity: 0; transition: opacity 0.4s ease; }
.mesh line.shown { opacity: 0.4; }
.mesh line.faint { stroke-width: 0.9; stroke-dasharray: 1 5; stroke-linecap: round; }
.mesh line.faint.shown { opacity: 0.14; }
.person { position: absolute; width: 0; height: 0; }
.node { position: absolute; left: -70px; top: -34px; width: 140px; text-align: center; opacity: 0; transform: scale(0.7); transition: opacity 0.35s ease, transform 0.35s ease; }
.node.shown { opacity: 1; transform: none; }
.node img, .initials { display: block; width: 68px; height: 68px; margin: 0 auto; border-radius: 50%; object-fit: cover; object-position: 50% 28%; border: 3px solid #00aeef; background: #eff9fc; box-sizing: border-box; }
.initials { display: grid; place-items: center; color: #007fa8; font-size: 1.05em; font-weight: 700; }
.node p { margin: 5px 0 0; color: #1d2830; font-size: 0.5em !important; font-weight: 700; line-height: 1.2; }
.group-line { margin: 0 0 6px; padding: 11px 18px; font-size: 0.66em !important; opacity: 0; transform: translateY(10px); transition: opacity 0.35s ease, transform 0.35s ease; }
.group-line b { color: #00a6d6; font-weight: 700; }
.group-line.shown { opacity: 1; transform: none; }
</style>
