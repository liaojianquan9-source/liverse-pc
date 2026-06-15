<template>
  <nav class="navbar" :class="{ scrolled: isScrolled }">
    <div class="container nav-container">
      <router-link to="/" class="logo">
        <img src="/logo.png" alt="Liverse Hall" class="logo-img" />
      </router-link>

      <div class="nav-links" :class="{ open: mobileMenuOpen }">
        <template v-for="link in navLinks" :key="link.label">
          <!-- 普通链接 -->
          <router-link
            v-if="!link.children"
            :to="link.to"
            class="nav-link"
            :class="{ active: route.path === link.to }"
            @click="mobileMenuOpen = false"
          >
            {{ link.label }}
          </router-link>

          <!-- 下拉菜单 -->
          <div
            v-else
            class="nav-dropdown"
            @mouseenter="openDropdown(link.label)"
            @mouseleave="closeDropdown"
          >
            <button
              class="nav-link dropdown-toggle"
              :class="{ active: isDropdownActive(link), open: activeDropdown === link.label }"
              @click="toggleDropdown(link.label)"
            >
              {{ link.label }}
              <svg
                class="dropdown-arrow"
                :class="{ open: activeDropdown === link.label }"
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M19.9201 8.94995L13.4001 15.47C12.6301 16.24 11.3701 16.24 10.6001 15.47L4.08008 8.94995" />
              </svg>
            </button>
            <Transition name="dropdown">
              <div
                v-show="activeDropdown === link.label"
                class="dropdown-menu"
              >
                <div
                  v-for="group in link.children"
                  :key="group.city"
                  class="dropdown-group"
                >
                  <div class="dropdown-city">{{ group.city }}</div>
                  <router-link
                    v-for="venue in group.venues"
                    :key="venue.to"
                    :to="venue.to"
                    class="dropdown-item"
                    @click="activeDropdown = ''; mobileMenuOpen = false"
                  >
                    <span class="dropdown-item-label">{{ venue.label }}</span>
                    <span v-if="venue.desc" class="dropdown-item-desc">{{ venue.desc }}</span>
                  </router-link>
                </div>
              </div>
            </Transition>
          </div>
        </template>

        <button
          class="nav-link menu-trigger"
          :class="{ active: sidebarOpen }"
          aria-label="菜单"
          @click="$emit('toggleSidebar')"
        >
          <span class="menu-dots">
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>
      </div>

      <button class="mobile-toggle" @click="mobileMenuOpen = !mobileMenuOpen" aria-label="菜单">
        <span class="hamburger" :class="{ open: mobileMenuOpen }">
          <span></span>
          <span></span>
          <span></span>
        </span>
      </button>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
defineProps({
  sidebarOpen: { type: Boolean, default: false }
})
defineEmits(['toggleSidebar'])

const isScrolled = ref(false)
const mobileMenuOpen = ref(false)
const activeDropdown = ref('')

const navLinks = [
  { label: '演出', to: '/events' },
  {
    label: '场馆',
    to: '/venue',
    children: [
      {
        city: '北京',
        venues: [
          { label: '北京 LIVERSE', desc: '音宇宙艺术中心', to: '/venue?city=beijing' }
        ]
      },
      {
        city: '上海',
        venues: [
          { label: '上海 LIVERSE', desc: '西岸梦中心', to: '/venue?city=shanghai' }
        ]
      },
      {
        city: '苏州',
        venues: [
          { label: '苏州 LIVERSE', desc: 'xxxx', to: '/venue?city=suzhou' }
        ]
      }
    ]
  },
  { label: '新闻', to: '/news' },
  { label: '招聘', to: '/jobs' },
  // 交通内容已并入场馆页
]

function isDropdownActive(link) {
  if (!link.children) return false
  return link.children.some(g => g.venues.some(v => route.path === v.to.split('?')[0]))
}

function openDropdown(label) {
  activeDropdown.value = label
}

function closeDropdown() {
  activeDropdown.value = ''
}

function toggleDropdown(label) {
  activeDropdown.value = activeDropdown.value === label ? '' : label
}

function onScroll() {
  isScrolled.value = window.scrollY > 50
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  height: 72px;
  background: rgba(var(--bg-rgb), 0.8);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--border-subtle);
  transition: all 0.3s ease;
}

.navbar.scrolled {
  background: rgba(var(--bg-rgb), 0.95);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}

.nav-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
}

.logo {
  display: flex;
  align-items: center;
  text-decoration: none;
}

.logo-img {
  height: 28px;
  width: auto;
  display: block;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 4px;
}

.nav-link {
  position: relative;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 500;
  color: var(--text-secondary);
  text-decoration: none;
  transition: color 0.2s ease;
  border-radius: 4px;
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
}

.nav-link:hover,
.nav-link.active {
  color: var(--text-primary);
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: 2px;
  left: 16px;
  right: 16px;
  height: 2px;
  background: var(--accent-primary);
  transform: scaleX(0);
  transition: transform 0.3s ease;
}

.nav-link:hover::after {
  transform: scaleX(1);
}

/* 下拉菜单 */
.nav-dropdown {
  position: relative;
}

.dropdown-toggle {
  display: flex;
  align-items: center;
  gap: 4px;
}

.dropdown-arrow {
  transition: transform 0.3s ease;
  flex-shrink: 0;
}

.dropdown-arrow.open {
  transform: rotate(180deg);
}

.dropdown-menu {
  position: absolute;
  top: calc(100% + 8px);
  left: 50%;
  transform: translateX(-50%);
  min-width: 220px;
  background: var(--bg-secondary);
  border: 1px solid var(--border-default);
  border-radius: 10px;
  padding: 8px 0;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
  z-index: 1001;
}

.dropdown-menu::before {
  content: '';
  position: absolute;
  top: -5px;
  left: 50%;
  transform: translateX(-50%) rotate(45deg);
  width: 10px;
  height: 10px;
  background: var(--bg-secondary);
  border-left: 1px solid var(--border-default);
  border-top: 1px solid var(--border-default);
}

.dropdown-group {
  padding: 6px 0;
}

.dropdown-group + .dropdown-group {
  border-top: 1px solid var(--border-subtle);
}

.dropdown-city {
  padding: 4px 16px 2px;
  font-size: 10px;
  font-weight: 500;
  color: var(--text-muted);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  opacity: 0.7;
}

.dropdown-item {
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 8px 16px;
  text-decoration: none;
  color: var(--text-primary);
  transition: all 0.2s ease;
}

.dropdown-item:hover {
  background: var(--bg-tertiary);
}

.dropdown-item-label {
  font-size: 14px;
  font-weight: 500;
}

.dropdown-item-desc {
  font-size: 12px;
  color: var(--text-muted);
}

/* 下拉动画 */
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.2s ease;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(-8px);
}

.menu-trigger {
  margin-left: 12px;
  padding: 8px 10px;
  border: 1px solid var(--border-default);
  background: rgba(255, 255, 255, 0.06);
  border-radius: 6px;
  color: var(--text-secondary);
}

.menu-trigger:hover,
.menu-trigger.active {
  border-color: var(--accent-primary);
  color: var(--accent-primary);
  background: rgba(242, 101, 34, 0.08);
}

.menu-trigger::after {
  display: none;
}

.menu-dots {
  display: flex;
  gap: 4px;
}

.menu-dots span {
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: currentColor;
}

.mobile-toggle {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
}

.hamburger {
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 24px;
}

.hamburger span {
  display: block;
  height: 2px;
  background: var(--text-primary);
  border-radius: 2px;
  transition: all 0.3s ease;
}

.hamburger.open span:nth-child(1) {
  transform: translateY(7px) rotate(45deg);
}

.hamburger.open span:nth-child(2) {
  opacity: 0;
}

.hamburger.open span:nth-child(3) {
  transform: translateY(-7px) rotate(-45deg);
}

@media (max-width: 768px) {
  .navbar {
    height: 60px;
  }

  .nav-links {
    position: fixed;
    top: 60px;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(var(--bg-rgb), 0.98);
    flex-direction: column;
    padding: 32px 24px;
    gap: 0;
    opacity: 0;
    visibility: hidden;
    transform: translateY(-10px);
    transition: all 0.3s ease;
    overflow-y: auto;
  }

  .nav-links.open {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }

  .nav-link {
    padding: 16px 0;
    font-size: 18px;
    width: 100%;
    border-bottom: 1px solid var(--border-subtle);
  }

  .nav-link::after {
    display: none;
  }

  .dropdown-menu {
    position: static;
    transform: none;
    box-shadow: none;
    border: none;
    background: var(--bg-tertiary);
    margin-top: 8px;
    margin-bottom: 8px;
    padding: 8px 16px;
  }

  .dropdown-menu::before {
    display: none;
  }

  .dropdown-enter-from,
  .dropdown-leave-to {
    transform: none;
  }

  .login-link {
    margin-left: 0;
    margin-top: 16px;
    text-align: center;
    border: 1px solid var(--accent-primary);
    color: var(--accent-primary);
  }

  .mobile-toggle {
    display: block;
  }
}
</style>
