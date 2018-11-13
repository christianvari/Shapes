import { MyScene } from "./myscene.js";
import {WebGLRenderer, PCFSoftShadowMap} from "./lib/three.module.js"

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
		this.renderer = new WebGLRenderer({alpha:true, antialias:true});//renderer with transparent backdrop
		this.myscene = new MyScene(cameraPosition, -20, this.sceneWidth, this.sceneHeight);


		//Install Event Handler
		window.addEventListener('resize', this.onWindowResize.bind(this), false);//resize callback
		document.onkeydown = this.handleKeyDown.bind(this);		//

		//Inizialize Interface
		this.inizializeCanvas();
	}

	inizializeCanvas(){

		this.renderer.setClearColor(0xfffafa, 1); 
		this.renderer.shadowMap.enabled = true;//enable shadow
		this.renderer.shadowMap.type = PCFSoftShadowMap;
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
		this.renderer.render(this.myscene.getScene(), this.myscene.camera.getCamera());//draw
	}

	goGame(){
		this.renderize();
		this.myscene.player.rotate();
		window.requestAnimationFrame(this.goGame.bind(this));//request next update
	}

	onWindowResize() {
		//resize & align
		this.sceneHeight = window.innerHeight;
		this.sceneWidth = window.innerWidth;
		this.renderer.setSize(this.sceneWidth, this.sceneHeight);
		this.myscene.camera.getCamera().aspect = this.sceneWidth/this.sceneHeight;
		this.myscene.camera.getCamera().updateProjectionMatrix();
	}
	
	handleKeyDown(keyEvent){

		/*
              0    1
            | -> | -> |
            | <- | <- |
              2    3
        */

		if ( keyEvent.keyCode == 37) {//left
			console.log("left");
			if(this.myscene.player.currentPosition==0){
				this.myscene.player.command=2;
			}
			else if(this.myscene.player.currentPosition==1){
				this.myscene.player.command=3;
			}
		}else if(keyEvent.keyCode == 39){//right
			console.log("right");
			if(this.myscene.player.currentPosition==0){
				this.myscene.player.command=1;
			}
			else if(this.myscene.player.currentPosition==-1){
				this.myscene.player.command=0;
			}
		}
	}	
}
