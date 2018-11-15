import { MyScene, NUM_OBSTACLES } from "./myscene.js";
import {WebGLRenderer, PCFSoftShadowMap, Clock} from "./lib/three.module.js"

/*
Class Enviroment
***
var:
    ground
*/

const cameraPosition = [0,4,8];
const MIN_LIVING_OBSTACLES = 5;
const OBSTACLE_FIRE_RATE = 1;
export const time_scale = 1;

export class Enviroment {

	constructor() {


		this.score = 0;
		this.scoreText;
		this.clock = new Clock({autostart : true});
		this.sceneWidth = window.innerWidth;
		this.sceneHeight = window.innerHeight;
		this.renderer = new WebGLRenderer({alpha:true, antialias:true});//renderer with transparent backdrop
		this.myscene = new MyScene(cameraPosition, -20, this.sceneWidth, this.sceneHeight);

		this.obstacle_index = 0;


		//Install Event Handler
		window.addEventListener('resize', this.onWindowResize.bind(this), false);//resize callback
		document.onkeydown = this.handleKeyDown.bind(this);

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

		window.requestAnimationFrame(this.goGame.bind(this));//request next update

		this.renderize();

		this.myscene.player.rotate();
		this.myscene.ground.getGround().material.color.setHex(/*this.myscene.ground.getGround().material.color.getHex()*/0x560056);

		this.obstacleLogic();


	}

	obstacleLogic(){
		let living_obstacles = this.myscene.living_obstacles;
		if(living_obstacles < MIN_LIVING_OBSTACLES  && this.clock.getElapsedTime() > OBSTACLE_FIRE_RATE){
			this.clock.elapsedTime = 0;
			this.myscene.startObstacle();
		}

		for(let i =0; i<NUM_OBSTACLES; i+=1){
			this.myscene.obstacleMovement(i);
		}

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

		/*	commands schema

              0    1
            | -> | -> |
            | <- | <- |
              2    3
        */
		//I store in command the actual command to start,
		//	it is possible to store a next_command (ex. if a player wants to turn fast or to prevent to collide a obstacle )
		//	the next_command will start after the termination of the previous one

		if ( keyEvent.keyCode == 37) {//left
			console.log("left");
			if(this.myscene.player.command==-1){
				if(this.myscene.player.currentPosition==0){
					this.myscene.player.command=2;
				}
				else if(this.myscene.player.currentPosition==1){
					this.myscene.player.command=3;
				}
			}else if(this.myscene.player.next_command==-1){
				if(this.myscene.player.currentPosition==0 && this.myscene.player.command==1) this.myscene.player.next_command=3;
				else if(this.myscene.player.currentPosition==-1 && this.myscene.player.command==0) this.myscene.player.next_command=2;
				else if(this.myscene.player.currentPosition==1 && this.myscene.player.command==3) this.myscene.player.next_command=2;
			}
		
		}else if(keyEvent.keyCode == 39){//right
			console.log("right");
			if(this.myscene.player.command==-1){
				if(this.myscene.player.currentPosition==0){
					this.myscene.player.command=1;
				}
				else if(this.myscene.player.currentPosition==-1){
					this.myscene.player.command=0;
				}
			}else if(this.myscene.player.next_command==-1){
				if(this.myscene.player.currentPosition==1 && this.myscene.player.command==3) this.myscene.player.next_command=1;
				else if(this.myscene.player.currentPosition==-1 && this.myscene.player.command==0) this.myscene.player.next_command=1;
				else if(this.myscene.player.currentPosition==0 && this.myscene.player.command==2) this.myscene.player.next_command=0;
			}
		}
		else if(keyEvent.keyCode == 38){//up
			console.log("up");
			if(this.myscene.player.command==-1){
				this.myscene.player.command=4;
			}else if(this.myscene.player.next_command==-1){
				this.myscene.player.next_command=4;
			}
		}
	}	
}
