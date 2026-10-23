<script setup lang="ts">
import { useAutoSteps } from '../composables/useAutoSteps'

// Closing slide on a white background: call to action, QR code to the IDM page and contact credentials.
const step = useAutoSteps(3, 350, 150)
</script>

<template>
  <div class="closing">
    <div class="text">
      <p class="eyebrow reveal" :class="{ shown: step >= 1 }">Thank you</p>
      <h2 class="reveal" :class="{ shown: step >= 1 }">Let’s explore more together</h2>
      <p class="ask reveal" :class="{ shown: step >= 1 }">Scan the code to discover Integral Design and Management. We would love to build on this partnership with new projects, new people and new ideas, together with Brazil.</p>
      <div class="who reveal" :class="{ shown: step >= 2 }">
        <strong>Dr. Ranjith K. Soman</strong>
        <span>Assistant Professor of Digital Construction</span>
        <span>TU Delft | Faculty of Civil Engineering and Geosciences</span>
        <span>Department of Materials, Mechanics, Management &amp; Design (3MD)</span>
      </div>
    </div>
    <div class="qr reveal" :class="{ shown: step >= 3 }">
      <img src="/figures/idm-qr.png" alt="QR code linking to the Integral Design and Management page at TU Delft" />
      <p>Integral Design and Management</p>
    </div>
  </div>
</template>

<style scoped>
.closing { display: grid; grid-template-columns: 1fr 236px; gap: 54px; align-items: center; min-height: 390px; margin-top: 20px; text-align: left; }
.eyebrow { margin: 0 0 8px; color: #007fa8 !important; font-size: 0.55em !important; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; }
h2 { margin: 0 0 14px; color: #010101; font-size: 2em; font-weight: 700; line-height: 1.08; letter-spacing: -0.03em; }
.ask { margin: 0 0 22px; color: #40525a; font-size: 0.82em !important; line-height: 1.45; }
.who { padding-top: 14px; border-top: 1px solid #d9e2e6; }
.who strong { display: block; margin-bottom: 4px; color: #010101; font-size: 0.9em; }
.who span { display: block; color: #51616a; font-size: 0.6em; line-height: 1.5; }
.qr { padding: 12px 12px 10px; background: #fff; border: 1px solid #d9e2e6; border-top: 5px solid #00aeef; box-shadow: 0 2px 8px rgba(1, 1, 1, 0.08); text-align: center; }
.qr img { display: block; width: 100%; height: auto; }
.qr p { margin: 4px 0 0; color: #1d2830 !important; font-size: 0.52em !important; font-weight: 700; }
.reveal { opacity: 0; transform: translateY(10px); transition: opacity 0.35s ease, transform 0.35s ease; }
.reveal.shown { opacity: 1; transform: none; }
</style>
