<template>
  <div class="page-view">
    <div class="page-hero">
      <div class="page-hero-bg" :style="{ backgroundImage: `url(${venue.heroImage})` }"></div>
      <div class="page-hero-overlay"></div>
      <div class="container">
        <h1 class="page-title">{{ venue.title }}</h1>
        <p class="page-subtitle">VENUE</p>
      </div>
    </div>

    <!-- SPACE 空间 -->
    <section class="section">
      <div class="container">
        <div class="space-section">
          <div class="space-text">
            <h2>SPACE 空间</h2>
            <p v-for="(p, i) in venue.description" :key="i">{{ p }}</p>
            <div class="specs">
              <div v-for="spec in venue.specs" :key="spec.label" class="spec-item">
                <span class="spec-num">{{ spec.value }}</span>
                <span class="spec-label">{{ spec.label }}</span>
              </div>
            </div>
          </div>
          <div class="space-images">
            <div class="space-img-main">
              <img :src="venue.images[0]" alt="场馆外观" />
            </div>
            <div v-if="venue.images[1]" class="space-img-sub">
              <img :src="venue.images[1]" alt="演出空间" />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 楼层导览 -->
    <section class="section">
      <div class="container">
        <h2 class="section-title">楼层导览</h2>

        <div class="floor-plans">
          <div class="plan-item">
            <h3 class="plan-title">1F 平面布局图</h3>
            <div class="plan-image">
              <img src="/北京_订场Web_01.png" alt="1F 平面布局图" loading="lazy" />
            </div>
            <p class="plan-desc">主厅平面布局，含观众席、舞台及后台区域分布</p>
          </div>
          <div class="plan-item">
            <h3 class="plan-title">舞台剖面图</h3>
            <div class="plan-image">
              <img src="/北京_订场Web_02.png" alt="舞台剖面图" loading="lazy" />
            </div>
            <p class="plan-desc">舞台灯光与设备剖面，展示专业演出系统配置</p>
          </div>
        </div>

        <div class="floor-grid">
          <div v-for="floor in venue.floors" :key="floor.title" class="floor-card">
            <img :src="floor.image" :alt="floor.title" />
            <div class="floor-info">
              <h3>{{ floor.title }}</h3>
              <p>{{ floor.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 场馆设施 -->
    <section class="section section-alt">
      <div class="container">
        <h2 class="section-title">场馆设施</h2>
        <div class="facility-grid">
          <div v-for="facility in venue.facilities" :key="facility.title" class="facility-item">
            <img :src="facility.image" :alt="facility.title" />
            <h4>{{ facility.title }}</h4>
            <p>{{ facility.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 周边酒店 -->
    <section class="section">
      <div class="container">
        <h2 class="section-title">HOTEL 周边酒店</h2>

        <div class="hotel-map-wrap">
          <div class="hotel-list-panel">
            <div class="hotel-list">
              <div
                v-for="hotel in pagedHotels"
                :key="hotel.name"
                class="hotel-list-item"
                :class="{ active: selectedHotel === hotel.name }"
                @click="selectedHotel = hotel.name"
              >
                <div class="hotel-thumb">
                  <img v-if="hotel.image" :src="hotel.image" :alt="hotel.name" loading="lazy" />
                  <div v-else class="hotel-thumb-placeholder">
                    <Icon name="location" :size="20" :stroke-width="1.5" />
                  </div>
                </div>
                <div class="hotel-list-info">
                  <h4 class="hotel-list-name">{{ hotel.name }}</h4>
                  <p class="hotel-list-addr">地址：{{ hotel.address }}</p>
                  <p v-if="hotel.phone" class="hotel-list-phone">电话：{{ hotel.phone }}</p>
                </div>
              </div>
            </div>

            <div class="hotel-pagination">
              <button
                v-for="p in totalPages"
                :key="p"
                class="page-btn"
                :class="{ active: currentPage === p }"
                @click="currentPage = p"
              >
                {{ p }}
              </button>
              <button
                v-if="currentPage < totalPages"
                class="page-btn next"
                @click="currentPage++"
              >
                下一页
              </button>
            </div>
          </div>

          <div class="map-panel">
            <div class="map-iframe-wrap">
              <iframe
                :src="venue.mapUrl"
                width="100%"
                height="100%"
                frameborder="0"
                scrolling="no"
                loading="lazy"
                :title="`高德地图 - ${venue.title}`"
              ></iframe>
            </div>
            <a
              :href="venue.mapUrl"
              target="_blank"
              class="map-open-btn"
            >
              <Icon name="location" :size="14" :stroke-width="2" />
              在高德地图中打开
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- 交通方式 -->
    <section class="section section-alt">
      <div class="container">
        <h2 class="section-title">交通方式</h2>
        <div class="access-grid">
          <div v-for="access in venue.access" :key="access.title" class="access-card">
            <div class="access-icon">
              <Icon :name="access.icon" :size="32" :stroke-width="1.5" />
            </div>
            <h3>{{ access.title }}</h3>
            <p>{{ access.desc }}</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import Icon from '../components/Icon.vue'
import { venueData } from '../data/venues.js'

const route = useRoute()
const currentCity = computed(() => route.query.city || 'beijing')

const venue = computed(() => venueData[currentCity.value] || venueData.beijing)

const itemsPerPage = 5
const currentPage = ref(1)
const selectedHotel = ref('')

watch(currentCity, () => {
  currentPage.value = 1
  selectedHotel.value = ''
})

const totalPages = computed(() => Math.ceil(venue.value.hotels.length / itemsPerPage))

const pagedHotels = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  return venue.value.hotels.slice(start, start + itemsPerPage)
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
  margin-bottom: var(--space-8);
}

/* SPACE 空间 */
.space-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-8);
  align-items: center;
}
.space-text h2 {
  font-size: 32px;
  font-weight: 700;
  margin-bottom: var(--space-4);
}
.space-text p {
  font-size: 16px;
  color: var(--text-secondary);
  line-height: 1.7;
  margin-bottom: var(--space-4);
}
.specs {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-4);
  margin-top: var(--space-6);
}
.spec-item {
  background: var(--bg-tertiary);
  border: 1px solid var(--border-subtle);
  border-radius: 8px;
  padding: var(--space-4);
  text-align: center;
}
.spec-num {
  display: block;
  font-size: 28px;
  font-weight: 700;
  color: var(--accent-primary);
  margin-bottom: 4px;
}
.spec-label {
  font-size: 13px;
  color: var(--text-muted);
}
.space-images {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}
.space-img-main {
  border-radius: 12px;
  overflow: hidden;
}
.space-img-main img {
  width: 100%;
  height: auto;
  display: block;
}
.space-img-sub {
  border-radius: 12px;
  overflow: hidden;
}
.space-img-sub img {
  width: 100%;
  height: auto;
  display: block;
}

.floor-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-5);
}
.floor-card {
  background: var(--bg-primary);
  border: 1px solid var(--border-subtle);
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s ease;
}
.floor-card:hover {
  border-color: var(--border-strong);
  transform: translateY(-4px);
}
.floor-card img {
  width: 100%;
  height: 220px;
  object-fit: cover;
  display: block;
}
.floor-info {
  padding: var(--space-5);
}
.floor-info h3 {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: var(--space-3);
}
.floor-info p {
  font-size: 14px;
  color: var(--text-secondary);
  line-height: 1.7;
}

/* CAD 剖面图 */
.floor-plans {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-6);
  margin-bottom: var(--space-9);
}
.plan-item {
  background: var(--bg-primary);
  border: 1px solid var(--border-subtle);
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s ease;
}
.plan-item:hover {
  border-color: var(--border-strong);
}
.plan-title {
  font-size: 16px;
  font-weight: 600;
  padding: var(--space-4) var(--space-5) 0;
  margin-bottom: var(--space-3);
}
.plan-image {
  width: 100%;
  background: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
}
.plan-image img {
  width: 100%;
  height: auto;
  max-height: 500px;
  object-fit: contain;
  display: block;
}
.plan-desc {
  font-size: 13px;
  color: var(--text-secondary);
  padding: var(--space-3) var(--space-5) var(--space-4);
  margin: 0;
}

.facility-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--space-5);
}
.facility-item {
  text-align: center;
}
.facility-item img {
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: var(--space-3);
}
.facility-item h4 {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 4px;
}
.facility-item p {
  font-size: 13px;
  color: var(--text-muted);
}

/* 酒店 + 地图 */
.hotel-map-wrap {
  display: grid;
  grid-template-columns: 420px 1fr;
  gap: 0;
  border: 1px solid var(--border-subtle);
  border-radius: 12px;
  overflow: hidden;
  background: var(--bg-primary);
  height: 640px;
}
.hotel-list-panel {
  display: flex;
  flex-direction: column;
  border-right: 1px solid var(--border-subtle);
  background: var(--bg-primary);
}
.hotel-list {
  flex: 1;
  overflow-y: auto;
  padding: var(--space-4);
}
.hotel-list-item {
  display: flex;
  gap: var(--space-3);
  padding: var(--space-3);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  border-bottom: 1px solid var(--border-subtle);
}
.hotel-list-item:last-child {
  border-bottom: none;
}
.hotel-list-item:hover,
.hotel-list-item.active {
  background: var(--bg-tertiary);
}
.hotel-thumb {
  width: 64px;
  height: 64px;
  border-radius: 6px;
  overflow: hidden;
  flex-shrink: 0;
  background: var(--bg-tertiary);
}
.hotel-thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.hotel-thumb-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-muted);
}
.hotel-list-info {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.hotel-list-name {
  font-size: 14px;
  font-weight: 600;
  line-height: 1.3;
  margin: 0;
}
.hotel-list-addr,
.hotel-list-phone {
  font-size: 12px;
  color: var(--text-muted);
  margin: 0;
  line-height: 1.4;
}
.hotel-pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: var(--space-3) var(--space-4);
  border-top: 1px solid var(--border-subtle);
}
.page-btn {
  min-width: 32px;
  height: 32px;
  border-radius: 6px;
  border: 1px solid var(--border-subtle);
  background: var(--bg-tertiary);
  color: var(--text-secondary);
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 10px;
  transition: all 0.2s ease;
}
.page-btn:hover {
  border-color: var(--accent-primary);
  color: var(--accent-primary);
}
.page-btn.active {
  background: var(--accent-primary);
  border-color: var(--accent-primary);
  color: var(--text-inverse);
}
.page-btn.next {
  padding: 0 14px;
}
.map-panel {
  position: relative;
  display: flex;
  flex-direction: column;
}
.map-iframe-wrap {
  flex: 1;
  position: relative;
}
.map-iframe-wrap iframe {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  border: none;
  display: block;
}
.map-open-btn {
  position: absolute;
  bottom: 16px;
  right: 16px;
  z-index: 10;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  background: var(--bg-primary);
  border: 1px solid var(--border-default);
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
  color: var(--text-primary);
  text-decoration: none;
  box-shadow: 0 2px 8px rgba(0,0,0,0.3);
  transition: all 0.2s ease;
}
.map-open-btn:hover {
  border-color: var(--accent-primary);
  color: var(--accent-primary);
}

/* 交通方式 */
.access-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--space-5);
}
.access-card {
  text-align: center;
  padding: var(--space-6);
  background: var(--bg-primary);
  border: 1px solid var(--border-subtle);
  border-radius: 12px;
  transition: all 0.3s ease;
}
.access-card:hover {
  border-color: var(--border-strong);
  transform: translateY(-4px);
}
.access-icon {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: var(--bg-tertiary);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto var(--space-4);
  color: var(--accent-primary);
}
.access-card h3 {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: var(--space-3);
}
.access-card p {
  font-size: 14px;
  color: var(--text-secondary);
  line-height: 1.7;
}

@media (max-width: 1024px) {
  .space-section { grid-template-columns: 1fr; }
  .floor-grid { grid-template-columns: repeat(2, 1fr); }
  .facility-grid { grid-template-columns: repeat(2, 1fr); }
  .floor-plans { grid-template-columns: 1fr; }
  .hotel-map-wrap {
    grid-template-columns: 1fr;
    height: auto;
  }
  .hotel-list-panel {
    border-right: none;
    border-bottom: 1px solid var(--border-subtle);
    max-height: 400px;
  }
  .map-panel {
    height: 400px;
  }
  .access-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 768px) {
  .page-hero { height: 240px; padding-bottom: 40px; }
  .floor-grid { grid-template-columns: 1fr; }
  .facility-grid { grid-template-columns: 1fr; }
  .specs { grid-template-columns: repeat(2, 1fr); }
  .floor-plans { gap: var(--space-5); }
  .plan-image img { max-height: 360px; }
  .download-item { padding: var(--space-3) var(--space-4); }
  .download-name { white-space: normal; }
  .access-grid { grid-template-columns: 1fr; }
  .hotel-map-wrap { border-radius: 0; border-left: none; border-right: none; }
}
</style>
