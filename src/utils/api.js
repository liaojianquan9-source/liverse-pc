const API_BASE = '/api'

async function fetchWithFallback(url, fallbackUrl) {
  try {
    const res = await fetch(url)
    if (res.ok) return res.json()
  } catch (e) {
    // PHP 不可用，使用 fallback
  }
  const res = await fetch(fallbackUrl)
  if (!res.ok) throw new Error('Failed to fetch')
  return res.json()
}

export async function fetchEvents() {
  return fetchWithFallback(`${API_BASE}/events.php`, '/data/events.json')
}

export async function fetchGallery() {
  return fetchWithFallback(`${API_BASE}/gallery.php`, '/data/gallery.json')
}

export async function submitContact(formData) {
  try {
    const res = await fetch(`${API_BASE}/contact.php`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
    if (!res.ok) throw new Error('Failed to submit contact')
    return res.json()
  } catch (e) {
    // Demo 模式：模拟成功
    return { success: true, message: '提交成功（演示模式）' }
  }
}
