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
if (Notification.permission === 'default') {
  Notification.requestPermission().then(permission => {
    if (permission === 'denied') {
      console.log('notification permission denied')
    }
  })
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
;(async () => {
  const listOfInstalledApps = await navigator.getInstalledRelatedApps()
  const stepElement = document.getElementById('step')
  if (listOfInstalledApps.some(app => app.id === 'chamaWpp')) {
    stepElement.innerHTML = `
      <h3>1 - Selecione o número desejado.</h3>
      <h3>2 - Clique em compartilhar </h3>
      <h3>3 - Selecione o aplicativo: Chama no Whatsapp e pronto.</h3>`
  } else {
    stepElement.innerHTML = `<div class="icon"><div class="arrow"></div></div><h3>Clique nos 
    <i class="fa fa-ellipsis-v" aria-hidden="true"></i> no canto da página e depois em: Instalar aplicativo.</h3>
     `
  }
  // These fields are specified by the Web App Manifest spec.
  // console.log('platform:', app.platform)
  // console.log('url:', app.url)
  // console.log('id:', app.id)
})()

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
