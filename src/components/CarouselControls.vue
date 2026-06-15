<template>
  <div class="carousel-controls">
    <button class="control-arrow control-prev" @click="$emit('prev')" aria-label="上一张">
      <Icon name="arrow-left" :size="24" :stroke-width="2" />
    </button>
    <button class="control-arrow control-next" @click="$emit('next')" aria-label="下一张">
      <Icon name="arrow-right" :size="24" :stroke-width="2" />
    </button>
  </div>
</template>

<script setup>
import Icon from './Icon.vue'
</script>

<style scoped>
.carousel-controls {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  transform: translateY(-50%);
  z-index: 3;
  display: flex;
  justify-content: space-between;
  padding: 0 24px;
  pointer-events: none;
}
.control-arrow {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid var(--border-default);
  color: var(--text-primary);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  pointer-events: all;
  backdrop-filter: blur(8px);
}
.control-arrow:hover {
  background: rgba(255, 255, 255, 0.15);
  border-color: var(--accent-primary);
  color: var(--accent-primary);
}
@media (max-width: 768px) {
  .control-arrow { width: 40px; height: 40px; }
  .carousel-controls { padding: 0 12px; }
}
</style>
