import { MyScene } from "./myscene.js";
import * as THREE from "./lib/three.module.js"

/*
Class Enviroment
***
var:
    ground
*/

const cameraPosition = [0,2.5,4.5];

export class Enviroment {

	constructor() {

		this.score = 0;
		this.scoreText;
		this.sceneWidth = window.innerWidth;
		this.sceneHeight = window.innerHeight;
		this.renderer = new THREE.WebGLRenderer({alpha:true, antialias:true});//renderer with transparent backdrop
		this.myscene = new MyScene(this.sceneWidth, this.sceneHeight, cameraPosition, -20);


		//Install Event Handler
		window.addEventListener('resize', this.onWindowResize, false);//resize callback
		document.onkeydown = this.handleKeyDown;

		//Inizialize Interface
		this.inizializeCanvas();
	}

	inizializeCanvas(){

		this.renderer.setClearColor(0xfffafa, 1); 
		this.renderer.shadowMap.enabled = true;//enable shadow
		this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
		this.renderer.setSize( this.sceneWidth, this.sceneHeight );
		document.body.appendChild( this.renderer.domElement );
	
		this.scoreText = document.createElement('div');
		this.scoreText.style.position = 'absolute';
		this.scoreText.style.width = 100;
		this.scoreText.style.height = 100;
		this.scoreText.innerHTML = "0";
		this.scoreText.style.top = 50 + 'px';
		this.scoreText.style.left = 10 + 'px';
		document.body.appendChild(this.scoreText);
	}

	renderize(){
		this.renderer.render(this.myscene.scene, this.myscene.camera.camera);//draw
	}

	goGame(){
		this.renderize();
		window.requestAnimationFrame(() => this.goGame());//request next update
	}

	onWindowResize() {
		//resize & align
		this.sceneHeight = window.innerHeight;
		this.sceneWidth = window.innerWidth;
		this.renderer.setSize(this.sceneWidth, this.sceneHeight);
		this.myscene.camera.aspect = this.sceneWidth/this.sceneHeight;
		this.myscene.camera.updateProjectionMatrix();
	}
	
	handleKeyDown(keyEvent){
		if ( keyEvent.keyCode === 32) {//space
	
		}
	}	
}
