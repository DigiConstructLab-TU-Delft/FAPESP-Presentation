<script setup lang="ts">
import { ref, watch } from 'vue'
import { useAutoSteps } from '../composables/useAutoSteps'
import { asset } from '../composables/asset'

// Scientific staff of the IDM section as a network (names and photos from the TU Delft staff page).
// Positions are % of the stage; links are drawn between neighbours and are not labelled.
const people = [
  { name: 'Marian Bosch-Rekveldt', photo: 'marian-bosch-rekveldt.jpg', x: 44, y: 34 },
  { name: 'Marcel Hertogh', photo: 'marcel-hertogh.jpg', x: 20, y: 50 },
  { name: 'Eleni Papadonikolaki', photo: 'eleni-papadonikolaki.png', x: 60, y: 9 },
  { name: 'Erik-Jan Houwing', photo: 'erik-jan-houwing.jpg', x: 7, y: 18 },
  { name: 'Sander van Nederveen', photo: 'sander-van-nederveen.jpg', x: 91, y: 62 },
  { name: 'Ranjith Soman', photo: 'ranjith-soman.png', x: 74, y: 40 },
  { name: 'Leon Hombergen', photo: 'leon-hombergen.png', x: 54, y: 72 },
  { name: 'Johan Ninan', photo: 'johan-ninan.jpg', x: 30, y: 84 },
  { name: 'Maria Nogal', photo: 'maria-nogal.jpg', x: 89, y: 14 },
  { name: 'Hans Ramler', photo: 'hans-ramler.jpg', x: 76, y: 86 },
  { name: 'Yirang Lim', photo: 'yirang-lim.png', x: 6, y: 82 },
]
// links that were asked for by name: Ranjith to Johan, Maria, Marian, Eleni and Sander; Eleni to Johan, Marcel, Yirang, Maria and Erik-Jan; Yirang to Johan; Marcel to Marian; Ranjith to Hans; Marian to Leon and Hans
const baseLinks: number[][] = [[5, 7], [5, 8], [5, 0], [5, 2], [5, 4], [2, 7], [2, 1], [2, 10], [6, 0], [9, 0], [2, 8], [10, 7], [3, 2], [1, 0], [5, 9]]
const near = (a: number, b: number) => Math.hypot((people[a].x - people[b].x) * 10.48, (people[a].y - people[b].y) * 3.4)
const links: number[][] = [...baseLinks]
const have = new Set(baseLinks.map(([a, b]) => `${Math.min(a, b)}-${Math.max(a, b)}`))
people.forEach((_, i) => {
  people.map((__, j) => j).filter(j => j !== i && j !== 5).sort((a, b) => near(i, a) - near(i, b)).slice(0, i === 5 ? 0 : 2).forEach(j => {
    const k = `${Math.min(i, j)}-${Math.max(i, j)}`
    if (!have.has(k)) { have.add(k); links.push([i, j]) }
  })
})
const key = (a: number, b: number) => `${Math.min(a, b)}-${Math.max(a, b)}`
// every link is drawn with the same weight and is gently curved
const W = 804, H = 262
const curve = ([a, b]: number[]) => {
  const x1 = (people[a].x / 100) * W, y1 = (people[a].y / 100) * H, x2 = (people[b].x / 100) * W, y2 = (people[b].y / 100) * H
  const mx = (x1 + x2) / 2, my = (y1 + y2) / 2, dx = x2 - x1, dy = y2 - y1, len = Math.hypot(dx, dy) || 1
  const off = (((a + b) % 2) ? 1 : -1) * Math.min(0.12 * len, 34)
  const cx = mx + (-dy / len) * off, cy = my + (dx / len) * off
  const f = (x: number, y: number) => `${((x / W) * 100).toFixed(2)} ${((y / H) * 100).toFixed(2)}`
  return `M ${f(x1, y1)} Q ${f(cx, cy)} ${f(x2, y2)}`
}
const initials = (n: string) => n.split(' ').filter(w => /^[A-Z]/.test(w)).map(w => w[0]).slice(0, 2).join('')
// Sequence: the sentence, then the photos in a random order, then the connections in a random order.
// 1 + 11 photo steps + 9 connection steps at 105 ms each is about 2.2 s, plus the 0.35 s fade.
const LINK_STEPS = 9
const shuffled = (n: number) => { const a = Array.from({ length: n }, (_, i) => i); for (let i = n - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]] } return a }
const photoRank = ref(shuffled(people.length))
const linkRank = ref(links.map(() => Math.floor(Math.random() * LINK_STEPS)))
const step = useAutoSteps(1 + people.length + LINK_STEPS, 105, 100)
watch(step, v => { if (v === 0) { photoRank.value = shuffled(people.length); linkRank.value = linkRank.value.map(() => Math.floor(Math.random() * LINK_STEPS)) } })
const personShown = (i: number) => step.value >= 2 + photoRank.value.indexOf(i)
const linkShown = (idx: number) => step.value >= 2 + people.length + linkRank.value[idx]
</script>

<template>
  <p class="teaching-note group-line" :class="{ shown: step >= 1 }">An interdisciplinary group of <b>engineers</b>, <b>social scientists</b>, <b>architects</b>, <b>computer scientists</b>, <b>numerical modellers</b> and <b>managers</b>, working together on transdisciplinary research on built-environment problems from a socio-technical perspective.</p>
  <div class="stage">
    <svg class="mesh" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
      <path v-for="(l, li) in links" :key="l.join('-')" :d="curve(l)" :class="{ shown: linkShown(li) }" />
    </svg>
    <div v-for="(p, i) in people" :key="p.name" class="person" :style="{ left: p.x + '%', top: p.y + '%' }">
      <div class="node" :class="{ shown: personShown(i) }">
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
.mesh path { fill: none; stroke: #00aeef; stroke-width: 1.6; vector-effect: non-scaling-stroke; stroke-linecap: round; opacity: 0; transition: opacity 0.4s ease; }
.mesh path.shown { opacity: 0.4; }
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
