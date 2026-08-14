/* Breath service worker.
   Strategy:
   - Navigations / the HTML document: NETWORK-FIRST, fall back to cache.
     This is the lesson Descent paid for. A cache-first HTML strategy traps an
     installed PWA on a stale index.html and blocks deployed fixes from ever
     reaching it. Network-first means a fresh deploy is picked up on the next
     online load, and the cached copy is only used when the network fails.
   - Static assets (manifest, icons): CACHE-FIRST. They are effectively
     versioned by the CACHE name below.
   Bump CACHE on every deploy so the activate step clears old caches. */
const CACHE = "breath-v1";
const ASSETS = [
  "./",
  "./index.html",
  "./manifest.json",
  "./icons/icon-32.png",
  "./icons/icon-180.png",
  "./icons/icon-192.png",
  "./icons/icon-512.png"
];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE).then((c) => c.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;

  const url = new URL(req.url);
  // Same-origin only. Never touch anything cross-origin. (There is nothing
  // cross-origin in this app; this keeps the worker honest and safe.)
  if (url.origin !== self.location.origin) return;

  // Network-first for the document / navigations.
  const isDoc = req.mode === "navigate" ||
    (req.headers.get("accept") || "").includes("text/html");
  if (isDoc) {
    e.respondWith(
      fetch(req)
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put("./index.html", copy)).catch(() => {});
          return res;
        })
        .catch(() => caches.match(req).then((r) => r || caches.match("./index.html")))
    );
    return;
  }

  // Cache-first for static assets.
  e.respondWith(
    caches.match(req).then((cached) =>
      cached ||
      fetch(req).then((res) => {
        if (res && res.status === 200 && res.type === "basic") {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put(req, copy)).catch(() => {});
        }
        return res;
      }).catch(() => cached)
    )
  );
});
