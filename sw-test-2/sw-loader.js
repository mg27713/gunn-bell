addEventListener("message", msg => {
	if (!(msg["swDebug"]))
		return;
	
	console.log(msg["swDebug"]);
});

if ("serviceWorker" in navigator) {
	navigator.serviceWorker.register("./sw.js");
	
	import("./versions.js") // after service worker loads so the transformation happens.
		.then(() => {
			if (LATEST_VERSION != CURRENT_VERSION) {
				navigator.serviceWorker.getRegistrations().then(rs => rs.map(r => r.unregister()));
				location.reload();
			}
		})
		.catch(e => {
			if (!(e instanceof ReferenceError)) // ReferenceError happens on the first load beecause the service worker hasn't replaced the macros in versions.js
				// but if the service worker is first being installed, then it must be up to date.
				throw e;
		});
}
