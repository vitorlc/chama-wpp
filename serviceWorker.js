const staticAbreWpp = 'dev-abre-wpp-site-v1'
const assets = [
  '/',
  '/index.html',
  '/style.css',
  '/js/app.js',
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

self.addEventListener('fetch', function (event) {
  event.respondWith(
    (async function () {
      try {
        var res = await fetch(event.request)
        var cache = await caches.open('cache')
        cache.put(event.request.url, res.clone())
        return res
      } catch (error) {
        return caches.match(event.request)
      }
    })()
  )
})

this.addEventListener('fetch', function (event) {
  // it can be empty if you just want to get rid of that error
})
