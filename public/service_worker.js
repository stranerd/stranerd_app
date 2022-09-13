const { cacheableResponse, expiration, precaching, routing, strategies } = self.workbox

self.addEventListener('message', (event) => {
	if (event.data && event.data.type === 'SKIP_WAITING') {
		event.currentTarget.skipWaiting()
	}
})
self.addEventListener('install', async (event) => {
	const cache = await caches.open('src')
	event.waitUntil(cache.addAll(['/']))
})

precaching.precacheAndRoute(self.__precacheManifest || [])
routing.registerRoute('/', new strategies.NetworkFirst({ cacheName: 'src' }))
routing.registerRoute(({ request }) => request.destination === 'style', new strategies.NetworkFirst({ cacheName: 'stylesheets' }))
routing.registerRoute(({ request }) => request.destination === 'script', new strategies.NetworkFirst({ cacheName: 'javascripts' }))
routing.registerRoute(({ request }) => request.destination === 'image', new strategies.CacheFirst({
	cacheName: 'images', plugins: [
		new cacheableResponse.Plugin({
			statuses: [0, 200]
		}),
		new expiration.Plugin({
			maxEntries: 50,
			maxAgeSeconds: 7 * 24 * 60 * 60
		})
	]
}))
routing.registerRoute(({ url }) => url.origin === 'https://fonts.googleapis.com', new strategies.StaleWhileRevalidate({ cacheName: 'fonts-stylesheets' }))
routing.registerRoute(({ url }) => url.origin === 'https://fonts.gstatic.com', new strategies.CacheFirst({
	cacheName: 'fonts', plugins: [
		new cacheableResponse.Plugin({
			statuses: [0, 200]
		}),
		new expiration.Plugin({
			maxEntries: 30,
			maxAgeSeconds: 365 * 24 * 60 * 60
		})
	]
}))

self.__WB_MANIFEST
