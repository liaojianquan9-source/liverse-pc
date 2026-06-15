<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="visible && isValidEvent(event)" class="modal-overlay" @click.self="$emit('close')">
        <div class="modal-content">
          <button class="modal-close" @click="$emit('close')" aria-label="关闭">
            <Icon name="close-circle" :size="24" :stroke-width="1.5" />
          </button>

          <div class="modal-body">
            <ModalImage :src="event.image" :alt="event.title" />
            <ModalInfo :event="event" />

            <a
              :href="event.ticketUrl"
              target="_blank"
              class="btn-primary modal-cta"
              :class="{ disabled: event.status === 'soldout' }"
            >
              {{ event.status === 'soldout' ? '已售罄' : '立即购票' }}
              <Icon name="arrow-right" :size="16" :stroke-width="2" />
            </a>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import ModalImage from './ModalImage.vue'
import ModalInfo from './ModalInfo.vue'
import Icon from './Icon.vue'

defineProps({
  event: { type: Object, default: null },
  visible: { type: Boolean, default: false }
})

defineEmits(['close'])

function isValidEvent(event) {
  return event && typeof event === 'object' && event.id && event.title
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 2000;
  background: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  overflow-y: auto;
}
.modal-content {
  position: relative;
  background: var(--bg-secondary);
  border: 1px solid var(--border-default);
  border-radius: 16px;
  max-width: 800px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  animation: modalIn 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}
@keyframes modalIn {
  from { opacity: 0; transform: scale(0.95) translateY(20px); }
  to { opacity: 1; transform: scale(1) translateY(0); }
}
.modal-close {
  position: absolute;
  top: 16px;
  right: 16px;
  z-index: 10;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.5);
  border: 1px solid var(--border-default);
  color: var(--text-primary);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}
.modal-close:hover {
  background: var(--bg-elevated);
  border-color: var(--accent-primary);
  color: var(--accent-primary);
}
.modal-body {
  display: grid;
  grid-template-columns: 1fr;
}
@media (min-width: 640px) {
  .modal-body {
    grid-template-columns: 1fr 1fr;
  }
}
.modal-cta {
  position: absolute;
  bottom: var(--space-6);
  right: var(--space-6);
}
@media (max-width: 639px) {
  .modal-cta {
    position: relative;
    bottom: auto;
    right: auto;
    margin: 0 var(--space-6) var(--space-6);
    width: calc(100% - var(--space-6) * 2);
  }
}
.modal-cta.disabled {
  background: var(--bg-tertiary);
  color: var(--text-muted);
  cursor: not-allowed;
  pointer-events: none;
}
.modal-enter-active, .modal-leave-active {
  transition: opacity 0.3s ease;
}
.modal-enter-from, .modal-leave-to {
  opacity: 0;
}
</style>
