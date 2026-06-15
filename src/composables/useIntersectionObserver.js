import { onMounted } from 'vue'

export function useIntersectionObserver(selector, options = {}) {
  const {
    threshold = 0.1,
    className = 'visible',
    delay = 100
  } = options

  onMounted(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add(className)
        }
      })
    }, { threshold })

    setTimeout(() => {
      document.querySelectorAll(selector).forEach(el => observer.observe(el))
    }, delay)
  })
}
