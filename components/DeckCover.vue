<script setup lang="ts">
// Title slide: course kicker, deck title and presenter, following the CME4150 deck format.
withDefaults(defineProps<{ kicker?: string; title: string; presenter?: string; role?: string }>(), {
  kicker: 'CME4150',
  presenter: 'Dr. Ranjith K. Soman',
})
</script>

<template>
  <div class="cover-hero">
    <div class="cover-copy">
      <p class="kicker">{{ kicker }}</p>
      <h1>{{ title }}</h1>
      <div class="presenter-block">
        <strong>{{ presenter }}</strong>
        <span v-if="role" class="presenter-role">{{ role }}</span>
      </div>
    </div>
    <div class="cover-visual"><slot /></div>
  </div>
</template>

<style scoped>
.cover-hero { display: grid; grid-template-columns: 1.25fr 0.75fr; gap: 40px; align-items: center; min-height: 405px; }
.kicker { margin: 0 0 18px; color: #007fa8; font-size: 0.55em; font-weight: 700; letter-spacing: 0.13em; text-transform: uppercase; }
h1 { margin: 0; max-width: 640px; color: #010101; font: 700 1.75em/1.1 Arial, Helvetica, sans-serif; line-height: 1.1 !important; letter-spacing: -0.04em; }
.presenter-block { display: grid; gap: 4px; margin-top: 30px; padding-top: 14px; border-top: 1px solid #d9e2e6; max-width: 520px; }
.presenter-block p { margin: 0; color: #64727a; font-size: 0.48em; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; }
.presenter-block strong { color: #1d2830; font-size: 0.8em; }
.presenter-block .presenter-role { color: #51616a; font-size: 0.6em; line-height: 1.4; }
</style>
