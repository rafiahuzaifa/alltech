/* All Tech Cloud Services — service worker.
 * Strategy:
 *  - Pages: network-first, falling back to the last cached copy, then /offline.html
 *    (a self-contained page: serving a Next.js route under another URL breaks hydration).
 *  - /_next/static (content-hashed): cache-first.
 *  - Images & fonts: stale-while-revalidate, size-capped.
 *  - Never cached: /api/*, /studio, non-GET requests and cross-origin requests.
 * Bump VERSION to invalidate every cache on the next deploy.
 */
const VERSION = "v2";
const PAGES = `atcs-pages-${VERSION}`;
const STATIC = `atcs-static-${VERSION}`;
const IMAGES = `atcs-images-${VERSION}`;
const OFFLINE_URL = "/offline.html";
const PRECACHE = [OFFLINE_URL, "/", "/icons/icon-192.png", "/icons/icon-512.png"];
const MAX_PAGES = 40;
const MAX_IMAGES = 80;

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(PAGES).then((c) => c.addAll(PRECACHE)));
  // Do not skipWaiting here: the page asks the user before activating an update.
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keep = new Set([PAGES, STATIC, IMAGES]);
      for (const key of await caches.keys()) if (!keep.has(key)) await caches.delete(key);
      if (self.registration.navigationPreload) await self.registration.navigationPreload.enable();
      await self.clients.claim();
    })(),
  );
});

self.addEventListener("message", (event) => {
  if (event.data === "SKIP_WAITING") self.skipWaiting();
});

async function trim(cacheName, max) {
  const cache = await caches.open(cacheName);
  const keys = await cache.keys();
  for (let i = 0; i < keys.length - max; i++) await cache.delete(keys[i]);
}

async function networkFirstPage(event) {
  const cache = await caches.open(PAGES);
  try {
    const preloaded = await event.preloadResponse;
    const res = preloaded || (await fetch(event.request));
    if (res.ok && res.type === "basic") {
      cache.put(event.request, res.clone()).then(() => trim(PAGES, MAX_PAGES));
    }
    return res;
  } catch {
    return (
      (await cache.match(event.request, { ignoreSearch: true })) ||
      (await cache.match(OFFLINE_URL)) ||
      new Response("You are offline.", { status: 503, headers: { "Content-Type": "text/plain" } })
    );
  }
}

async function cacheFirst(request) {
  const cache = await caches.open(STATIC);
  const hit = await cache.match(request);
  if (hit) return hit;
  const res = await fetch(request);
  if (res.ok) cache.put(request, res.clone());
  return res;
}

async function staleWhileRevalidate(request) {
  const cache = await caches.open(IMAGES);
  const hit = await cache.match(request);
  const network = fetch(request)
    .then((res) => {
      if (res.ok) cache.put(request, res.clone()).then(() => trim(IMAGES, MAX_IMAGES));
      return res;
    })
    .catch(() => hit);
  return hit || network;
}

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;
  if (url.pathname.startsWith("/api/") || url.pathname.startsWith("/studio")) return;
  // Next.js RSC/prefetch payloads change per deploy; let the network handle them.
  if (request.headers.get("RSC") || url.searchParams.has("_rsc")) return;

  if (request.mode === "navigate") {
    event.respondWith(networkFirstPage(event));
  } else if (url.pathname.startsWith("/_next/static/")) {
    event.respondWith(cacheFirst(request));
  } else if (
    request.destination === "image" ||
    request.destination === "font" ||
    url.pathname.startsWith("/_next/image") ||
    url.pathname.startsWith("/images/") ||
    url.pathname.startsWith("/icons/")
  ) {
    event.respondWith(staleWhileRevalidate(request));
  }
});
