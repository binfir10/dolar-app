export const formatDate = (date: Date) => {
  const now = new Date()
  const diff = now.getTime() - date.getTime()

  const seconds = Math.floor(diff / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)

  if (seconds < 60) {
    return 'Hace un momento'
  } else if (minutes < 60) {
    return `Hace ${minutes} min${minutes > 1 ? 'utos' : 'uto'}`
  } else if (hours < 24) {
    return `Hace ${hours} hora${hours > 1 ? 's' : ''}`
  } else if (days < 7) {
    return `Hace ${days} día${days > 1 ? 's' : ''}`
  } else {
    return new Intl.DateTimeFormat('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    }).format(date)
  }
}
