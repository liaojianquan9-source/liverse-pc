<template>
  <div class="calendar-section">
    <div class="calendar-header">
      <button class="cal-nav" @click="prevMonth" aria-label="上个月">
        <Icon name="arrow-left" :size="16" :stroke-width="2" />
      </button>
      <span class="cal-month">{{ currentYear }}.{{ String(currentMonth + 1).padStart(2, '0') }}</span>
      <button class="cal-nav" @click="nextMonth" aria-label="下个月">
        <Icon name="arrow-right" :size="16" :stroke-width="2" />
      </button>
    </div>

    <div class="calendar-grid">
      <div class="cal-weekdays">
        <span v-for="d in weekDays" :key="d" class="cal-weekday">{{ d }}</span>
      </div>
      <div class="cal-days">
        <button
          v-for="day in calendarDays"
          :key="day.key"
          class="cal-day"
          :class="{
            'other-month': !day.isCurrentMonth,
            'today': day.isToday,
            'has-event': day.eventCount > 0,
            'selected': selectedDate === day.dateStr
          }"
          @click="onDayClick(day)"
        >
          <span class="day-num">{{ day.date }}</span>
          <span v-if="day.eventCount > 0" class="event-count">{{ day.eventCount }}场</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import Icon from './Icon.vue'

const props = defineProps({
  events: { type: Array, default: () => [] }
})

const emit = defineEmits(['select'])

const weekDays = ['日', '一', '二', '三', '四', '五', '六']

const now = new Date()
const currentYear = ref(now.getFullYear())
const currentMonth = ref(now.getMonth())
const selectedDate = ref('')

const eventDateMap = computed(() => {
  const map = {}
  props.events.forEach(e => {
    if (e && e.date) {
      map[e.date] = (map[e.date] || 0) + 1
    }
  })
  return map
})

const calendarDays = computed(() => {
  const year = currentYear.value
  const month = currentMonth.value
  const firstDayOfMonth = new Date(year, month, 1)
  const lastDayOfMonth = new Date(year, month + 1, 0)
  const daysInMonth = lastDayOfMonth.getDate()
  const startWeekday = firstDayOfMonth.getDay()

  const days = []

  // 上月填充
  const prevMonthLastDay = new Date(year, month, 0).getDate()
  for (let i = startWeekday - 1; i >= 0; i--) {
    const d = prevMonthLastDay - i
    const dateStr = formatDateStr(new Date(year, month - 1, d))
    days.push({
      key: `prev-${d}`,
      date: d,
      isCurrentMonth: false,
      isToday: false,
      eventCount: eventDateMap.value[dateStr] || 0,
      dateStr
    })
  }

  // 当月
  const todayStr = formatDateStr(new Date())
  for (let d = 1; d <= daysInMonth; d++) {
    const dateStr = formatDateStr(new Date(year, month, d))
    days.push({
      key: `cur-${d}`,
      date: d,
      isCurrentMonth: true,
      isToday: dateStr === todayStr,
      eventCount: eventDateMap.value[dateStr] || 0,
      dateStr
    })
  }

  // 下月填充
  const remaining = 42 - days.length
  for (let d = 1; d <= remaining; d++) {
    const dateStr = formatDateStr(new Date(year, month + 1, d))
    days.push({
      key: `next-${d}`,
      date: d,
      isCurrentMonth: false,
      isToday: false,
      eventCount: eventDateMap.value[dateStr] || 0,
      dateStr
    })
  }

  return days
})

function formatDateStr(date) {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

function prevMonth() {
  if (currentMonth.value === 0) {
    currentMonth.value = 11
    currentYear.value--
  } else {
    currentMonth.value--
  }
}

function nextMonth() {
  if (currentMonth.value === 11) {
    currentMonth.value = 0
    currentYear.value++
  } else {
    currentMonth.value++
  }
}

function onDayClick(day) {
  if (!day.isCurrentMonth) {
    if (day.date > 20) {
      prevMonth()
    } else {
      nextMonth()
    }
    return
  }
  selectedDate.value = day.dateStr
  emit('select', day.dateStr)
}
</script>

<style scoped>
.calendar-section {
  background: var(--bg-secondary);
  border: 1px solid var(--border-subtle);
  border-radius: 12px;
  padding: var(--space-5);
  margin-bottom: var(--space-8);
}
.calendar-header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-4);
  margin-bottom: var(--space-4);
}
.cal-month {
  font-size: 20px;
  font-weight: 700;
  font-family: var(--font-mono);
  min-width: 120px;
  text-align: center;
}
.cal-nav {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: var(--bg-tertiary);
  border: 1px solid var(--border-subtle);
  color: var(--text-secondary);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}
.cal-nav:hover {
  border-color: var(--accent-primary);
  color: var(--accent-primary);
}
.calendar-grid {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.cal-weekdays {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 6px;
  margin-bottom: 2px;
}
.cal-weekday {
  text-align: center;
  font-size: 13px;
  font-weight: 600;
  color: var(--text-muted);
  padding: 6px 0;
}
.cal-days {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 6px;
}
.cal-day {
  position: relative;
  height: 52px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1px;
  background: transparent;
  border: 1px solid transparent;
  border-radius: 8px;
  color: var(--text-primary);
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  padding: 0;
}
.cal-day:hover {
  background: var(--bg-tertiary);
}
.cal-day.other-month {
  color: var(--text-muted);
}
.cal-day.today {
  border-color: var(--accent-primary);
  color: var(--accent-primary);
}
.cal-day.has-event {
  font-weight: 600;
}
.cal-day.selected {
  background: var(--accent-primary);
  color: var(--text-inverse);
}
.cal-day.selected .event-count {
  color: var(--text-inverse);
}
.day-num {
  line-height: 1.2;
}
.event-count {
  font-size: 10px;
  font-weight: 600;
  color: var(--accent-primary);
  line-height: 1.2;
}

@media (max-width: 640px) {
  .calendar-section {
    padding: var(--space-4);
  }
  .cal-day {
    height: 48px;
    font-size: 14px;
  }
  .event-count {
    font-size: 9px;
  }
}
</style>
