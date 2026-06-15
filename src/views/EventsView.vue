<template>
  <div class="page-view">
    <div class="page-hero">
      <div class="page-hero-bg" style="background-image: url('https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=1600&h=600&fit=crop')"></div>
      <div class="page-hero-overlay"></div>
      <div class="container">
        <h1 class="page-title">演出日程</h1>
        <p class="page-subtitle">SCHEDULE</p>
      </div>
    </div>

    <section class="section">
      <div class="container">
        <!-- 日历 -->
        <Calendar :events="eventStore.events" @select="onDateSelect" />

        <!-- 加载中 -->
        <div v-if="eventStore.eventsLoading" class="skeleton-grid">
          <div v-for="i in 4" :key="i" class="skeleton-card">
            <div class="skeleton-image"></div>
            <div class="skeleton-content">
              <div class="skeleton-line short"></div>
              <div class="skeleton-line"></div>
              <div class="skeleton-line medium"></div>
            </div>
          </div>
        </div>

        <!-- 空状态 -->
        <div v-else-if="filteredEvents.length === 0" class="empty-state">
          <p>暂无演出安排，敬请期待</p>
        </div>

        <!-- 演出列表 -->
        <div v-else class="schedule-list">
          <article
            v-for="event in filteredEvents"
            :key="event.id"
            class="schedule-item"
          >
            <!-- 日期块 -->
            <div class="schedule-date-block">
              <span class="date-year">{{ formatYear(event.date) }}</span>
              <div class="date-main">
                <span class="date-month-day">{{ formatMonthDay(event.date) }}</span>
                <span class="date-week">{{ formatWeek(event.date) }}</span>
              </div>
              <span v-if="isToday(event.date)" class="today-badge">TODAY</span>
            </div>

            <!-- 图片 -->
            <div class="schedule-image">
              <img :src="event.image" :alt="event.title" loading="lazy" />
            </div>

            <!-- 信息 -->
            <div class="schedule-info">
              <h3 class="event-title">{{ event.title }}</h3>
              <p v-if="event.subtitle" class="event-subtitle">{{ event.subtitle }}</p>

              <div class="event-times">
                <div class="time-row">
                  <span class="time-label">入场</span>
                  <span class="time-value">{{ event.doorTime }}</span>
                </div>
                <div class="time-row">
                  <span class="time-label">开演</span>
                  <span class="time-value">{{ event.time }}</span>
                </div>
              </div>

              <div class="event-prices">
                <span class="price-label">票价</span>
                <div class="price-list">
                  <span v-for="(tp, idx) in event.ticketPrices" :key="idx" class="price-tag">
                    {{ tp.type }}/{{ tp.price }}
                  </span>
                </div>
              </div>

              <div v-if="event.contact" class="event-contact">
                <span class="contact-label">咨询</span>
                <span class="contact-value">
                  {{ event.contact.name }}
                  <template v-if="event.contact.phone"> · {{ event.contact.phone }}</template>
                  <template v-if="event.contact.hours"> · {{ event.contact.hours }}</template>
                </span>
              </div>
            </div>

            <!-- 操作 -->
            <div class="schedule-action">
              <button
                class="btn-readmore"
                :class="{ soldout: event.status === 'soldout' }"
                @click="openModal(event)"
              >
                {{ event.status === 'soldout' ? '已售罄' : '查看详情' }}
                <Icon name="arrow-right" :size="14" :stroke-width="2" />
              </button>
            </div>
          </article>
        </div>
      </div>
    </section>

    <EventModal
      :visible="modalVisible"
      :event="modalEvent"
      @close="closeModal"
    />
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useEventStore } from '../stores/eventStore'
import { useModal } from '../composables/useModal.js'
import { EVENT_STATUS_MAP } from '../utils/constants.js'
import Icon from '../components/Icon.vue'
import Calendar from '../components/Calendar.vue'
import EventModal from '../components/EventModal.vue'

const eventStore = useEventStore()
const { visible: modalVisible, selectedItem: modalEvent, open: openModal, close: closeModal } = useModal()

const selectedDate = ref('')

const filteredEvents = computed(() => {
  let list = [...eventStore.events]
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
  if (selectedDate.value) {
    list = list.filter(e => e.date === selectedDate.value)
  }
  return list
})

function onDateSelect(dateStr) {
  selectedDate.value = selectedDate.value === dateStr ? '' : dateStr
}

function formatYear(dateStr) {
  return new Date(dateStr).getFullYear()
}

function formatMonthDay(dateStr) {
  const d = new Date(dateStr)
  return `${d.getMonth() + 1}.${String(d.getDate()).padStart(2, '0')}`
}

const WEEK_DAYS = ['日', '一', '二', '三', '四', '五', '六']
function formatWeek(dateStr) {
  return WEEK_DAYS[new Date(dateStr).getDay()]
}

function isToday(dateStr) {
  const today = new Date()
  const y = today.getFullYear()
  const m = String(today.getMonth() + 1).padStart(2, '0')
  const d = String(today.getDate()).padStart(2, '0')
  return dateStr === `${y}-${m}-${d}`
}

function statusText(status) {
  return EVENT_STATUS_MAP[status] || status
}
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

/* 列表 */
.schedule-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-5);
}
.schedule-item {
  display: grid;
  grid-template-columns: 120px 220px 1fr 140px;
  gap: var(--space-6);
  align-items: flex-start;
  background: var(--bg-secondary);
  border: 1px solid var(--border-subtle);
  border-radius: 12px;
  padding: var(--space-6);
  transition: all 0.3s ease;
}
.schedule-item:hover {
  border-color: var(--border-strong);
}

/* 日期块 */
.schedule-date-block {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 4px;
  padding-top: 4px;
}
.date-year {
  font-size: 12px;
  color: var(--text-muted);
  font-family: var(--font-mono);
}
.date-main {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
}
.date-month-day {
  font-size: 28px;
  font-weight: 700;
  line-height: 1;
  font-family: var(--font-mono);
}
.date-week {
  font-size: 12px;
  color: var(--text-muted);
}
.today-badge {
  display: inline-block;
  margin-top: 4px;
  padding: 2px 8px;
  font-size: 10px;
  font-weight: 700;
  color: var(--text-inverse);
  background: var(--accent-primary);
  border-radius: 4px;
  letter-spacing: 0.05em;
}

/* 图片 */
.schedule-image {
  width: 220px;
  height: 140px;
  border-radius: 8px;
  overflow: hidden;
  flex-shrink: 0;
}
.schedule-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

/* 信息 */
.schedule-info {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  min-width: 0;
}
.event-title {
  font-size: 20px;
  font-weight: 700;
  line-height: 1.3;
  margin-bottom: 2px;
}
.event-subtitle {
  font-size: 14px;
  color: var(--text-secondary);
  margin-bottom: 4px;
}
.event-times {
  display: flex;
  gap: var(--space-5);
  font-size: 13px;
}
.time-row {
  display: flex;
  align-items: center;
  gap: 8px;
}
.time-label {
  color: var(--text-muted);
  font-size: 12px;
  font-weight: 600;
}
.time-value {
  color: var(--text-primary);
  font-weight: 500;
}
.event-prices {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  font-size: 13px;
}
.price-label {
  color: var(--text-muted);
  font-size: 12px;
  font-weight: 600;
  flex-shrink: 0;
  margin-top: 2px;
}
.price-list {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}
.price-tag {
  color: var(--text-secondary);
  font-size: 13px;
}
.event-contact {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  font-size: 12px;
}
.contact-label {
  color: var(--text-muted);
  font-weight: 600;
  flex-shrink: 0;
}
.contact-value {
  color: var(--text-muted);
}

/* 操作 */
.schedule-action {
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  height: 100%;
  padding-top: 4px;
}
.btn-readmore {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 10px 20px;
  font-size: 13px;
  font-weight: 600;
  color: var(--text-primary);
  background: transparent;
  border: 1px solid var(--border-default);
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
}
.btn-readmore:hover {
  border-color: var(--accent-primary);
  color: var(--accent-primary);
}
.btn-readmore.soldout {
  border-color: var(--border-subtle);
  color: var(--text-muted);
  cursor: not-allowed;
}
.btn-readmore.soldout:hover {
  border-color: var(--border-subtle);
  color: var(--text-muted);
}

/* 骨架屏 */
.skeleton-grid {
  display: flex;
  flex-direction: column;
  gap: var(--space-5);
}
.skeleton-card {
  display: grid;
  grid-template-columns: 120px 220px 1fr 140px;
  gap: var(--space-6);
  background: var(--bg-secondary);
  border-radius: 12px;
  padding: var(--space-6);
}
.skeleton-image {
  width: 220px;
  height: 140px;
  background: linear-gradient(90deg, var(--bg-tertiary) 25%, var(--bg-elevated) 50%, var(--bg-tertiary) 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  border-radius: 8px;
}
.skeleton-content {
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: center;
}
.skeleton-line {
  height: 14px;
  background: var(--bg-tertiary);
  border-radius: 4px;
  width: 100%;
}
.skeleton-line.short { width: 40%; }
.skeleton-line.medium { width: 70%; }
@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
.empty-state {
  text-align: center;
  padding: var(--space-8) 0;
  color: var(--text-secondary);
}

/* 响应式 */
@media (max-width: 1024px) {
  .schedule-item {
    grid-template-columns: 100px 180px 1fr 120px;
    gap: var(--space-4);
  }
  .schedule-image {
    width: 180px;
    height: 120px;
  }
  .skeleton-card {
    grid-template-columns: 100px 180px 1fr 120px;
  }
  .skeleton-image {
    width: 180px;
    height: 120px;
  }
}

@media (max-width: 768px) {
  .schedule-item {
    grid-template-columns: 1fr;
    gap: var(--space-4);
  }
  .schedule-date-block {
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    gap: 12px;
    padding-top: 0;
  }
  .date-main {
    flex-direction: row;
    gap: 6px;
  }
  .date-month-day {
    font-size: 20px;
  }
  .schedule-image {
    width: 100%;
    height: 180px;
  }
  .schedule-action {
    justify-content: flex-start;
    padding-top: 0;
  }
  .skeleton-card {
    grid-template-columns: 1fr;
  }
  .skeleton-image {
    width: 100%;
    height: 180px;
  }
  .page-hero { height: 240px; padding-bottom: 40px; }
}
</style>
