<script setup lang="ts">
import { useAutoSteps } from '../composables/useAutoSteps'

// Life-cycle strip with the "integral" lenses that span it; built from the IDM section page.
const phases = ['Design', 'Construction', 'Operation', 'Asset management']
const lenses = ['Human-centric', 'Resilient', 'Digital', 'Transdisciplinary']
const step = useAutoSteps(6, 450, 150)
</script>

<template>
  <div class="focus">
    <div class="phases">
      <div v-for="p in phases" :key="p" class="phase">{{ p }}</div>
    </div>
    <div class="reveal bridge" :class="{ shown: step >= 1 }">One integrated view across the whole life cycle</div>
    <div class="lenses">
      <div v-for="(l, i) in lenses" :key="l" class="reveal lens" :class="{ shown: step >= i + 2 }">
        <strong>{{ l }}</strong>
      </div>
    </div>
    <p class="teaching-note reveal" :class="{ shown: step >= 6 }">Design and management decisions are taken jointly across all phases, rather than passed from one to the next.</p>
  </div>
</template>

<style scoped>
.phases { display: grid; grid-template-columns: repeat(4, 1fr); gap: 0; }
.phase { position: relative; padding: 14px 10px 14px 22px; background: #010101; color: #fff; font-size: 0.72em; font-weight: 700; clip-path: polygon(0 0, calc(100% - 16px) 0, 100% 50%, calc(100% - 16px) 100%, 0 100%, 14px 50%); text-align: center; }
.phase:first-child { clip-path: polygon(0 0, calc(100% - 16px) 0, 100% 50%, calc(100% - 16px) 100%, 0 100%); }
.phase + .phase { margin-left: -6px; }
.bridge { margin: 16px 0; padding: 10px 16px; background: #00aeef; color: #010101; font-size: 0.7em; font-weight: 700; text-align: center; letter-spacing: 0.02em; }
.lenses { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }
.lens { padding-top: 12px; border-top: 5px solid #00aeef; }
.lens strong { color: #007fa8; font-size: 0.78em; }
.reveal { opacity: 0; transform: translateY(16px); transition: opacity 0.35s ease, transform 0.35s ease; }
.reveal.shown { opacity: 1; transform: none; }
</style>
