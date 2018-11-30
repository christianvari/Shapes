//Import
import {Enviroment} from "./enviroment.js";

init();

function getHighscore(){
	var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
			document.getElementById("highscores").innerHTML = this.responseText;
			console.log(this.responseText);
		}
	};
	xmlhttp.open("GET", "getHighscore.php", true);
	xmlhttp.send();
}


function init() {

	window.setInterval(getHighscore, 5000);

	// set up the scene
	var enviroment = new Enviroment();

	//GO
	enviroment.goGame();

}