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
		});
}
