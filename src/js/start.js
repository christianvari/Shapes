//Import
import {Enviroment} from "./enviroment.js";


var enviroment;

//Import


const INIT = 0;
const PLAY = 1;
const PAUSE = 2;
const DEAD = 3;

var state = INIT;

    // pattern Singleton


/*
  * Replace all SVG images with inline SVG
  */
 $(function() {
    $('img.svg').each(function() {
             var $img = $(this);
             var imgID = $img.attr('id');
             var imgClass = $img.attr('class');
             var imgURL = $img.attr('src');
    $.get(imgURL, function(data) {
                 // Get the SVG tag, ignore the rest
                 var $svg = $(data).find('svg');
    // Add replaced image's ID to the new SVG
                 if (typeof imgID !== 'undefined') {
                     $svg = $svg.attr('id', imgID);
                 }
                 // Add replaced image's classes to the new SVG
                 if (typeof imgClass !== 'undefined') {
                     $svg = $svg.attr('class', imgClass + ' replaced-svg');
                 }
                
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
						setButtonVisibility(PLAY);
						enviroment.started=true;
						state = PLAY;
					});
					$svg.attr("visibility", "hidden");
					
				}
				else if(imgID=="muteButton"){

				}
    // Remove any invalid XML tags as per http://validator.w3.org
                 $svg = $svg.removeAttr('xmlns:a');
    // Replace image with new SVG
                 $img.replaceWith($svg);
    }, 'xml');
    });
	
});

//setButtonVisibility(INIT);
init();

function getHighscore(){
	var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
			document.getElementById("highscores").innerHTML = this.responseText;
		}
	};
	xmlhttp.open("GET", "getHighscore.php", true);
	xmlhttp.send();
}


function init() {
	getHighscore();

	window.setInterval(getHighscore, 10000);
	
	// set up the scene
	enviroment = new Enviroment();
	
	setButtonVisibility(INIT);
	//GO
	enviroment.goGame();
	//enviroment.goGame();
	
}


function setButtonVisibility(state){
	if(state==INIT){
		console.log("INIT");
		document.getElementById("playButton").setAttribute("visibility", "visible");
		document.getElementById("pauseButton").setAttribute("visibility", "hidden");
		//document.getElementById("restartButton").setAttribute("visibility", "hidden");
	}
	else if(state==PAUSE){
		console.log("PAUSE");
		document.getElementById("playButton").setAttribute("visibility", "visible");
		document.getElementById("pauseButton").setAttribute("visibility", "hidden");
		//document.getElementById("restartButton0").setAttribute("visibility", "hidden");

	}
	else if(state==PLAY){
		console.log("PLAY")
		document.getElementById("playButton").setAttribute("visibility", "hidden");
		document.getElementById("pauseButton").setAttribute("visibility", "visible");
		//document.getElementById("restartButton0").setAttribute("visibility", "hidden");

	}
	else if(state == DEAD){
		//document.getElementById("playButton0").setAttribute("visibility", "hidden");
		document.getElementById("pauseButton").setAttribute("visibility", "hidden");
		document.getElementById("restartButton").setAttribute("visibility", "hidden");
	}
}
