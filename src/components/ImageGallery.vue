<template>
  <section id="gallery" class="gallery-section">
    <div class="container">
      <div class="section-header reveal">
        <h2 class="section-title">场馆风采</h2>
        <p class="section-subtitle">沉浸式演出空间，为每一场精彩而生</p>
      </div>

      <div v-if="images.length > 0" class="gallery-container reveal">
        <div class="gallery-main" @mousedown="onDragStart" @mousemove="onDragMove" @mouseup="onDragEnd" @mouseleave="onDragEnd" @touchstart="onTouchStart" @touchmove="onTouchMove" @touchend="onTouchEnd">
          <div class="gallery-track" :style="trackStyle">
            <div
              v-for="(image, index) in images"
              :key="image.id"
              class="gallery-slide"
              :class="{ active: index === currentIndex }"
            >
              <img :src="image.src" :alt="image.alt" loading="lazy" />
              <div v-if="image.caption" class="slide-caption">
                <span>{{ image.caption }}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="gallery-controls">
          <button class="gallery-arrow" @click="prevImage" aria-label="上一张">
            <Icon name="arrow-left" :size="20" :stroke-width="2" />
          </button>

          <div class="gallery-dots">
            <button
              v-for="(image, index) in images"
              :key="image.id"
              class="gallery-dot"
              :class="{ active: index === currentIndex }"
              @click="goToImage(index)"
              :aria-label="`第 ${index + 1} 张`"
            ></button>
          </div>

          <button class="gallery-arrow" @click="nextImage" aria-label="下一张">
            <Icon name="arrow-right" :size="20" :stroke-width="2" />
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import Icon from './Icon.vue'

const props = defineProps({
  images: {
    type: Array,
    default: () => []
  }
})

const currentIndex = ref(0)
const isDragging = ref(false)
const startX = ref(0)
const dragOffset = ref(0)

const trackStyle = computed(() => {
  const offset = -(currentIndex.value * 100) + (dragOffset.value / window.innerWidth * 100)
  return {
    transform: `translateX(${offset}%)`,
    transition: isDragging.value ? 'none' : 'transform 0.3s ease-out'
  }
})

function nextImage() {
  currentIndex.value = (currentIndex.value + 1) % props.images.length
}

function prevImage() {
  currentIndex.value = (currentIndex.value - 1 + props.images.length) % props.images.length
}

function goToImage(index) {
  currentIndex.value = index
}

function onDragStart(e) {
  isDragging.value = true
  startX.value = e.clientX
  dragOffset.value = 0
}

function onDragMove(e) {
  if (!isDragging.value) return
  dragOffset.value = e.clientX - startX.value
}

function onDragEnd() {
  if (!isDragging.value) return
  isDragging.value = false
  const threshold = 50
  if (dragOffset.value < -threshold) {
    nextImage()
  } else if (dragOffset.value > threshold) {
    prevImage()
  }
  dragOffset.value = 0
}

function onTouchStart(e) {
  isDragging.value = true
  startX.value = e.touches[0].clientX
  dragOffset.value = 0
}

function onTouchMove(e) {
  if (!isDragging.value) return
  dragOffset.value = e.touches[0].clientX - startX.value
}

function onTouchEnd() {
  onDragEnd()
}

function onKeyDown(e) {
  if (e.key === 'ArrowLeft') prevImage()
  if (e.key === 'ArrowRight') nextImage()
}

onMounted(() => {
  window.addEventListener('keydown', onKeyDown)
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible')
      }
    })
  }, { threshold: 0.1 })

  setTimeout(() => {
    document.querySelectorAll('.gallery-section .reveal').forEach(el => {
      observer.observe(el)
    })
  }, 100)
})

onUnmounted(() => {
  window.removeEventListener('keydown', onKeyDown)
})
</script>

<style scoped>
.gallery-section {
  padding: var(--space-9) 0;
  background: var(--bg-secondary);
}

.section-header {
  text-align: center;
  margin-bottom: var(--space-8);
}

.section-title {
  font-size: clamp(28px, 4vw, 40px);
  font-weight: 700;
  letter-spacing: -0.02em;
  margin-bottom: var(--space-3);
}

.section-subtitle {
  font-size: 16px;
  color: var(--text-secondary);
}

.gallery-container {
  max-width: 1000px;
  margin: 0 auto;
}

.gallery-main {
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  cursor: grab;
  background: var(--bg-tertiary);
}

.gallery-main:active {
  cursor: grabbing;
}

.gallery-track {
  display: flex;
  width: 100%;
}

.gallery-slide {
  flex: 0 0 100%;
  position: relative;
}

.gallery-slide img {
  width: 100%;
  height: auto;
  aspect-ratio: 16 / 9;
  object-fit: cover;
  display: block;
}

.slide-caption {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 40px 24px 20px;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
}

.slide-caption span {
  font-size: 14px;
  color: var(--text-secondary);
}

.gallery-controls {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-5);
  margin-top: var(--space-5);
}

.gallery-arrow {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: var(--bg-tertiary);
  border: 1px solid var(--border-default);
  color: var(--text-primary);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.gallery-arrow:hover {
  background: var(--bg-elevated);
  border-color: var(--accent-primary);
  color: var(--accent-primary);
}

.gallery-dots {
  display: flex;
  gap: 8px;
}

.gallery-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--text-muted);
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 0;
}

.gallery-dot.active {
  background: var(--accent-primary);
  width: 24px;
  border-radius: 4px;
}

@media (max-width: 768px) {
  .gallery-slide img {
    aspect-ratio: 4 / 3;
  }
}
</style>
