<template>
  <div class="modal-info">
    <div class="modal-meta">
      <span class="modal-date">{{ formatDateFull(event.date) }}</span>
      <span class="modal-time">{{ event.time }}</span>
      <span v-if="event.doorTime" class="modal-door">入场 {{ event.doorTime }}</span>
    </div>

    <h2 class="modal-title">{{ event.title }}</h2>
    <p v-if="event.subtitle" class="modal-subtitle">{{ event.subtitle }}</p>

    <div class="modal-details">
      <ModalDetailItem icon="location" :label="'场馆'" :value="event.venue" />
      <ModalDetailItem icon="price" :label="'票价'" :value="event.price" />
      <ModalDetailItem
        icon="status"
        :label="'状态'"
        :value="statusText(event.status)"
        :value-class="event.status"
      />
    </div>

    <div v-if="event.description" class="modal-description">
      <h3>演出简介</h3>
      <p>{{ event.description }}</p>
    </div>

    <div v-if="event.tags?.length" class="modal-tags">
      <span v-for="tag in event.tags" :key="tag" class="tag">{{ tag }}</span>
    </div>
  </div>
</template>

<script setup>
import { useFormatDate } from '../composables/useFormatDate.js'
import { EVENT_STATUS_MAP } from '../utils/constants.js'
import ModalDetailItem from './ModalDetailItem.vue'

defineProps({
  event: { type: Object, required: true }
})

const { formatDateFull } = useFormatDate()

function statusText(status) {
  return EVENT_STATUS_MAP[status] || status
}
</script>

<style scoped>
.modal-info {
  padding: var(--space-6);
  display: flex;
  flex-direction: column;
}
.modal-meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
  margin-bottom: var(--space-4);
}
.modal-date {
  font-family: var(--font-mono);
  font-size: 14px;
  color: var(--accent-primary);
  font-weight: 500;
}
.modal-time, .modal-door {
  font-size: 13px;
  color: var(--text-secondary);
}
.modal-title {
  font-size: 24px;
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: var(--space-2);
}
.modal-subtitle {
  font-size: 16px;
  color: var(--text-secondary);
  margin-bottom: var(--space-5);
}
.modal-details {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  margin-bottom: var(--space-5);
  padding: var(--space-4);
  background: var(--bg-tertiary);
  border-radius: 8px;
}
.modal-description {
  margin-bottom: var(--space-5);
}
.modal-description h3 {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-secondary);
  margin-bottom: var(--space-3);
}
.modal-description p {
  font-size: 14px;
  color: var(--text-secondary);
  line-height: 1.7;
}
.modal-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: var(--space-5);
}
.tag {
  padding: 4px 12px;
  font-size: 12px;
  font-weight: 500;
  color: var(--text-secondary);
  background: var(--bg-tertiary);
  border: 1px solid var(--border-subtle);
  border-radius: 4px;
}
</style>
