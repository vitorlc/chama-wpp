const staticAbreWpp = 'dev-abre-wpp-site-v1'
const assets = [
  '/',
  '/index.html',
  '/style.css',
  '/app.js',
  'images/android-launchericon-48-48.png',
  'images/android-launchericon-72-72.png',
  'images/android-launchericon-96-96.png',
  'images/android-launchericon-144-144.png',
  'images/android-launchericon-192-192.png',
  'images/android-launchericon-512-512.png'
]

self.addEventListener('install', installEvent => {
  installEvent.waitUntil(
    caches.open(staticAbreWpp).then(cache => {
      cache.addAll(assets)
    })
  )
})
