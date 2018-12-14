//Import
import {EnviromentCredits} from "./environmentcredits.js";

var isSoundActive = sessionStorage.getItem('isSoundActive');
if(isSoundActive==null) {
	isSoundActive='true';
	sessionStorage.setItem('isSoundActive', 'true');
}
var music;

$(document).ready(init);


function init() {

	initialSound();

	// set up the scene
	var enviromentcredits = new EnviromentCredits();

	//GO
	document.getElementById("bottomText").style.visibility = "hidden";
	enviromentcredits.goGame();

}

function initialSound(){

	getMusic();
	sound();
	music.play();
}

function getMusic(){
	music = document.getElementById("gameMusic");
}

function sound(){
	
	if(isSoundActive=='true'){
		music.muted = false;
	}
	else{
		music.muted = true;
	}
}