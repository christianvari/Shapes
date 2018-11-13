import { MyScene } from "./myscene.js";
import {WebGLRenderer, PCFSoftShadowMap} from "./lib/three.module.js"

//Globals

var renderer;
var sceneWidth;
var sceneHeight;


goLive();

function goLive() {

    

}

function createEnviroment(){

    sceneWidth = window.innerWidth;
    sceneHeight = window.innerHeight;
    renderer = new WebGLRenderer({alpha : true});
    renderer.setClearColor(0xfffafa, 1); 
	renderer.shadowMap.enabled = true;//enable shadow
	renderer.shadowMap.type = PCFSoftShadowMap;
	renderer.setSize( sceneWidth, sceneHeight );
	document.body.appendChild( this.renderer.domElement );
}