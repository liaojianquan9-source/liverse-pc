<template>
  <div class="modal-image">
    <img :src="src" :alt="alt" />
  </div>
</template>

<script setup>
defineProps({
  src: { type: String, required: true },
  alt: { type: String, default: '' }
})
</script>

<style scoped>
.modal-image {
  position: relative;
  aspect-ratio: 4 / 3;
  overflow: hidden;
  border-radius: 16px 16px 0 0;
}
@media (min-width: 640px) {
  .modal-image {
    aspect-ratio: auto;
    border-radius: 16px 0 0 16px;
  }
}
.modal-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
