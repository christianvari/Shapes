//Import
import {EnviromentCredits} from "./environmentcredits.js";

$(document).ready(init);


function init() {

	// set up the scene
	var enviromentcredits = new EnviromentCredits();

	//GO
	document.getElementById("bottomText").style.visibility = "hidden";
	enviromentcredits.goGame();

}