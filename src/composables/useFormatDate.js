const WEEK_DAYS = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']

function isValidDate(date) {
  return date instanceof Date && !isNaN(date.getTime())
}

export function useFormatDate() {
  function formatDate(dateStr) {
    const date = new Date(dateStr)
    if (!isValidDate(date)) return ''
    const month = date.getMonth() + 1
    const day = date.getDate()
    const weekDay = WEEK_DAYS[date.getDay()]
    return `${month}月${day}日 ${weekDay}`
  }

  function formatDateFull(dateStr) {
    const date = new Date(dateStr)
    if (!isValidDate(date)) return ''
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const weekDay = WEEK_DAYS[date.getDay()]
    return `${year}年${month}月${day}日 ${weekDay}`
  }

  return { formatDate, formatDateFull }
}
