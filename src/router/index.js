import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import EventsView from '../views/EventsView.vue'
import VenueView from '../views/VenueView.vue'
import NewsView from '../views/NewsView.vue'
import JobsView from '../views/JobsView.vue'
import AccessView from '../views/AccessView.vue'
import ContractView from '../views/ContractView.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/events', name: 'events', component: EventsView },
    { path: '/venue', name: 'venue', component: VenueView },
    { path: '/news', name: 'news', component: NewsView },
    { path: '/jobs', name: 'jobs', component: JobsView },
    { path: '/access', name: 'access', component: AccessView },
    { path: '/contract', name: 'contract', component: ContractView }
  ],
  scrollBehavior(to) {
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth' }
    }
    return { top: 0 }
  }
})

export default router
