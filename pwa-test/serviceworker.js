const filesToCache = [
	"index.html",
	"bell.js",
	"schedule.js",
	"options.js",
	"bell.mp3",
	"bell.png"
//	"/privacy/index.html"
]; // don't cache serviceworker or updater, these are important to allow updates to exist!

const cachePrefix = "BELL_WEB_APP_"
const version = 1;

addEventListener("install", function(event) {
	event.waitUntil(
		caches
			.open(cachePrefix + version)
			.then(function(cache) {
				return cache.addAll(filesToCache);
			})
	);
});

addEventListener("fetch", function(event) {
	event.respondWith(
		caches
			.match(event.request)
			.then(function(res) {
				return res // short circuiting exists in JS.
					|| fetch(event.request)
						.then(function(response) {
							return caches
								.open(cachePrefix + version)
								.then(function(cache) {
									cache.put(event.request, response.clone());
									return response;
								});
						});
			})
	);
});
