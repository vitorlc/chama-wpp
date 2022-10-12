if ('serviceWorker' in navigator) {

  window.addEventListener('load', function () {
    navigator.serviceWorker
      .register('/serviceWorker.js')
      .then(res => {
        console.log('service worker registered')
      })
      .catch(err => console.log('service worker not registered', err))
  })

  Notification.requestPermission(function (result) {
    if (result === 'denied') {
      console.log("Permission wasn't granted. Allow a retry.")
      return
    } else if (result === 'default') {
      console.log('The permission request was dismissed.')
      return
    }
    console.log('Permission was granted for notifications')
  })
}

const openWpp = number => {
    const parsedNumber = number.replace(/\D+/g, '').replace(' ', '')
    window.open(`https://api.whatsapp.com/send?phone=55${parsedNumber}`)
}

window.addEventListener('DOMContentLoaded', () => {
  const parsedUrl = new URL(window.location)
  const text = parsedUrl.searchParams.get('text')
  console.log('Title shared: ' + parsedUrl.searchParams.get('title'))
  console.log('Text shared: ' + text)
  console.log('URL shared: ' + parsedUrl.searchParams.get('url'))
  if (!text) return
  openWpp(text)
})
