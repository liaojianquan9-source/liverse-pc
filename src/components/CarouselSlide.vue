<template>
  <div
    class="carousel-slide"
    :class="{ active: isActive, inactive: !isActive }"
  >
    <div class="slide-bg" :style="{ backgroundImage: `url(${event.image})` }"></div>
    <div class="slide-overlay"></div>
    <div class="slide-content">
      <div class="container">
        <div class="event-meta">
          <span class="event-date">{{ formatDate(event.date) }}</span>
          <span class="event-time">{{ event.time }}</span>
        </div>
        <h1 class="event-title">{{ event.title }}</h1>
        <p v-if="event.subtitle" class="event-subtitle">{{ event.subtitle }}</p>
        <p class="event-desc">{{ event.description }}</p>
        <div class="event-actions">
          <button class="btn-primary" @click="$emit('viewDetail', event)">
            立即购票
            <Icon name="arrow-right" :size="16" :stroke-width="2" />
          </button>
          <button class="btn-secondary" @click="$emit('viewDetail', event)">
            查看详情
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useFormatDate } from '../composables/useFormatDate.js'
import Icon from './Icon.vue'

defineProps({
  event: { type: Object, required: true },
  isActive: { type: Boolean, default: false }
})

defineEmits(['viewDetail'])

const { formatDate } = useFormatDate()
</script>

<style scoped>
.carousel-slide {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  transform: scale(1.02);
  transition: opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1),
              transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}
.carousel-slide.active {
  opacity: 1;
  transform: scale(1);
  z-index: 2;
}
.carousel-slide.inactive {
  z-index: 1;
}
.slide-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
}
.slide-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    to top,
    rgba(10, 10, 10, 0.95) 0%,
    rgba(10, 10, 10, 0.6) 40%,
    rgba(10, 10, 10, 0.3) 100%
  );
  z-index: 1;
}
.slide-content {
  position: relative;
  z-index: 2;
  height: 100%;
  display: flex;
  align-items: flex-end;
  padding-bottom: 120px;
}
.event-meta {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 16px;
}
.event-date {
  font-family: var(--font-mono);
  font-size: 14px;
  color: var(--accent-primary);
  letter-spacing: 0.06em;
  font-weight: 500;
}
.event-time {
  font-size: 14px;
  color: var(--text-secondary);
}
.event-title {
  font-size: clamp(32px, 5vw, 56px);
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: -0.02em;
  margin-bottom: 12px;
  max-width: 700px;
}
.event-subtitle {
  font-size: 20px;
  color: var(--text-secondary);
  margin-bottom: 16px;
}
.event-desc {
  font-size: 16px;
  color: var(--text-muted);
  max-width: 560px;
  margin-bottom: 32px;
  line-height: 1.7;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.event-actions {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}
@media (max-width: 768px) {
  .slide-content { padding-bottom: 100px; }
  .event-title { font-size: 28px; }
  .event-subtitle { font-size: 16px; }
  .event-desc { font-size: 14px; margin-bottom: 24px; }
}
</style>
