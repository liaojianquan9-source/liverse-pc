<template>
  <div class="page-view">
    <div class="page-hero">
      <div class="page-hero-bg" style="background-image: url('https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1600&h=600&fit=crop')"></div>
      <div class="page-hero-overlay"></div>
      <div class="container">
        <h1 class="page-title">合同信息</h1>
        <p class="page-subtitle">CONTRACT</p>
      </div>
    </div>

    <section class="section">
      <div class="container">
        <div class="contract-intro">
          <h2 class="intro-title">合作须知</h2>
          <p class="intro-text">
            为确保演出活动顺利举办，主办方在签订合同前请仔细阅读以下合作条款与场地使用规范。
            如需具体的报批材料清单、场地技术参数或租赁合同样本，可在本页下方"资料下载"区域获取。
          </p>
          <div class="intro-grid">
            <div class="intro-item">
              <h3>场地租赁</h3>
              <p>提供主厅、看台区、VIP 包厢等多种空间租赁方案，支持演唱会、发布会、品牌活动等多种形式。</p>
            </div>
            <div class="intro-item">
              <h3>报批协助</h3>
              <p>可协助主办方完成公安、文化等相关部门的报批流程，具体材料清单请下载对应城市资料。</p>
            </div>
            <div class="intro-item">
              <h3>技术服务</h3>
              <p>场馆配备专业音响、灯光、LED 屏幕及技术团队，可根据演出需求提供定制化技术支持。</p>
            </div>
            <div class="intro-item">
              <h3>商务咨询</h3>
              <p>如有场地租赁、商务合作等需求，请联系商务团队：business@liverse.com</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section section-alt">
      <div class="container">
        <h2 class="section-title">资料下载</h2>

        <div class="city-tabs">
          <button
            v-for="city in cities"
            :key="city.key"
            class="city-tab"
            :class="{ active: activeCity === city.key }"
            @click="activeCity = city.key"
          >
            {{ city.label }}
          </button>
        </div>

        <div class="download-grid">
          <div
            v-for="file in currentFiles"
            :key="file.name"
            class="download-card"
          >
            <div class="download-card-icon">
              <Icon name="document" :size="28" :stroke-width="1.5" />
            </div>
            <div class="download-card-info">
              <h4 class="download-card-name">{{ file.name }}</h4>
              <span class="download-card-size">{{ file.size }}</span>
            </div>
            <a :href="file.url" target="_blank" class="download-card-btn">
              下载
            </a>
          </div>
        </div>

        <div v-if="!currentFiles.length" class="empty-state">
          该城市暂无可下载资料
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { venueData } from '../data/venues.js'
import Icon from '../components/Icon.vue'

const cities = [
  { key: 'beijing', label: '北京' },
  { key: 'shanghai', label: '上海' },
  { key: 'suzhou', label: '苏州' }
]

const activeCity = ref('beijing')

const currentFiles = computed(() => {
  const venue = venueData[activeCity.value]
  return venue ? venue.downloadFiles : []
})
</script>

<style scoped>
.page-view { padding-top: 72px; }
.page-hero {
  position: relative;
  height: 320px;
  display: flex;
  align-items: flex-end;
  padding-bottom: 60px;
  overflow: hidden;
}
.page-hero-bg {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
}
.page-hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(10,10,10,0.95) 0%, rgba(10,10,10,0.5) 60%, transparent 100%);
}
.page-title {
  position: relative;
  z-index: 1;
  font-size: clamp(32px, 5vw, 48px);
  font-weight: 700;
  margin-bottom: 8px;
}
.page-subtitle {
  position: relative;
  z-index: 1;
  font-size: 14px;
  color: var(--text-muted);
  letter-spacing: 0.1em;
  font-family: var(--font-mono);
}

.section { padding: var(--space-9) 0; }
.section-alt { background: var(--bg-secondary); }
.section-title {
  font-size: clamp(24px, 3vw, 32px);
  font-weight: 700;
  text-align: center;
  margin-bottom: var(--space-6);
}

.contract-intro {
  max-width: 960px;
  margin: 0 auto;
}
.intro-title {
  font-size: 28px;
  font-weight: 700;
  text-align: center;
  margin-bottom: var(--space-5);
}
.intro-text {
  font-size: 16px;
  color: var(--text-secondary);
  line-height: 1.8;
  text-align: center;
  margin-bottom: var(--space-8);
}
.intro-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-5);
}
.intro-item {
  background: var(--bg-secondary);
  border: 1px solid var(--border-subtle);
  border-radius: 12px;
  padding: var(--space-6);
  transition: all 0.3s ease;
}
.intro-item:hover {
  border-color: var(--border-strong);
}
.intro-item h3 {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: var(--space-3);
}
.intro-item p {
  font-size: 14px;
  color: var(--text-secondary);
  line-height: 1.7;
  margin: 0;
}

/* 城市 Tab */
.city-tabs {
  display: flex;
  justify-content: center;
  gap: var(--space-3);
  margin-bottom: var(--space-8);
}
.city-tab {
  padding: 10px 28px;
  font-size: 14px;
  font-weight: 500;
  color: var(--text-secondary);
  background: transparent;
  border: 1px solid var(--border-subtle);
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
}
.city-tab:hover {
  border-color: var(--accent-primary);
  color: var(--accent-primary);
}
.city-tab.active {
  background: var(--accent-primary);
  border-color: var(--accent-primary);
  color: var(--text-inverse);
}

/* 下载卡片 */
.download-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-4);
  max-width: 900px;
  margin: 0 auto;
}
.download-card {
  display: flex;
  align-items: center;
  gap: var(--space-4);
  background: var(--bg-primary);
  border: 1px solid var(--border-subtle);
  border-radius: 12px;
  padding: var(--space-5);
  transition: all 0.3s ease;
}
.download-card:hover {
  border-color: var(--border-strong);
  transform: translateY(-2px);
}
.download-card-icon {
  width: 48px;
  height: 48px;
  border-radius: 10px;
  background: var(--bg-tertiary);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--accent-primary);
  flex-shrink: 0;
}
.download-card-info {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.download-card-name {
  font-size: 14px;
  font-weight: 500;
  line-height: 1.4;
  margin: 0;
}
.download-card-size {
  font-size: 12px;
  color: var(--text-muted);
}
.download-card-btn {
  padding: 8px 18px;
  font-size: 13px;
  font-weight: 600;
  color: var(--text-inverse);
  background: var(--accent-primary);
  border-radius: 6px;
  text-decoration: none;
  transition: all 0.2s ease;
  flex-shrink: 0;
}
.download-card-btn:hover {
  background: #d9561d;
}

.empty-state {
  text-align: center;
  padding: var(--space-8) 0;
  color: var(--text-muted);
}

@media (max-width: 768px) {
  .page-hero { height: 240px; padding-bottom: 40px; }
  .intro-grid { grid-template-columns: 1fr; }
  .download-grid { grid-template-columns: 1fr; }
  .city-tabs { flex-wrap: wrap; }
  .download-card {
    flex-direction: column;
    align-items: flex-start;
  }
  .download-card-btn {
    width: 100%;
    text-align: center;
  }
}
</style>
