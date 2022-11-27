// Register Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function () {
    navigator.serviceWorker
      .register('/serviceWorker.js')
      .then(res => {
        console.log('service worker registered')
      })
      .catch(err => console.log('service worker not registered', err))
  })
}

// Request Notification Permission
if ('Notification' in window) {
  if (Notification.permission === 'default') {
    Notification.requestPermission().then(permission => {
      if (permission === 'denied') {
        console.log('notification permission denied')
      }
    })
  }
}

const openWpp = number => {
  const DDIBrazil = '55'
  let parsedNumber = number.replace(/\D+/g, '').replace(' ', '')
  if (number.length == 9) parsedNumber = DDIBrazil + parsedNumber
  window.open(`https://api.whatsapp.com/send?phone=${parsedNumber}`)
}

// On Share Open
window.addEventListener('DOMContentLoaded', () => {
  const parsedUrl = new URL(window.location)
  const text = parsedUrl.searchParams.get('text')
  console.log('Title shared: ' + parsedUrl.searchParams.get('title'))
  console.log('Text shared: ' + text)
  console.log('URL shared: ' + parsedUrl.searchParams.get('url'))
  if (!text) return
  openWpp(text)
})

// Check if webapp is instaled
const stepElement = document.getElementById('step')
const stepIOSElement = document.getElementById('stepIOS')
const installButton = document.getElementById('installBtn')
stepIOSElement.style.display = 'none'
stepElement.style.display = 'none'
installButton.style.display = 'block'

const isInStandaloneMode =
  window.matchMedia('(display-mode: standalone)').matches ||
  window.navigator.standalone ||
  document.referrer.includes('android-app://')

if (isInStandaloneMode) {
  stepElement.style.display = 'block'
  installButton.style.display = 'none'
}

// Config Phone Input
const phoneInputField = document.querySelector('#phone')
const phoneInput = window.intlTelInput(phoneInputField, {
  initialCountry: 'br',
  preferredCountries: ['br', 'us'],
  utilsScript:
    'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js'
})

const info = document.querySelector('.alert-info')
const error = document.querySelector('.alert-error')

function process (event) {
  event.preventDefault()

  const phoneNumber = phoneInput.getNumber()

  error.style.display = 'none'

  if (phoneInput.isValidNumber()) {
    openWpp(phoneNumber)
  } else {
    error.style.display = ''
    error.innerHTML = `Número de telefone inválido.`
  }
}

const form = document.getElementById('lookup')
form.addEventListener('submit', process)

// Button install App
let deferredPrompt
window.addEventListener('beforeinstallprompt', e => {
  deferredPrompt = e
})

installButton.addEventListener('click', async () => {
  if (deferredPrompt !== null) {
    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice
    if (outcome === 'accepted') {
      deferredPrompt = null
    }
  }
})

// Detects if device is on iOS
const isIos = () => {
  const userAgent = window.navigator.userAgent.toLowerCase()
  return /iphone|ipad|ipod/.test(userAgent)
}

let isSafari =
  navigator.vendor.match(/apple/i) &&
  !navigator.userAgent.match(/crios/i) &&
  !navigator.userAgent.match(/fxios/i) &&
  !navigator.userAgent.match(/Opera|OPT\//)

if (isIos()) {
  document.getElementById('isSafari').style.display = 'none'
  document.getElementById('isNotSafari').style.display = 'Block'
  if (isSafari) {
    document.getElementById('isSafari').style.display = 'Block'
    document.getElementById('isNotSafari').style.display = 'none'
  }
  stepElement.style.display = 'none'
  stepIOSElement.style.display = 'Block'
  installButton.style.display = 'none'
}
