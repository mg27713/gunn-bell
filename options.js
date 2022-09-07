window.addEventListener("load", function() {
	const audio = document.getElementById("bell-sound");
	const testAudio = document.getElementById("test-sound");
	
	const volume = document.getElementById("volume-slider");
	const volumeField = document.getElementById("volume-display");
	
	document.getElementById("school").innerText = school;
	
	if (localStorage.settingVolume)
		volume.value = localStorage.settingVolume;
	
	audio.volume = parseInt(volume.value)/100;
	testAudio.volume = audio.volume;
	volumeField.innerHTML = volume.value;
	
	volume.addEventListener("change", function() {
//		console.log("new volume: " + volume.value);
		
		audio.volume = parseInt(volume.value)/100;
		testAudio.volume = audio.volume;
		volumeField.innerHTML = volume.value;
		localStorage.settingVolume = volume.value;
	});
});
