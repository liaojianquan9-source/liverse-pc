import { defineStore } from 'pinia'
import { fetchEvents as apiFetchEvents, fetchGallery as apiFetchGallery } from '../utils/api.js'
import { getPublicAssetUrl } from '../utils/assets.js'

function isValidArray(val) {
  return Array.isArray(val) && val.length > 0
}

export const useEventStore = defineStore('events', {
  state: () => ({
    events: [],
    galleryImages: [],
    eventsLoading: false,
    galleryLoading: false,
    eventsError: null,
    galleryError: null
  }),

  getters: {
    upcomingEvents: (state) => {
      if (!Array.isArray(state.events)) return []
      const now = new Date()
      return state.events
        .filter(e => e && e.date && new Date(e.date) >= now)
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    },
    heroEvents: (state) => {
      if (!Array.isArray(state.events)) return []
      const now = new Date()
      return state.events
        .filter(e => e && e.date && new Date(e.date) >= now)
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
        .slice(0, 5)
    }
  },

  actions: {
    async fetchEvents() {
      this.eventsLoading = true
      this.eventsError = null
      const cacheKey = 'liverse_events_cache'
      const cacheTimeKey = `${cacheKey}_time`
      try {
        const cacheTime = localStorage.getItem(cacheTimeKey)
        const now = Date.now()
        if (cacheTime && now - parseInt(cacheTime) < 5 * 60 * 1000) {
          const cached = localStorage.getItem(cacheKey)
          if (cached) {
            const parsed = JSON.parse(cached)
            if (isValidArray(parsed)) {
              this.events = parsed
              this.eventsLoading = false
              return
            }
            // 缓存损坏，清除
            localStorage.removeItem(cacheKey)
            localStorage.removeItem(cacheTimeKey)
          }
        }
        const data = await apiFetchEvents()
        if (isValidArray(data)) {
          this.events = data
          localStorage.setItem(cacheKey, JSON.stringify(data))
          localStorage.setItem(cacheTimeKey, now.toString())
        } else {
          // fallback: 读取本地 JSON
          const res = await fetch(getPublicAssetUrl('data/events.json'))
          if (res.ok) {
            const fallback = await res.json()
            if (isValidArray(fallback)) {
              this.events = fallback
              localStorage.setItem(cacheKey, JSON.stringify(fallback))
              localStorage.setItem(cacheTimeKey, now.toString())
            }
          }
        }
      } catch (error) {
        this.eventsError = error instanceof Error ? error.message : '未知错误'
        // 出错时尝试读取本地 JSON
        try {
          const res = await fetch(getPublicAssetUrl('data/events.json'))
          if (res.ok) {
            const fallback = await res.json()
            if (isValidArray(fallback)) this.events = fallback
          }
        } catch {}
      } finally {
        this.eventsLoading = false
      }
    },

    async fetchGallery() {
      this.galleryLoading = true
      this.galleryError = null
      const cacheKey = 'liverse_gallery_cache'
      const cacheTimeKey = `${cacheKey}_time`
      try {
        const cacheTime = localStorage.getItem(cacheTimeKey)
        const now = Date.now()
        if (cacheTime && now - parseInt(cacheTime) < 10 * 60 * 1000) {
          const cached = localStorage.getItem(cacheKey)
          if (cached) {
            const parsed = JSON.parse(cached)
            if (isValidArray(parsed)) {
              this.galleryImages = parsed
              this.galleryLoading = false
              return
            }
            localStorage.removeItem(cacheKey)
            localStorage.removeItem(cacheTimeKey)
          }
        }
        const data = await apiFetchGallery()
        if (isValidArray(data)) {
          this.galleryImages = data
          localStorage.setItem(cacheKey, JSON.stringify(data))
          localStorage.setItem(cacheTimeKey, now.toString())
        } else {
          const res = await fetch(getPublicAssetUrl('data/gallery.json'))
          if (res.ok) {
            const fallback = await res.json()
            if (isValidArray(fallback)) {
              this.galleryImages = fallback
              localStorage.setItem(cacheKey, JSON.stringify(fallback))
              localStorage.setItem(cacheTimeKey, now.toString())
            }
          }
        }
      } catch (error) {
        this.galleryError = error instanceof Error ? error.message : '未知错误'
        try {
          const res = await fetch(getPublicAssetUrl('data/gallery.json'))
          if (res.ok) {
            const fallback = await res.json()
            if (isValidArray(fallback)) this.galleryImages = fallback
          }
        } catch {}
      } finally {
        this.galleryLoading = false
      }
    }
  }
})
