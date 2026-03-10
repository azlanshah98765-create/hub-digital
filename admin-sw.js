// BPS Admin Panel — Service Worker
const CACHE = 'admin-bps-v1';
const ASSETS = [
  '/app/admin.html',
  '/app/js/supabase.js',
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(ASSETS)).catch(() => {})
  );
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  // Network first — fallback to cache for admin.html only
  if (e.request.url.includes('admin.html')) {
    e.respondWith(
      fetch(e.request).catch(() => caches.match('/app/admin.html'))
    );
  }
  // Everything else — network only (Supabase requests etc)
});
