<template>
  <header class="tu-header" :class="{ dark: $nav.currentLayout === 'section' }" aria-label="TU Delft">
    <img src="/figures/tu-delft-logo.svg" alt="TU Delft" class="tu-logo" />
  </header>
  <img v-if="$nav.currentPage !== 1" src="/figures/idm-logo.jpg" alt="IDM – Integral Design and Management" class="idm-header-logo" :class="{ dark: $nav.currentLayout === 'section' }" />
</template>
