<template>
  <section id="events" class="event-list-section">
    <div class="container">
      <div class="section-header reveal">
        <h2 class="section-title">即将上演</h2>
        <p class="section-subtitle">精彩演出，不容错过</p>
      </div>

      <div v-if="eventStore.eventsLoading" class="skeleton-grid">
        <div v-for="i in 6" :key="i" class="skeleton-card">
          <div class="skeleton-image"></div>
          <div class="skeleton-content">
            <div class="skeleton-line short"></div>
            <div class="skeleton-line"></div>
            <div class="skeleton-line medium"></div>
          </div>
        </div>
      </div>

      <div v-else-if="eventStore.eventsError" class="error-state">
        <p>{{ eventStore.eventsError }}</p>
        <button class="btn-secondary" @click="eventStore.fetchEvents">重新加载</button>
      </div>

      <div v-else-if="upcomingEvents.length === 0" class="empty-state">
        <p>暂无即将上演的演出，敬请期待</p>
      </div>

      <div v-else class="events-grid">
        <EventCard
          v-for="(event, index) in upcomingEvents"
          :key="event.id"
          :event="event"
          class="reveal"
          :class="`reveal-delay-${(index % 4) + 1}`"
          @click="$emit('openModal', event)"
          @buy-ticket="$emit('openModal', event)"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { useEventStore } from '../stores/eventStore'
import { useIntersectionObserver } from '../composables/useIntersectionObserver.js'
import EventCard from './EventCard.vue'

const eventStore = useEventStore()
const upcomingEvents = computed(() => eventStore.upcomingEvents)

defineEmits(['openModal'])

useIntersectionObserver('.event-list-section .reveal')
</script>

<style scoped>
.event-list-section {
  padding: var(--space-9) 0;
  background: var(--bg-primary);
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
.events-grid, .skeleton-grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: var(--space-5);
}
@media (min-width: 640px) {
  .events-grid, .skeleton-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (min-width: 1024px) {
  .events-grid, .skeleton-grid { grid-template-columns: repeat(3, 1fr); }
}
.skeleton-card {
  background: var(--bg-secondary);
  border-radius: 8px;
  overflow: hidden;
}
.skeleton-image {
  aspect-ratio: 16 / 10;
  background: linear-gradient(90deg, var(--bg-tertiary) 25%, var(--bg-elevated) 50%, var(--bg-tertiary) 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}
.skeleton-content {
  padding: 20px 24px 24px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.skeleton-line {
  height: 14px;
  background: var(--bg-tertiary);
  border-radius: 4px;
  width: 100%;
}
.skeleton-line.short { width: 40%; }
.skeleton-line.medium { width: 70%; }
@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
.error-state, .empty-state {
  text-align: center;
  padding: var(--space-8) 0;
  color: var(--text-secondary);
}
.error-state button { margin-top: var(--space-4); }
</style>
