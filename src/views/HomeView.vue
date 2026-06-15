<template>
  <div class="home-view">
    <HeroCarousel :events="eventStore.heroEvents" @view-detail="openModal" />

    <EventList @open-modal="openModal" />

    <ImageGallery :images="eventStore.galleryImages" />

    <FAQSection :faqs="faqs" />

    <AccessSection />

    <Footer />

    <EventModal
      :visible="modalVisible"
      :event="modalEvent"
      @close="closeModal"
    />
  </div>
</template>

<script setup>
import { useEventStore } from '../stores/eventStore'
import { useModal } from '../composables/useModal.js'
import HeroCarousel from '../components/HeroCarousel.vue'
import EventList from '../components/EventList.vue'
import ImageGallery from '../components/ImageGallery.vue'
import FAQSection from '../components/FAQSection.vue'
import AccessSection from '../components/AccessSection.vue'
import Footer from '../components/Footer.vue'
import EventModal from '../components/EventModal.vue'

const eventStore = useEventStore()
const { visible: modalVisible, selectedItem: modalEvent, open: openModal, close: closeModal } = useModal()

const faqs = [
  {
    id: 'faq-1',
    question: '如何购买演出门票？',
    answer: '<p>您可以通过官网首页的演出列表找到心仪的演出，点击"立即购票"按钮即可跳转至购票页面。也可以在演出详情弹窗中点击购票按钮。</p>'
  },
  {
    id: 'faq-2',
    question: '演出可以退票或改签吗？',
    answer: '<p>一般情况下，演出门票售出后不支持退票。如遇演出取消或延期，我们将统一安排退票。具体退改签政策以购票平台公示为准。</p>'
  },
  {
    id: 'faq-3',
    question: '场馆可以携带相机吗？',
    answer: '<p>专业摄影器材（含单反相机、长焦镜头等）通常不允许带入演出场地。手机拍摄一般允许，但请关闭闪光灯，并遵守现场工作人员的指引。</p>'
  },
  {
    id: 'faq-4',
    question: '演出一般提前多久入场？',
    answer: '<p>一般演出前 1-2 小时开始检票入场，具体入场时间请参考各演出的详情说明。建议提前到达，避免排队耽误观演。</p>'
  },
  {
    id: 'faq-5',
    question: '场馆内有寄存服务吗？',
    answer: '<p>场馆设有自助寄存柜，位于入口大厅处。大件行李请提前联系场馆工作人员。演出期间请妥善保管随身物品。</p>'
  }
]
</script>

<style scoped>
.home-view {
  padding-top: 72px;
}
@media (max-width: 768px) {
  .home-view {
    padding-top: 60px;
  }
}
</style>
