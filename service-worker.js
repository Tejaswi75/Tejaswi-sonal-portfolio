// Minimal, safe offline cache for static assets
const CACHE_NAME = "tejaswi-portfolio-v1";
const ASSETS = [
  "./",
  "./index.html",
  "./assets/styles.css",
  "./assets/main.js",
  "./assets/config.js",
  "./assets/favicon.svg",
  "./assets/og-image.svg",
  "./Tejaswi_Sonal_Resume.pdf",
  "./manifest.webmanifest"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  event.respondWith(
    caches.match(req).then((cached) => cached || fetch(req))
  );
});
