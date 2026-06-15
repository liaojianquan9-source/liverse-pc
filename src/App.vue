<template>
  <div id="app">
    <Navbar
      :sidebar-open="sidebarOpen"
      @toggle-sidebar="sidebarOpen = !sidebarOpen"
    />
    <router-view />
    <Sidebar v-model="sidebarOpen" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useEventStore } from './stores/eventStore'
import Navbar from './components/Navbar.vue'
import Sidebar from './components/Sidebar.vue'

const eventStore = useEventStore()
const sidebarOpen = ref(false)

onMounted(() => {
  eventStore.fetchEvents()
  eventStore.fetchGallery()
})
</script>
