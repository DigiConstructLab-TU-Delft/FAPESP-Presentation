<script setup lang="ts">
import { useAutoSteps } from '../composables/useAutoSteps'

// Walks down from the faculty to IDM on its own; each card states that level's aim.
const levels = [
  { tag: 'University', name: 'TU Delft', aim: 'Engineering education and research for society', list: ['Civil Engineering & Geosciences', 'and seven other faculties'], on: 0 },
  { tag: 'Faculty', name: 'Civil Engineering & Geosciences', aim: 'Understand, intervene and improve the world we live in', list: ['Engineering Structures', 'Geoscience & Remote Sensing', 'Geoscience & Engineering', 'Hydraulic Engineering', '3MD', 'Transport & Planning', 'Water Management'], on: 4 },
  { tag: 'Department', name: 'Materials, Mechanics, Management & Design (3MD)', aim: 'Design, construct and manage civil infrastructure and buildings, from micro to macro scale', list: ['Applied Mechanics', 'Materials & Environment', 'Integral Design & Management'], on: 2 },
  { tag: 'Section', name: 'Integral Design & Management (IDM)', aim: 'Research at system scale for a resilient, sustainable and community-centric future', list: [], on: -1 },
]
const step = useAutoSteps(4, 700, 150)
</script>

<template>
  <div class="org-path">
    <div v-for="(l, i) in levels" :key="l.name" class="org-level" :class="{ first: i === 0, last: i === levels.length - 1, shown: step >= i }">
      <p class="org-tag">{{ l.tag }}</p>
      <h3>{{ l.name }}</h3>
      <p class="org-aim"><span>Aim</span>{{ l.aim }}</p>
      <ul v-if="l.list.length">
        <li v-for="(item, j) in l.list" :key="item" :class="{ on: j === l.on && i > 0 && step > i }">{{ item }}</li>
      </ul>
      <img v-else src="/figures/idm-logo.jpg" alt="IDM logo" class="org-logo" />
    </div>
  </div>
</template>

<style scoped>
.org-path { display: grid; grid-template-columns: repeat(4, 1fr); gap: 30px; margin-top: 6px; }
.org-level { position: relative; padding: 14px 14px 12px; border-top: 5px solid #00aeef; background: #f7fbfc; opacity: 0; transform: translateX(26px); transition: opacity 0.35s ease, transform 0.35s ease; }
.org-level.shown { opacity: 1; transform: none; }
.org-level::before { content: '›'; position: absolute; left: -24px; top: 42%; color: #00aeef; font-size: 2.2em; font-weight: 700; line-height: 0; }
.org-level.first::before { content: none; }
.org-level.last { background: #eff9fc; border-top-color: #010101; }
.org-tag { margin: 0 0 6px; color: #007fa8; font-size: 0.48em !important; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; }
h3 { margin: 0; color: #010101; font-size: 0.78em; line-height: 1.2; }
.org-aim { margin: 10px 0 10px; padding: 8px 10px; background: #fff; border-left: 4px solid #00aeef; color: #1d2830; font-size: 0.56em !important; font-weight: 700; line-height: 1.35; }
.org-aim span { display: block; margin-bottom: 3px; color: #007fa8; font-size: 0.85em; letter-spacing: 0.12em; text-transform: uppercase; }
ul { margin: 0; padding: 8px 0 0; border-top: 1px solid #d9e2e6; list-style: none; }
li { margin: 0; padding: 1px 0; color: #64727a; font-size: 0.5em !important; line-height: 1.3; }
li.on { color: #007fa8; font-weight: 700; animation: nudge 1.6s ease-in-out infinite; }
@keyframes nudge { 0%, 100% { transform: translateX(0); } 50% { transform: translateX(5px); } }
.org-logo { display: block; width: 70%; margin: 4px auto 0; filter: brightness(1.08) contrast(1.2); mix-blend-mode: multiply; }
</style>
