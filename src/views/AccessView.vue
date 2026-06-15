<template>
  <div class="page-view">
    <div class="page-hero">
      <div class="page-hero-bg" style="background-image: url('https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1600&h=600&fit=crop')"></div>
      <div class="page-hero-overlay"></div>
      <div class="container">
        <h1 class="page-title">交通指南</h1>
        <p class="page-subtitle">ACCESS</p>
      </div>
    </div>

    <!-- 高德地图 + 周边酒店 -->
    <section class="section">
      <div class="container">
        <h2 class="section-title">HOTEL 周边酒店</h2>

        <div class="hotel-map-wrap">
          <!-- 左侧酒店列表 -->
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

            <!-- 分页 -->
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

          <!-- 右侧高德地图 -->
          <div class="map-panel">
            <div class="map-iframe-wrap">
              <iframe
                src="https://ditu.amap.com/search?query=北京LIVERSE音宇宙艺术中心"
                width="100%"
                height="100%"
                frameborder="0"
                scrolling="no"
                loading="lazy"
                title="高德地图 - 北京LIVERSE音宇宙艺术中心"
              ></iframe>
            </div>
            <a
              href="https://ditu.amap.com/search?query=北京LIVERSE音宇宙艺术中心"
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
          <div class="access-card">
            <div class="access-icon">
              <Icon name="subway" :size="32" :stroke-width="1.5" />
            </div>
            <h3>地铁</h3>
            <p>地铁 10 号线西土城站 B 口出站，沿知春路向东步行约 8 分钟即可到达场馆。</p>
          </div>
          <div class="access-card">
            <div class="access-icon">
              <Icon name="bus" :size="32" :stroke-width="1.5" />
            </div>
            <h3>公交</h3>
            <p>302、304、386、611、671 等多条公交线路可达。最近站点为"知春路"站，下车步行约 5 分钟。</p>
          </div>
          <div class="access-card">
            <div class="access-icon">
              <Icon name="car" :size="32" :stroke-width="1.5" />
            </div>
            <h3>自驾</h3>
            <p>场馆设有地下停车场，导航搜索"LIVERSE 音宇宙艺术中心"即可。演出日建议提前 30 分钟到达。</p>
          </div>
          <div class="access-card">
            <div class="access-icon">
              <Icon name="call" :size="32" :stroke-width="1.5" />
            </div>
            <h3>咨询</h3>
            <p>如有交通疑问，可拨打场馆服务热线：<strong>021-1234-5678</strong>（工作日 10:00-18:00）</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import Icon from '../components/Icon.vue'

const hotels = [
  {
    name: '北京北投台湖演艺酒店',
    address: '胡家堡村甲9号',
    phone: '010-81507666',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=200&h=150&fit=crop'
  },
  {
    name: '北投台湖演艺酒店大堂',
    address: '胡家堡村甲9号北京北投台...',
    phone: '',
    image: ''
  },
  {
    name: '通州台湖酒店',
    address: '铺外路与铺胡路交叉口西北...',
    phone: '',
    image: ''
  },
  {
    name: '境遇公寓(铺外路1号分店)',
    address: '铺外路东亚尚品台湖1号楼',
    phone: '010-56320606;+86105632...',
    image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=200&h=150&fit=crop'
  },
  {
    name: '漫游民宿-莱茵幽舍(北...)',
    address: '外郎营村201号',
    phone: '',
    image: ''
  },
  {
    name: '天好酒店式公寓',
    address: '口小路与铺胡路交叉口东北...',
    phone: '',
    image: ''
  },
  {
    name: '北京花间醉民宿(通州店)',
    address: '台湖镇外郎营村20号',
    phone: '17812099525',
    image: 'https://images.unsplash.com/photo-1596436889106-be35e843f974?w=200&h=150&fit=crop'
  }
]

const itemsPerPage = 5
const currentPage = ref(1)
const selectedHotel = ref('')

const totalPages = computed(() => Math.ceil(hotels.length / itemsPerPage))

const pagedHotels = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  return hotels.slice(start, start + itemsPerPage)
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

/* 酒店 + 地图 主区域 */
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

/* 左侧酒店列表 */
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

/* 分页 */
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

/* 右侧地图 */
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
  .access-grid { grid-template-columns: 1fr; }
  .hotel-map-wrap { border-radius: 0; border-left: none; border-right: none; }
}
</style>
