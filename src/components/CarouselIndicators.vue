<template>
  <div class="carousel-indicators">
    <button
      v-for="(_, index) in count"
      :key="index"
      class="indicator-dot"
      :class="{ active: modelValue === index }"
      @click="$emit('update:modelValue', index)"
      :aria-label="`跳转到第 ${index + 1} 张`"
    ></button>
  </div>
</template>

<script setup>
defineProps({
  count: { type: Number, required: true },
  modelValue: { type: Number, default: 0 }
})

defineEmits(['update:modelValue'])
</script>

<style scoped>
.carousel-indicators {
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 3;
  display: flex;
  gap: 8px;
}
.indicator-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--text-muted);
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 0;
}
.indicator-dot.active {
  background: var(--accent-primary);
  width: 32px;
  border-radius: 4px;
}
</style>
