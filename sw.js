/**
 * Service Worker for SkyPulse Weather & News
 * Enables 100% offline access to the website shell and resources
 */

const CACHE_NAME = 'skypulse-v1.0.0';
const STATIC_ASSETS = [
  './',
  './index.html',
  './style.css',
  './app.js',
  './manifest.json'
];

// 1. Install Event: Cache all shell assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[SW] Pre-caching offline app shell');
      return cache.addAll(STATIC_ASSETS);
    }).then(() => self.skipWaiting())
  );
});

// 2. Activate Event: Clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('[SW] Clearing old cache:', cache);
            return caches.delete(cache);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// 3. Fetch Event: Stale-While-Revalidate for local assets, Network-First for others
self.addEventListener('fetch', (event) => {
  const requestUrl = new URL(event.request.url);

  // If request is for same origin (local app shell)
  if (requestUrl.origin === location.origin) {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        // Return cached version immediately if available
        const fetchPromise = fetch(event.request)
          .then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200) {
              const responseToCache = networkResponse.clone();
              caches.open(CACHE_NAME).then((cache) => {
                cache.put(event.request, responseToCache);
              });
            }
            return networkResponse;
          })
          .catch(() => {
            // Network failure: cachedResponse will be returned
          });

        return cachedResponse || fetchPromise;
      })
    );
    return;
  }

  // External requests (Weather icons, News images, API calls)
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Cache successful image or icon requests for offline display
        if (response.status === 200 && (event.request.destination === 'image' || requestUrl.pathname.endsWith('.png') || requestUrl.pathname.endsWith('.jpg'))) {
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseClone);
          });
        }
        return response;
      })
      .catch(async () => {
        // Try to match from cache if offline
        const cached = await caches.match(event.request);
        if (cached) return cached;

        // If an HTML navigation request failed and not in cache, fallback to index.html
        if (event.request.mode === 'navigate') {
          return caches.match('./index.html');
        }

        return new Response('Network offline', { status: 503, statusText: 'Service Unavailable' });
      })
  );
});
