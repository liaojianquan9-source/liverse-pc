<template>
  <section id="access" class="access-section">
    <div class="container">
      <div class="section-header reveal">
        <h2 class="section-title">交通指南</h2>
        <p class="section-subtitle">多种方式，便捷到达</p>
      </div>

      <div class="access-grid">
        <AccessCard
          v-for="(item, index) in accessItems"
          :key="item.title"
          :icon="item.icon"
          :title="item.title"
          :desc="item.desc"
          class="reveal"
          :class="`reveal-delay-${index + 1}`"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
import { useIntersectionObserver } from '../composables/useIntersectionObserver.js'
import AccessCard from './AccessCard.vue'

const accessItems = [
  {
    icon: 'subway',
    title: '地铁',
    desc: '乘坐地铁 2 号线至XX站，从 A 出口步行约 5 分钟即可到达场馆。'
  },
  {
    icon: 'bus',
    title: '公交',
    desc: '可乘坐 101、205、308 路公交车至XX路站，下车后步行 3 分钟。'
  },
  {
    icon: 'car',
    title: '自驾',
    desc: '场馆设有地下停车场，导航搜索"Liverse Hall"即可到达。演出期间建议提前到达。'
  },
  {
    icon: 'phone',
    title: '联系方式',
    desc: '电话：021-1234-5678\n邮箱：info@liversehall.com\n地址：XX市XX区XX路XX号'
  }
]

useIntersectionObserver('.access-section .reveal')
</script>

<style scoped>
.access-section {
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
.access-grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: var(--space-5);
}
@media (min-width: 640px) {
  .access-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (min-width: 1024px) {
  .access-grid { grid-template-columns: repeat(4, 1fr); }
}
</style>
