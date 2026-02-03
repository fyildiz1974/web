// =====================================================================
// SERVICE WORKER - Rainy Glass Effect v2
// =====================================================================

const CACHE_NAME = 'rainy-glass-v2';

// Önbelleğe alınacak dosyalar - Lokal öncelikli
const ASSETS_TO_CACHE = [
    './',
    './index.html',
    './manifest.json',

    // Ses
    './assets/audio/rain.mp3',

    // JavaScript
    './assets/js/app.js', 
    './assets/js/raindrops.js',

    // Arka plan görselleri
    './assets/images/bg/city.jpg',
    './assets/images/bg/forest.jpg',
    './assets/images/bg/mountain.jpg',
    './assets/images/bg/lights.jpg',
    './assets/images/bg/road.jpg',
    './assets/images/bg/sky.jpg',

    // Thumbnail görselleri
    './assets/images/thumbs/city.jpg',
    './assets/images/thumbs/forest.jpg',
    './assets/images/thumbs/mountain.jpg',
    './assets/images/thumbs/lights.jpg',
    './assets/images/thumbs/road.jpg',
    './assets/images/thumbs/sky.jpg',
    './assets/images/thumbs/traffic.jpg',
    './assets/images/thumbs/cityrain.jpg',
    './assets/images/thumbs/nature.jpg',

    // Videolar (büyük dosyalar - opsiyonel cache)
    './assets/videos/traffic.mp4',
    './assets/videos/cityrain.mp4',
    './assets/videos/nature.mp4',

    // İkonlar
    './icons/icon-192.png',
    './icons/icon-512.png',
    './icons/apple-touch-icon.png',
    './icons/favicon-16x16.png',
    './icons/favicon-32x32.png'
];

// Fallback URL'ler (lokal başarısız olursa)
const FALLBACK_URLS = {
    './assets/audio/rain.mp3': 'https://fyildiz1974.github.io/web/files/rain.mp3',
    './assets/js/raindrops.js': 'https://fthyldz.com/bio/js/raindrops.js',
    './assets/images/bg/city.jpg': 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1920&q=80',
    './assets/images/bg/forest.jpg': 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=1920&q=80',
    './assets/images/bg/mountain.jpg': 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1920&q=80',
    './assets/images/bg/lights.jpg': 'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=1920&q=80',
    './assets/images/bg/road.jpg': 'https://images.unsplash.com/photo-1494522855154-9297ac14b55f?w=1920&q=80',
    './assets/images/bg/sky.jpg': 'https://images.unsplash.com/photo-1534088568595-a066f410bcda?w=1920&q=80',
    './assets/videos/traffic.mp4': 'https://cdn.pixabay.com/video/2019/03/18/22070-325253460_large.mp4',
    './assets/videos/cityrain.mp4': 'https://cdn.pixabay.com/video/2020/12/01/58020-486900427_large.mp4',
    './assets/videos/nature.mp4': 'https://videos.pexels.com/video-files/2439510/2439510-hd_1920_1080_30fps.mp4'
};

// =====================================================================
// INSTALL EVENT
// =====================================================================
self.addEventListener('install', (event) => {
    console.log('[SW] Installing v2...');

    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('[SW] Caching local assets...');
                // Her dosyayı tek tek cache'le, hata olursa atla
                return Promise.allSettled(
                    ASSETS_TO_CACHE.map(url =>
                        cache.add(url).catch(err => {
                            console.warn('[SW] Cache failed for:', url, err.message);
                        })
                    )
                );
            })
            .then(() => {
                console.log('[SW] Installation complete');
                return self.skipWaiting();
            })
            .catch((err) => {
                console.error('[SW] Install failed:', err);
            })
    );
});

// =====================================================================
// ACTIVATE EVENT
// =====================================================================
self.addEventListener('activate', (event) => {
    console.log('[SW] Activating v2...');

    event.waitUntil(
        caches.keys()
            .then((cacheNames) => {
                return Promise.all(
                    cacheNames.map((cacheName) => {
                        if (cacheName !== CACHE_NAME) {
                            console.log('[SW] Deleting old cache:', cacheName);
                            return caches.delete(cacheName);
                        }
                    })
                );
            })
            .then(() => {
                console.log('[SW] Activated');
                return self.clients.claim();
            })
    );
});

// =====================================================================
// FETCH EVENT
// =====================================================================
self.addEventListener('fetch', (event) => {
    const { request } = event;
    const url = new URL(request.url);

    // Skip non-GET requests
    if (request.method !== 'GET') {
        return;
    }

    // Skip chrome-extension and other non-http(s) requests
    if (!url.protocol.startsWith('http')) {
        return;
    }

    // Video dosyaları için özel strateji
    if (request.destination === 'video' || url.pathname.endsWith('.mp4')) {
        event.respondWith(handleVideoRequest(request));
        return;
    }

    // Görsel dosyaları için cache-first
    if (request.destination === 'image') {
        event.respondWith(handleImageRequest(request));
        return;
    }

    // Ses dosyaları için cache-first with fallback
    if (request.destination === 'audio' || url.pathname.endsWith('.mp3')) {
        event.respondWith(handleAudioRequest(request));
        return;
    }

    // Diğer dosyalar için stale-while-revalidate
    event.respondWith(handleDefaultRequest(request));
});

// =====================================================================
// REQUEST HANDLERS
// =====================================================================

async function handleVideoRequest(request) {
    const url = new URL(request.url);

    // Önce cache'den dene
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
        console.log('[SW] Video from cache:', url.pathname);
        return cachedResponse;
    }

    // Cache'de yoksa network'ten al
    try {
        const networkResponse = await fetch(request);
        if (networkResponse && networkResponse.ok) {
            // Video'yu cache'e kaydet (arka planda)
            const cache = await caches.open(CACHE_NAME);
            cache.put(request, networkResponse.clone());
            return networkResponse;
        }
    } catch (err) {
        console.warn('[SW] Video network failed:', url.pathname);
    }

    // Network başarısız, fallback dene
    const fallbackUrl = getFallbackUrl(url.pathname);
    if (fallbackUrl) {
        console.log('[SW] Trying video fallback:', fallbackUrl);
        try {
            return await fetch(fallbackUrl);
        } catch (err) {
            console.error('[SW] Video fallback also failed');
        }
    }

    return new Response('Video not available', { status: 503 });
}

async function handleImageRequest(request) {
    const url = new URL(request.url);

    // Önce cache'den dene
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
        return cachedResponse;
    }

    // Network'ten al
    try {
        const networkResponse = await fetch(request);
        if (networkResponse && networkResponse.ok) {
            const cache = await caches.open(CACHE_NAME);
            cache.put(request, networkResponse.clone());
            return networkResponse;
        }
    } catch (err) {
        console.warn('[SW] Image network failed:', url.pathname);
    }

    // Fallback dene
    const fallbackUrl = getFallbackUrl(url.pathname);
    if (fallbackUrl) {
        try {
            const fallbackResponse = await fetch(fallbackUrl);
            if (fallbackResponse && fallbackResponse.ok) {
                return fallbackResponse;
            }
        } catch (err) {
            console.warn('[SW] Image fallback failed');
        }
    }

    // Placeholder SVG döndür
    return new Response(
        '<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300"><rect fill="#1a1a2e" width="400" height="300"/><text fill="#6cf" x="50%" y="50%" text-anchor="middle" font-family="system-ui" font-size="16">Görsel yüklenemedi</text></svg>',
        { headers: { 'Content-Type': 'image/svg+xml' } }
    );
}

async function handleAudioRequest(request) {
    const url = new URL(request.url);

    // Önce cache'den dene
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
        console.log('[SW] Audio from cache');
        return cachedResponse;
    }

    // Network'ten al
    try {
        const networkResponse = await fetch(request);
        if (networkResponse && networkResponse.ok) {
            const cache = await caches.open(CACHE_NAME);
            cache.put(request, networkResponse.clone());
            return networkResponse;
        }
    } catch (err) {
        console.warn('[SW] Audio network failed');
    }

    // Fallback dene
    const fallbackUrl = getFallbackUrl(url.pathname);
    if (fallbackUrl) {
        try {
            return await fetch(fallbackUrl);
        } catch (err) {
            console.error('[SW] Audio fallback failed');
        }
    }

    return new Response('Audio not available', { status: 503 });
}

async function handleDefaultRequest(request) {
    const cachedResponse = await caches.match(request);

    const fetchPromise = fetch(request)
        .then((networkResponse) => {
            if (networkResponse && networkResponse.ok) {
                const responseToCache = networkResponse.clone();
                caches.open(CACHE_NAME)
                    .then((cache) => cache.put(request, responseToCache));
            }
            return networkResponse;
        })
        .catch((err) => {
            console.warn('[SW] Default fetch failed:', err.message);
            return cachedResponse;
        });

    return cachedResponse || fetchPromise;
}

// =====================================================================
// HELPER FUNCTIONS
// =====================================================================

function getFallbackUrl(pathname) {
    // Pathname'den fallback URL bul
    for (const [localPath, fallbackUrl] of Object.entries(FALLBACK_URLS)) {
        if (pathname.endsWith(localPath.replace('./', '')) ||
            localPath.includes(pathname.split('/').pop())) {
            return fallbackUrl;
        }
    }
    return null;
}

// =====================================================================
// MESSAGE HANDLER
// =====================================================================
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});