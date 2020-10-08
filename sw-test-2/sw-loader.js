if ("serviceWorker" in navigator) {
	navigator.serviceWorker.register("./sw.js");
	
	await import("./versions.js"); // after service worker loads so the transformation happens.
	
	if (LATEST_VERSION != CURRENT_VERSION) {
		navigator.serviceWorker.getRegistrations().then(rs => rs.map(r => r.unregister()));
		location.reload();
	}
}
