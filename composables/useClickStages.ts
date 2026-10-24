import { computed, onBeforeUnmount, ref, unref, watch } from 'vue'
import { useSlideContext } from '@slidev/client'

// Click-driven stages that each play a short staggered sequence. sizes[k] is how many items stage k reveals;
// stage k starts on click k+1 and is undone when the audience clicks back. Thumbnails, overview, previews and
// exports (where all clicks are on) show every stage. The slide must register the clicks itself (v-click markers).
export function useClickStages(sizes: number[], interval = 280, first = 80) {
  const { $clicks, $renderContext } = useSlideContext() as any
  const counts = sizes.map(() => ref(0))
  const timers: number[][] = sizes.map(() => [])
  const stop = (k: number) => { timers[k].forEach(clearTimeout); timers[k] = [] }
  const run = (k: number) => {
    stop(k)
    counts[k].value = 0
    for (let i = 1; i <= sizes[k]; i++) timers[k].push(window.setTimeout(() => { counts[k].value = i }, first + (i - 1) * interval))
  }
  const level = computed(() => (unref($renderContext) !== 'slide' ? sizes.length : Math.min(Number(unref($clicks)) || 0, sizes.length)))
  watch(
    level,
    (now, before) => {
      const prev = before ?? 0
      for (let k = 0; k < sizes.length; k++) {
        if (k < now && k >= prev) run(k)
        else if (k >= now) { stop(k); counts[k].value = 0 }
      }
    },
    { immediate: true },
  )
  onBeforeUnmount(() => sizes.forEach((_, k) => stop(k)))
  return counts
}
