import { ref } from 'vue'

export function useModal() {
  const visible = ref(false)
  const selectedItem = ref(null)

  function open(item) {
    if (!item || typeof item !== 'object') {
      console.warn('useModal.open() called with invalid item:', item)
      return
    }
    selectedItem.value = item
    visible.value = true
    document.body.style.overflow = 'hidden'
  }

  function close() {
    visible.value = false
    selectedItem.value = null
    document.body.style.overflow = ''
  }

  return { visible, selectedItem, open, close }
}
