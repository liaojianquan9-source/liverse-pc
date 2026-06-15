<template>
  <section id="faq" class="faq-section">
    <div class="container">
      <div class="section-header reveal">
        <h2 class="section-title">常见问题</h2>
        <p class="section-subtitle">关于观演的一些须知</p>
      </div>

      <div class="faq-list">
        <div
          v-for="(faq, index) in faqs"
          :key="faq.id"
          class="faq-item reveal"
          :class="`reveal-delay-${(index % 4) + 1}`"
        >
          <button
            class="faq-question"
            @click="toggleFaq(index)"
            :aria-expanded="openIndex === index"
          >
            <span class="faq-q-text">{{ faq.question }}</span>
            <span class="faq-icon" :class="{ open: openIndex === index }">
              <Icon name="arrow-down" :size="20" :stroke-width="2" />
            </span>
          </button>
          <div
            class="faq-answer"
            :class="{ open: openIndex === index }"
            :style="{ maxHeight: openIndex === index ? '500px' : '0px', opacity: openIndex === index ? 1 : 0 }"
          >
            <div class="faq-answer-inner" v-html="faq.answer"></div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useIntersectionObserver } from '../composables/useIntersectionObserver.js'
import Icon from './Icon.vue'

const props = defineProps({
  faqs: { type: Array, default: () => [] }
})

const openIndex = ref(null)

function toggleFaq(index) {
  openIndex.value = openIndex.value === index ? null : index
}

useIntersectionObserver('.faq-section .reveal')
</script>

<style scoped>
.faq-section {
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
.faq-list {
  max-width: 800px;
  margin: 0 auto;
}
.faq-item {
  border-bottom: 1px solid var(--border-subtle);
}
.faq-question {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-5) 0;
  background: none;
  border: none;
  color: var(--text-primary);
  font-size: 16px;
  font-weight: 500;
  text-align: left;
  cursor: pointer;
  transition: color 0.2s ease;
}
.faq-question:hover {
  color: var(--accent-primary);
}
.faq-q-text {
  padding-right: var(--space-4);
}
.faq-icon {
  flex-shrink: 0;
  transition: transform 0.3s ease;
  color: var(--text-muted);
}
.faq-icon.open {
  transform: rotate(180deg);
  color: var(--accent-primary);
}
.faq-answer {
  max-height: 0;
  overflow: hidden;
  opacity: 0;
  transition: max-height 0.4s ease, opacity 0.3s ease;
}
.faq-answer-inner {
  padding-bottom: var(--space-5);
  color: var(--text-secondary);
  font-size: 15px;
  line-height: 1.7;
}
.faq-answer-inner :deep(p) {
  margin-bottom: var(--space-3);
}
.faq-answer-inner :deep(p:last-child) {
  margin-bottom: 0;
}
@media (max-width: 768px) {
  .faq-question {
    font-size: 15px;
    padding: var(--space-4) 0;
  }
}
</style>
