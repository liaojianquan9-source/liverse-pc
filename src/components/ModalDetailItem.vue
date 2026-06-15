<template>
  <div class="detail-item">
    <Icon :name="iconName" :size="18" :stroke-width="2" />
    <div>
      <span class="detail-label">{{ label }}</span>
      <span class="detail-value" :class="valueClass">{{ value }}</span>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import Icon from './Icon.vue'

const props = defineProps({
  icon: { type: String, required: true },
  label: { type: String, required: true },
  value: { type: String, required: true },
  valueClass: { type: String, default: '' }
})

const ICON_MAP = {
  location: 'location',
  price: 'coin',
  status: 'heart'
}

const iconName = computed(() => ICON_MAP[props.icon] || props.icon)
</script>

<style scoped>
.detail-item {
  display: flex;
  align-items: flex-start;
  gap: var(--space-3);
}
.detail-item svg {
  flex-shrink: 0;
  color: var(--text-muted);
  margin-top: 2px;
}
.detail-label {
  display: block;
  font-size: 12px;
  color: var(--text-muted);
  margin-bottom: 2px;
}
.detail-value {
  display: block;
  font-size: 14px;
  color: var(--text-primary);
  font-weight: 500;
}
.detail-value.onsale { color: var(--accent-primary); }
.detail-value.soldout { color: var(--text-muted); }
</style>
