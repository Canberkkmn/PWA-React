const CACHE_NAME = "pwa-react-cache";
const urlsToCache = [
  "/index.html",
  "/offline.html",
  "/manifest.json",
  "/images/bg.jpg",
];

const self = this;

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("[Service Worker] Caching required files...", cache);

      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        return caches.open(CACHE_NAME).then((cache) => {
          console.log("[Service Worker] Caching new files...", response.url);
          
          cache.put(event.request, response.clone());

          return response;
        });
      })
      .catch(() => {
        return caches.match(event.request).then((cachedResponse) => {
          console.log("[Service Worker] Fetching cached files...", event.request.url, cachedResponse);

          return cachedResponse || caches.match("/offline.html");
        });
      })
  );
});

self.addEventListener("active", (event) => {
  const cacheWhiteList = [];
  cacheWhiteList.push(CACHE_NAME);

  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhiteList.includes(cacheName)) {
            console.log("[Service Worker] Deleting old cache...");

            return caches.delete(cacheName);
          }
        })
      )
    )
  );
});
