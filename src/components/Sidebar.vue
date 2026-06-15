<template>
  <Teleport to="body">
    <Transition name="sidebar-fade">
      <div v-if="modelValue" class="sidebar-overlay" @click.self="close">
        <Transition name="sidebar-slide">
          <aside v-if="modelValue" class="sidebar-panel">
            <div class="sidebar-header">
              <span class="sidebar-title">菜单</span>
              <button class="sidebar-close" @click="close" aria-label="关闭">
                <Icon name="close-circle" :size="22" :stroke-width="1.5" />
              </button>
            </div>

            <nav class="sidebar-menu">
              <template v-for="item in menuItems" :key="item.label">
                <router-link
                  v-if="item.to"
                  :to="item.to"
                  class="sidebar-link"
                  @click="close"
                >
                  <span>{{ item.label }}</span>
                </router-link>
                <button
                  v-else
                  class="sidebar-item"
                  @click="onItemClick(item)"
                >
                  <span>{{ item.label }}</span>
                </button>
              </template>
            </nav>
          </aside>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import Icon from './Icon.vue'

defineProps({
  modelValue: { type: Boolean, default: false }
})

const emit = defineEmits(['update:modelValue'])

const menuItems = [
  { label: '场馆信息' },
  { label: '合同信息', to: '/contract' },
  { label: '演出信息' },
  { label: '票务信息' },
  { label: '用户认证' },
  { label: '预定记录' }
]

function close() {
  emit('update:modelValue', false)
}

function onItemClick(item) {
  // 预留：后续根据 item.label 跳转或打开对应功能
  console.log('Sidebar click:', item.label)
}
</script>

<style scoped>
.sidebar-overlay {
  position: fixed;
  inset: 0;
  z-index: 2000;
  background: rgba(0, 0, 0, 0.45);
  backdrop-filter: blur(2px);
  display: flex;
  justify-content: flex-end;
}

.sidebar-panel {
  width: 320px;
  max-width: 85vw;
  height: 100%;
  background: rgba(18, 18, 18, 0.96);
  border-left: 1px solid var(--border-subtle);
  display: flex;
  flex-direction: column;
  box-shadow: -8px 0 32px rgba(0, 0, 0, 0.4);
}

.sidebar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 24px;
  border-bottom: 1px solid var(--border-subtle);
}

.sidebar-title {
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 0.05em;
}

.sidebar-close {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: transparent;
  border: 1px solid var(--border-subtle);
  color: var(--text-secondary);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.sidebar-close:hover {
  border-color: var(--accent-primary);
  color: var(--accent-primary);
}

.sidebar-menu {
  flex: 1;
  overflow-y: auto;
  padding: 16px 0;
}

.sidebar-link,
.sidebar-item {
  display: block;
  width: 100%;
  padding: 16px 24px;
  text-align: left;
  font-size: 15px;
  color: var(--text-primary);
  background: transparent;
  border: none;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s ease;
}

.sidebar-link:hover,
.sidebar-item:hover {
  background: var(--bg-tertiary);
}

.sidebar-fade-enter-active,
.sidebar-fade-leave-active {
  transition: opacity 0.3s ease;
}

.sidebar-fade-enter-from,
.sidebar-fade-leave-to {
  opacity: 0;
}

.sidebar-slide-enter-active,
.sidebar-slide-leave-active {
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.sidebar-slide-enter-from,
.sidebar-slide-leave-to {
  transform: translateX(100%);
}

@media (max-width: 768px) {
  .sidebar-panel {
    width: 280px;
  }
}
</style>
