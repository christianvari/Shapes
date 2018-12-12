//Import
import {Enviroment} from "./enviroment.js";


var enviroment;
export const PLAY = 1;
export const PAUSE = 2;
export const DEAD = 3;
//Import

var state = PLAY;

var restartButtonparent = document.getElementById("centerdiv");
var restartButton = document.createElement("img") ;
restartButton.setAttribute("src", "../images/retry1.svg");
restartButton.setAttribute("id", "restartButton");
restartButton.setAttribute("class", "svg");

var playButtonparent = document.getElementById("centerdiv");
var playButton = document.createElement("img") ;
playButton.setAttribute("src", "../images/play.svg");
playButton.setAttribute("id", "playButton");
playButton.setAttribute("class", "svg");

var pauseButtonparent = document.getElementById("topright");
var pauseButton = document.createElement("img") ;
pauseButton.setAttribute("src", "../images/pause.svg");
pauseButton.setAttribute("id", "pauseButton");
pauseButton.setAttribute("class", "svg inTopRight");

var infoButtonparent = document.getElementById("bottomright");
var infoButton = document.createElement("img");
infoButton.setAttribute("src", "../images/info.svg");
infoButton.setAttribute("id", "infoButton");
infoButton.setAttribute("class", "svg inBottomRight");

var muteButton =  document.createElement("img");
muteButton.setAttribute("src", "../images/sound.svg");
muteButton.setAttribute("id", "muteButton");
muteButton.setAttribute("class", "svg inTopRight");
var soundButton = document.createElement("img");
soundButton.setAttribute("src", "../images/mute.svg");
soundButton.setAttribute("id", "soundButton");
soundButton.setAttribute("class", "svg inTopRight");
var soundButtonparent = document.getElementById("topright");


var isSoundActive = sessionStorage.getItem('isSoundActive');
if(isSoundActive==null) isSoundActive='true';
var music=undefined;

document.onload = init();
//init();


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
	changeSound();
	getHighscore();
	
	window.setInterval(getHighscore, 10000);
	
	// set up the scene
	//
	setButtonVisibility(PLAY);
	adjustButtons();
	enviroment = new Enviroment();
	
	//GO
	//sound();
	enviroment.goGame();
	enviroment.started = true;
	//enviroment.goGame();

	getMusic();
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
						state = PLAY;
					});
				}
				else if(imgID=="pauseButton"){
					$svg.click(function(){
					
						setButtonVisibility(PAUSE)
						enviroment.started = false;
						state = PAUSE;
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
						window.location.replace("credits.php");
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
			if(document.getElementById("muteButton") != undefined){
				pauseButtonparent.removeChild(document.getElementById("soundButton"));
			}
			if(document.getElementById("soundButton") == undefined){
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
	getMusic();
	if(music!=undefined){
		if(isSoundActive=='true'){
			muteButton = document.getElementById("muteButton");
			soundButtonparent.removeChild(muteButton); 
			soundButtonparent.appendChild(soundButton);
			
			
			isSoundActive = 'false';
			sessionStorage.setItem('isSoundActive', 'false');
		}
		else{
			soundButton = document.getElementById("soundButton");
			soundButtonparent.removeChild(soundButton);
			soundButtonparent.appendChild(muteButton);
			
			
			isSoundActive = 'true';
			sessionStorage.setItem('isSoundActive', 'true');
		}
		sound();
	}	
	adjustButtons();
}

function getMusic(){
	if(document.getElementById("gameMusic") != undefined){ music = document.getElementById("gameMusic");}
	else if (document.getElementById("iframeAudio") != undefined) {
		var iframe = document.getElementById('iframeAudio');
		var innerDoc = iframe.contentDocument || iframe.contentWindow.document;
		if(innerDoc.getElementsByName('media')[0]!= undefined){
			music = innerDoc.getElementsByName('media')[0];
		}
		
	}
	//sound();

}

function sound(){
	
	if(isSoundActive=='true' && music!=undefined){
		music.muted = false;
	}
	else{
		music.muted = true;
	}
}