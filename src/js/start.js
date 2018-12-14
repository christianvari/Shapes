//Import
import {Enviroment} from "./enviroment.js";


var enviroment;
export const PLAY = 1;
export const PAUSE = 2;
export const DEAD = 3;
//Import

var state = PLAY;

var restartButtonparent;
var restartButton;
var playButtonparent;
var playButton;
var pauseButtonparent ;
var pauseButton;
var infoButtonparent;
var infoButton;
var muteButton;
var soundButton;
var soundButtonparent;


var isSoundActive = sessionStorage.getItem('isSoundActive');
if(isSoundActive==null) {
	isSoundActive='true';
	sessionStorage.setItem('isSoundActive', 'true');
}
var music;

$(document).ready(init);

function initializeButtons(){

	restartButtonparent = document.getElementById("centerdiv");
	restartButton = document.createElement("img") ;
	restartButton.setAttribute("src", "../images/retry1.svg");
	restartButton.setAttribute("id", "restartButton");
	restartButton.setAttribute("class", "svg");

	playButtonparent = document.getElementById("centerdiv");
	playButton = document.createElement("img") ;
	playButton.setAttribute("src", "../images/play.svg");
	playButton.setAttribute("id", "playButton");
	playButton.setAttribute("class", "svg");

	pauseButtonparent = document.getElementById("topright");
	pauseButton = document.createElement("img") ;
	pauseButton.setAttribute("src", "../images/pause.svg");
	pauseButton.setAttribute("id", "pauseButton");
	pauseButton.setAttribute("class", "svg inTopRight");

	infoButtonparent = document.getElementById("bottomright");
	infoButton = document.createElement("img");
	infoButton.setAttribute("src", "../images/info.svg");
	infoButton.setAttribute("id", "infoButton");
	infoButton.setAttribute("class", "svg inBottomRight");

	muteButton =  document.createElement("img");
	muteButton.setAttribute("src", "../images/sound.svg");
	muteButton.setAttribute("id", "muteButton");
	muteButton.setAttribute("class", "svg inTopRight");
	soundButton = document.createElement("img");
	soundButton.setAttribute("src", "../images/mute.svg");
	soundButton.setAttribute("id", "soundButton");
	soundButton.setAttribute("class", "svg inTopRight");
	soundButtonparent = document.getElementById("topright");

}


function getHighscore(){
	var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
			document.getElementById("highscores").innerHTML = this.responseText;
		}
	};
	xmlhttp.open("GET", "../server_side/getHighscore.php", true);
	xmlhttp.send();
}


function init() {
	//Inizialize sound
	initializeButtons();
	initialSound();

	//Inizialize AJAX and refresh highscores
	getHighscore();
	window.setInterval(getHighscore, 5000);
	
	// set up the scene
	//
	setButtonVisibility(PLAY);
	adjustButtons();
	enviroment = new Enviroment();
	
	//GO
	//sound();
	enviroment.goGame();
	enviroment.started = true;
}

function adjustButtons(){

	$(function() {
		$('img.svg').each(function() {
			var $img = $(this);
			var imgID = $img.attr('id');
			var imgClass = $img.attr('class');
			var imgURL = $img.attr('src');
			$.get(imgURL, function(data) {
				
				var $svg = $(data).find('svg');
	
				if (typeof imgID !== 'undefined') {
					$svg = $svg.attr('id', imgID);
				}
				
				if (typeof imgClass !== 'undefined') {
					$svg = $svg.attr('class', imgClass + ' replaced-svg');
				}

				$svg = $svg.removeAttr('xmlns:a');
		
				$img.replaceWith($svg);
				
				//add event handler
				if( imgID=="playButton"){
					$svg.click(function(){
						
						setButtonVisibility(PLAY);
						enviroment.started = true;
						music.play();
						state = PLAY;
					});
				}
				else if(imgID=="pauseButton"){
					$svg.click(function(){
						goToPause();
						
					});
				}
				else if(imgID=="restartButton"){
					$svg.click(function(){
						window.location.reload();
					});
				}
				else if(imgID=="soundButton" || imgID == "muteButton"){
					$svg.click(function(){
						changeSound();
					});
				}
				else if(imgID == "infoButton"){
					$svg.click(function(){
						if(document.location.pathname == "/desktop/game.php"){
							window.location.replace("credits.php");
						}
						else{
							window.location.replace("credits_mobile.php");
						}
					});
				}
				
			}, 'xml');
		});
		
	});
}


export function setButtonVisibility(s){
	
	if(s==PAUSE){
		console.log("PAUSE");
		pauseButtons();
		state = PAUSE;
	}
	else if(s==PLAY){
		console.log("PLAY")
		playButtons();
		state = PLAY;
	}
	else if(s == DEAD){
		console.log("DEAD");
		deadButtons();
		state = DEAD;
	}
}


function playButtons(){
	if(document.getElementById("infoButton") != undefined){
		infoButton = document.getElementById("infoButton");
		infoButtonparent = infoButton.parentNode;
		infoButtonparent.removeChild(infoButton);
	}
	if(document.getElementById("playButton") != undefined){
		playButton = document.getElementById("playButton");
		playButtonparent = playButton.parentNode;
		playButtonparent.removeChild(playButton);
	}
	if(document.getElementById("pauseButton") == undefined){
		pauseButtonparent.appendChild(pauseButton);
		if(isSoundActive=='true'){
			if(document.getElementById("muteButton") != undefined){
				pauseButtonparent.removeChild(document.getElementById("muteButton"));
			}
			if(document.getElementById("soundButton") == undefined){
				pauseButtonparent.appendChild(muteButton);
			}
		}else{
			if(document.getElementById("soundButton") != undefined){
				pauseButtonparent.removeChild(document.getElementById("soundButton"));
			}
			if(document.getElementById("muteButton") == undefined){
				pauseButtonparent.appendChild(soundButton);
			}
		}
	}
	if(document.getElementById("restartButton") != undefined){
		restartButton = document.getElementById("restartButton");
		restartButtonparent = restartButton.parentNode;
		restartButtonparent.removeChild(document.getElementById("restartButton"));
	}
	if(document.getElementById("infoButton") != undefined){
		infoButton = document.getElementById("infoButton");
		infoButtonparent = infoButton.parentNode;
		infoButtonparent.removeChild(infoButton);
	}
	adjustButtons();
}

function pauseButtons(){
	if(document.getElementById("playButton") == undefined){
		playButtonparent.appendChild(playButton);
	}
	if(document.getElementById("pauseButton") != undefined){
		pauseButton = document.getElementById("pauseButton");
		pauseButtonparent = pauseButton.parentNode;
		pauseButtonparent.removeChild(pauseButton);
	}
	if(document.getElementById("restartButton") != undefined){
		restartButton = document.getElementById("restartButton");
		restartButtonparent = restartButton.parentNode;
		restartButtonparent.removeChild(document.getElementById("restartButton"));
	}
	if(document.getElementById("infoButton") != undefined){
		infoButton = document.getElementById("infoButton");
		infoButtonparent = infoButton.parentNode;
		infoButtonparent.removeChild(infoButton);
	}
	adjustButtons();
}

function deadButtons(){
	if(document.getElementById("infoButton") == undefined){
		infoButtonparent.appendChild(infoButton);
	}
	if(document.getElementById("playButton") != undefined){
		playButton = document.getElementById("playButton");
		playButtonparent = playButton.parentNode;
		playButtonparent.removeChild(playButton);
	}
	if(document.getElementById("pauseButton") != undefined){
		pauseButton = document.getElementById("pauseButton");
		pauseButtonparent = pauseButton.parentNode;
		pauseButtonparent.removeChild(pauseButton);
	}
	if(document.getElementById("restartButton") == undefined){
		restartButtonparent.appendChild(restartButton);
	}
	adjustButtons();
}

function changeSound(){

	console.log(isSoundActive);
		if( isSoundActive=='true'){
			console.log("è attivo");
			let mute = document.getElementById("muteButton");
			if(mute!=undefined){
				soundButtonparent.removeChild(mute); 
			}
			let sound = document.getElementById("soundButton");
			if(sound == undefined){
				soundButtonparent.appendChild(soundButton);
			}
			
			isSoundActive = 'false';
			sessionStorage.setItem('isSoundActive', 'false');
		}
		else{
			console.log("non è attivo");

			let sound = document.getElementById("soundButton");
			if(sound!=undefined){
				soundButtonparent.removeChild(sound);
			}
			let mute = document.getElementById("muteButton");
			if(mute==undefined){
				soundButtonparent.appendChild(muteButton);
			}
			
			
			isSoundActive = 'true';
			sessionStorage.setItem('isSoundActive', 'true');
		}
		sound();

	console.log(isSoundActive);

	adjustButtons();
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

function initialSound(){

	getMusic();
	sound();
	music.play();
}

export function goToPause(){
	setButtonVisibility(PAUSE)
	enviroment.started = false;
	music.pause();
	state = PAUSE;
}