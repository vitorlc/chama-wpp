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
const getInstalledApps = async () => {
  const installedApps = await navigator.getInstalledRelatedApps()
  const stepElement = document.getElementById('step')
  if (installedApps.length > 0) {
    stepElement.innerHTML = `
      <h3>1 - Selecione o número desejado.</h3>
      <h3>2 - Clique em compartilhar </h3>
      <h3>3 - Selecione o aplicativo: Chama no Whatsapp e pronto.</h3>`
  } else {
    stepElement.innerHTML = `<button id="installBtn" class="btn">Instalar App</button>
     `
  }
}

if ('getInstalledRelatedApps' in navigator) {
  getInstalledApps()
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
let prompt;
const installButton = document.getElementById('installBtn')

window.addEventListener('beforeinstallprompt', function(e){
  // Prevent the mini-infobar from appearing on mobile
  e.preventDefault();
  // Stash the event so it can be triggered later.
  prompt = e;
});

installButton.addEventListener('click', function(){
   prompt.prompt();
})

let installed = false;
installButton.addEventListener('click', async function(){
  prompt.prompt();
  let result = await that.prompt.userChoice;
  if (result&&result.outcome === 'accepted') {
     installed = true;
  }
})