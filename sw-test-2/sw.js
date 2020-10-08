//const filesToCache = [
//"index.html",
//"bell.js",
//"schedule.js",
//"options.js",
//"bell.mp3",
//"bell.png",
//"manifest.json"
////"/privacy/index.html"
//]; // don't cache serviceworker or updater, these are important to allow updates to exist!

const cachePrefix = "BELL_WEB_APP_"
	const version = 1;

const doCache = ["index.html"];
//don't cache versions.js

const CURRENT_VERSION_PLACEHOLDER = "$SW_TARGET_CURRENT_VERSION$";
const DONT_CACHE_ME = "$SW_NOCACHE$";

addEventListener("install", function(event) {
	event.waitUntil(
			caches
				.open(cachePrefix + version)
				.then(function(cache) {
					return cache.addAll(doCache);
				})
	);
});

addEventListener("fetch", function(event) {
	event.respondWith(
			caches
			.match(event.request)
			.then(function(res) {
				return res
				|| fetch(event.request)
				.then(async function(response) {
					const reader = response.body.getReader();
					
					var resolve;
					let promise = new Promise(r => (resolve = r));
					
					{
						let buf = "";
						const decoder = new TextDecoder("utf-8");

						function readMore() {
							reader.read().then(({ done, value }) => {
								if (done) {
									finishedReading();
									return;
								}

								buf += decoder.decode(value);
								readMore();
							});
						}
						
						function finishedReading() {
							var transformedBuf = buf.replace(CURRENT_VERSION_PLACEHOLDER, version.toString());
							resolve(transformedBuf);
						}

						readMore();
					}
					
					await promise;

					return content.includes(DONT_CACHE_ME)
					? buildNewResponse(content)
					: caches
						.open(cachePrefix + version)
						.then(function(cache) {
							cache.put(event.request, response.clone());
							return response;
						});
				});
			})
	);
});

function buildNewResponse(content) {
	const bytes = new TextEncoder().encode(content);
	
	const stream = new ReadableStream(function(controller) {
		controller.enqueue(bytes);
	});
	
	return new Response(stream, {"Content-Type":"text/javascript"});
}
