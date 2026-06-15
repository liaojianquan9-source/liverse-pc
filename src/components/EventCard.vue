<template>
  <div class="event-card" @click="$emit('click', event)">
    <div class="card-image">
      <img :src="event.image" :alt="event.title" loading="lazy" />
      <div class="card-overlay"></div>
      <div class="card-badges">
        <span :class="['badge', badgeClass]">{{ statusText }}</span>
      </div>
    </div>
    <div class="card-content">
      <div class="event-date-row">
        <span class="event-date">{{ formatDate(event.date) }}</span>
        <span class="event-time">{{ event.time }}</span>
      </div>
      <h3 class="event-title">{{ event.title }}</h3>
      <p v-if="event.subtitle" class="event-subtitle">{{ event.subtitle }}</p>
      <div class="event-meta">
        <span class="meta-item">
          <Icon name="location" :size="14" :stroke-width="2" />
          {{ event.venue }}
        </span>
        <span class="meta-item">
          <Icon name="coin" :size="14" :stroke-width="2" />
          {{ event.price }}
        </span>
      </div>
      <button
        class="ticket-btn"
        :class="{ disabled: event.status === 'soldout' }"
        @click.stop="$emit('buyTicket', event)"
      >
        {{ event.status === 'soldout' ? '已售罄' : '立即购票' }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useFormatDate } from '../composables/useFormatDate.js'
import { EVENT_STATUS_MAP, EVENT_STATUS_BADGE_CLASS } from '../utils/constants.js'
import Icon from './Icon.vue'

const props = defineProps({
  event: { type: Object, required: true }
})

defineEmits(['click', 'buyTicket'])

const { formatDate } = useFormatDate()

const statusText = computed(() => EVENT_STATUS_MAP[props.event.status] || props.event.status)
const badgeClass = computed(() => EVENT_STATUS_BADGE_CLASS[props.event.status] || '')
</script>

<style scoped>
.event-card {
  position: relative;
  background: var(--bg-secondary);
  border: 1px solid var(--border-subtle);
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}
.event-card:hover {
  border-color: var(--border-strong);
  transform: translateY(-4px);
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.4);
}
.card-image {
  position: relative;
  aspect-ratio: 16 / 10;
  overflow: hidden;
}
.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}
.event-card:hover .card-image img {
  transform: scale(1.05);
}
.card-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to top, rgba(17, 17, 17, 0.8) 0%, transparent 50%);
}
.card-badges {
  position: absolute;
  top: 12px;
  left: 12px;
  display: flex;
  gap: 8px;
  z-index: 2;
}
.badge {
  padding: 4px 12px;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.04em;
  border-radius: 4px;
}
.badge.onsale {
  background: var(--accent-primary);
  color: var(--text-inverse);
}
.badge.soldout {
  background: var(--bg-elevated);
  color: var(--text-secondary);
  border: 1px solid var(--border-default);
}
.badge.upcoming {
  background: var(--warning);
  color: var(--text-inverse);
}
.card-content {
  padding: 20px 24px 24px;
}
.event-date-row {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 10px;
}
.event-date {
  font-family: var(--font-mono);
  font-size: 13px;
  color: var(--accent-primary);
  letter-spacing: 0.04em;
  font-weight: 500;
}
.event-time {
  font-size: 13px;
  color: var(--text-muted);
}
.event-title {
  font-size: 18px;
  font-weight: 600;
  color: var(--text-primary);
  line-height: 1.4;
  margin-bottom: 6px;
}
.event-subtitle {
  font-size: 14px;
  color: var(--text-secondary);
  margin-bottom: 12px;
}
.event-meta {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 20px;
}
.meta-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: var(--text-secondary);
}
.meta-item svg {
  flex-shrink: 0;
  color: var(--text-muted);
}
.ticket-btn {
  display: block;
  width: 100%;
  padding: 12px;
  text-align: center;
  font-size: 14px;
  font-weight: 600;
  color: var(--text-inverse);
  background: var(--accent-primary);
  border: none;
  border-radius: 4px;
  cursor: pointer;
  text-decoration: none;
  transition: all 0.3s ease;
}
.ticket-btn:hover:not(.disabled) {
  background: var(--accent-hover);
  box-shadow: var(--shadow-glow);
}
.ticket-btn.disabled {
  background: var(--bg-tertiary);
  color: var(--text-muted);
  cursor: not-allowed;
}
</style>
