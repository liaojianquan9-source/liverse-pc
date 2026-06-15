<template>
  <section id="home" class="hero-carousel">
    <div class="carousel-container">
      <CarouselSlide
        v-for="(event, index) in events"
        :key="event.id"
        :event="event"
        :is-active="index === currentIndex"
        @view-detail="$emit('viewDetail', $event)"
      />
    </div>

    <CarouselControls @prev="prev" @next="next" />

    <CarouselIndicators
      :count="events.length"
      v-model="currentIndex"
    />
  </section>
</template>

<script setup>
import { onMounted } from 'vue'
import { useCarousel } from '../composables/useCarousel.js'
import CarouselSlide from './CarouselSlide.vue'
import CarouselControls from './CarouselControls.vue'
import CarouselIndicators from './CarouselIndicators.vue'

const props = defineProps({
  events: { type: Array, default: () => [] },
  autoPlayInterval: { type: Number, default: 5000 }
})

defineEmits(['viewDetail'])

const { currentIndex, next, prev } = useCarousel(props.events, {
  autoPlayInterval: props.autoPlayInterval
})

onMounted(() => {
  const container = document.querySelector('.hero-carousel')
  if (!container) return
  container.addEventListener('mouseenter', () => {
    // useCarousel 内部处理了 isAutoPlaying，这里不需要额外操作
  })
})
</script>

<style scoped>
.hero-carousel {
  position: relative;
  height: 100vh;
  min-height: 600px;
  overflow: hidden;
}
.carousel-container {
  position: relative;
  width: 100%;
  height: 100%;
}
@media (max-width: 768px) {
  .hero-carousel { min-height: 500px; }
}
</style>
