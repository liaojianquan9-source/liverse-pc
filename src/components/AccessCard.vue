<template>
  <div class="access-card">
    <div class="access-icon">
      <Icon :name="icon" :size="32" :stroke-width="1.5" />
    </div>
    <h3 class="access-title">{{ title }}</h3>
    <p class="access-desc" v-html="descHtml"></p>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import Icon from './Icon.vue'

const props = defineProps({
  icon: { type: String, required: true },
  title: { type: String, required: true },
  desc: { type: String, required: true }
})

const descHtml = computed(() => props.desc.replace(/\n/g, '<br>'))
</script>

<style scoped>
.access-card {
  background: var(--bg-tertiary);
  border: 1px solid var(--border-subtle);
  border-radius: 12px;
  padding: var(--space-6);
  transition: all 0.3s ease;
}
.access-card:hover {
  border-color: var(--border-strong);
  transform: translateY(-2px);
}
.access-icon {
  width: 56px;
  height: 56px;
  border-radius: 12px;
  background: rgba(var(--accent-rgb), 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--accent-primary);
  margin-bottom: var(--space-4);
}
.access-title {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: var(--space-3);
}
.access-desc {
  font-size: 14px;
  color: var(--text-secondary);
  line-height: 1.7;
}
</style>
