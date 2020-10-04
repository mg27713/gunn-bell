//const schedules = require("./schedules.json");

function secondLoop() {
	let date = new Date().toString().split(" ");
//	console.log(schedules[date[0]]);
	
	let timeParts = date[4].split(":");
	if (timeParts[0].startsWith("0"))
		timeParts[0] = timeParts[0].substring(1);
	
	let actualTime = timeParts[0] + ":" + timeParts[1];
	
	if (schedules[date[0]].includes(actualTime) && !playing && parseInt(timeParts[2]) < 5) {
//		if (voice1)
//			voice1.play("bell.mp3");
//		voice2.play("bell.mp3");
//		voice3.play("bell.mp3");
//		voice4.play("bell.mp3");
		
//		if (testVoice)
//			testVoice.play("bell.mp3");
		
		//play(voice1, "bell.mp3");
		//play(testVoice, "bell.mp3");
    
    document.getElementById("bell-sound").play();
		playing = true;
	}
	
	if (parseInt(timeParts[2]) > 5)
		playing = false;
}

window.addEventListener("load", () => {
  setInterval(secondLoop, 1000);
});
