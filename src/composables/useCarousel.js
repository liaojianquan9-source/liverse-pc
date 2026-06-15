import { ref, computed, watch, onUnmounted } from 'vue'

export function useCarousel(items, options = {}) {
  const { autoPlayInterval = 5000 } = options

  const currentIndex = ref(0)
  const isAutoPlaying = ref(true)
  const isTransitioning = ref(false)
  let autoPlayTimer = null

  const itemList = computed(() => Array.isArray(items) ? items : (items?.value || []))
  const count = computed(() => itemList.value.length)

  function goTo(index) {
    if (isTransitioning.value || index === currentIndex.value || count.value <= 1) return
    isTransitioning.value = true
    currentIndex.value = index
    setTimeout(() => { isTransitioning.value = false }, 800)
  }

  function next() {
    goTo((currentIndex.value + 1) % count.value)
  }

  function prev() {
    goTo((currentIndex.value - 1 + count.value) % count.value)
  }

  function startAutoPlay() {
    stopAutoPlay()
    if (count.value > 1) {
      autoPlayTimer = setInterval(() => {
        if (isAutoPlaying.value) next()
      }, autoPlayInterval)
    }
  }

  function stopAutoPlay() {
    if (autoPlayTimer) {
      clearInterval(autoPlayTimer)
      autoPlayTimer = null
    }
  }

  function pause() { isAutoPlaying.value = false }
  function resume() { isAutoPlaying.value = true }

  watch(count, (len) => {
    if (len > 0) startAutoPlay()
  }, { immediate: true })

  onUnmounted(stopAutoPlay)

  return {
    currentIndex,
    isAutoPlaying,
    isTransitioning,
    next,
    prev,
    goTo,
    pause,
    resume
  }
}
