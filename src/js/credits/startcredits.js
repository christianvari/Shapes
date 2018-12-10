//Import
import {EnviromentCredits} from "./environmentcredits.js";

init();


function init() {

	// set up the scene
	var enviromentcredits = new EnviromentCredits();

	//GO
	document.getElementById("bottomText").style.visibility = "hidden";
	enviromentcredits.goGame();

}