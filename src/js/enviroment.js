import { MyScene, NUM_OBSTACLES, PLAYER_EDGE } from "./myscene.js";
import {WebGLRenderer, Clock} from "./lib/three.module.js"

/*
Class Enviroment
***
var:
    ground
*/

const MIN_LIVING_OBSTACLES = 5;
const OBSTACLE_FIRE_RATE_DELTA = 0.1;
const CHANGE_LEVEL = 1000;
const VELOCITY_STEP_DELTA = 0.1;
const MAX_LEVEL = 5;
export const time_scale = 1;

var OBSTACLE_FIRE_RATE = 1;
var SCORE_MULTIPLYER = 100;

export class Enviroment {

	constructor() {


		this.score = 0;
		this.scoreText;
		this.clock = new Clock();
		this.sceneWidth = window.innerWidth;
		this.sceneHeight = window.innerHeight;
		this.renderer = new WebGLRenderer();
		this.myscene = new MyScene(this.sceneWidth, this.sceneHeight);

		this.obstacle_index = 0;
		this.player_on_obstacle_index = -1;
		this.level = 0;

		this.isLiving=true;


		//Install Event Handler
		window.addEventListener('resize', this.onWindowResize.bind(this), false);//resize callback
		document.onkeydown = this.handleKeyDown.bind(this);

		//Inizialize Interface
		this.inizializeCanvas();
	}

	inizializeCanvas(){

		this.renderer.setClearColor(0xfffafa, 1); 
		this.renderer.setPixelRatio( window.devicePixelRatio );
		this.renderer.shadowMap.enabled = true;//enable shadow
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

		if(this.isLiving){

			this.myscene.player.rotate();
			this.obstacleLogic();
		}
		else{
			this.die();
		}

		this.renderize();


	}

	die(){
		console.log("Morto");

		this.myscene.player.getPlayer().rotation.y += 5 * Math.PI/180;

		if(!(this.myscene.player.getPlayer().position.x < 0.05 && this.myscene.player.getPlayer().position.x> -0.05))
		{
			if(this.myscene.player.currentPosition == -1){
			this.myscene.player.getPlayer().position.x += 0.05;
			}
			else if(this.myscene.player.currentPosition == 1){
				this.myscene.player.getPlayer().position.x -= 0.05;
			}
		}
		if(! (this.myscene.player.getPlayer().position.z > 2)){
			console.log("a");
			this.myscene.player.getPlayer().position.z +=0.05;
		}

		if(! (this.myscene.player.getPlayer().position.y > 3)){
			this.myscene.player.getPlayer().position.y +=0.05;
		}
		if (this.myscene.player.getPlayer().scale.x > 0){
			this.myscene.player.getPlayer().scale.x-=0.005;
			this.myscene.player.getPlayer().scale.z-=0.005;
			this.myscene.player.getPlayer().scale.y-=0.005;

		}

		
	}

	gameOver(){

		this.isLiving = false;

	}

	collisionLogic(i){


		if(this.myscene.player.isOnTheSecondLevel && this.player_on_obstacle_index == i){


			if(this.myscene.player.getPositionZ() < this.myscene.getObstacleTailPositionZ(i)){

				console.log("SCENDO");
				
				this.myscene.player.goDown();
				this.myscene.player.isOnTheSecondLevel=false;
				this.player_on_obstacle_index = -1;
			}

		}
		else{
			if(this.myscene.player.getPositionZ() < this.myscene.getObstacleFrontPositionZ(i)){
				
				if(this.myscene.player.getPositionX() == this.myscene.getObstaclePositionX(i)){

					console.log(this.myscene.player.getBottomPositionY()+ " > " + this.myscene.getObstacleTop(i) +" " +this.myscene.player.isOnTheSecondLevel);

					if(this.myscene.player.getBottomPositionY() > this.myscene.getObstacleTop(i) && !this.myscene.player.isOnTheSecondLevel){
						
						console.log("SALGO");

						this.myscene.player.playerBaseY = this.myscene.getObstacleTop(i);
						this.myscene.player.isOnTheSecondLevel = true;
						this.player_on_obstacle_index = i;
					}
					else{
						this.gameOver();
					}
				}
			}
		}
		
	}

	changeLevel(){
		OBSTACLE_FIRE_RATE -= OBSTACLE_FIRE_RATE_DELTA;
		this.myscene.VELOCITY_STEP += VELOCITY_STEP_DELTA;
		this.myscene.ground.getGround().material.color.setHex(Math.random() * 0xffffff);

	}

	scorelogic(new_points){

		this.score += new_points * SCORE_MULTIPLYER; 
		this.scoreText.innerHTML= this.score.toString();

		if( this.level < MAX_LEVEL && Math.floor(this.score / CHANGE_LEVEL) != this.level){
			

			this.changeLevel();
			this.level += 1;
		}	

	}

	obstacleLogic(){
		let living_obstacles = this.myscene.living_obstacles;
		//console.log(living_obstacles);
		if(living_obstacles < MIN_LIVING_OBSTACLES  && this.clock.getElapsedTime() > OBSTACLE_FIRE_RATE){
			this.clock.elapsedTime = 0;
			this.myscene.startObstacle();
		}
		let new_points = 0;
		for(let i =0; i<NUM_OBSTACLES; i+=1){
			new_points += this.myscene.obstacleMovement(i);

			this.collisionLogic(i);
		}

		this.scorelogic(new_points);

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
			if(this.myscene.player.command==-1){
				if(this.myscene.player.currentPosition==0){
					this.myscene.player.command=2;
				}
				else if(this.myscene.player.currentPosition==1){
					this.myscene.player.command=3;
				}
			}else if(this.myscene.player.command == 4){
				
				this.myscene.player.translateX(-1);					
				
			}else if(this.myscene.player.next_command==-1){
				if(this.myscene.player.currentPosition==0 && this.myscene.player.command==1) this.myscene.player.next_command=3;
				else if(this.myscene.player.currentPosition==-1 && this.myscene.player.command==0) this.myscene.player.next_command=2;
				else if(this.myscene.player.currentPosition==1 && this.myscene.player.command==3) this.myscene.player.next_command=2;
			}
		
		}else if(keyEvent.keyCode == 39){//right
			if(this.myscene.player.command==-1){
				if(this.myscene.player.currentPosition==0){
					this.myscene.player.command=1;
				}
				else if(this.myscene.player.currentPosition==-1){
					this.myscene.player.command=0;
				}
			}else if(this.myscene.player.command == 4){
				this.myscene.player.translateX(1);
				
			}else if(this.myscene.player.next_command==-1){
				if(this.myscene.player.currentPosition==1 && this.myscene.player.command==3) this.myscene.player.next_command=1;
				else if(this.myscene.player.currentPosition==-1 && this.myscene.player.command==0) this.myscene.player.next_command=1;
				else if(this.myscene.player.currentPosition==0 && this.myscene.player.command==2) this.myscene.player.next_command=0;
			}
		}
		else if(keyEvent.keyCode == 38){//up
			if(this.myscene.player.command==-1){
				this.myscene.player.command=4;
			}else if(this.myscene.player.next_command==-1){
				this.myscene.player.next_command=4;
			}
		}
		 
	}	
}
