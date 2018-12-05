import { MyScene, NUM_OBSTACLES, PLAYER_EDGE } from "./myscene.js";
import {WebGLRenderer, Clock} from "./lib/three.module.js"
import {setButtonVisibility, DEAD, PLAY, PAUSE} from "./buttonLogic.js"
/*
Class Enviroment
***
var:
    ground
*/

const MIN_LIVING_OBSTACLES = 8;
const OBSTACLE_FIRE_RATE_DELTA = 0.1;
const CHANGE_LEVEL = 1000;
const VELOCITY_STEP_DELTA = 0.1;
const MAX_LEVEL = 10;
const NUM_OF_SPECIAL_LEVELS = 3; 	 //to change if other special levels are added
const PERC_NORMAL_LEVEL = 0.5;  	 // 60% to do a normal level
export const time_scale = 1;

var OBSTACLE_FIRE_RATE = 1;
var SCORE_MULTIPLYER = 100;


export class Enviroment {

	constructor() {

		this.started = false;

		this.score = 0;
		this.scoreText;
		this.clock = new Clock();
		this.sceneWidth = window.innerWidth;
		this.sceneHeight = window.innerHeight;
		this.renderer = new WebGLRenderer({antialias : true});
		this.myscene = new MyScene(this.sceneWidth, this.sceneHeight);

		this.obstacle_index = 0;
		this.player_on_obstacle_index = -1;
		this.level = 0;
		this.special_level = -1;

		this.isLiving=true;
		this.finished=false;

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
	
		this.scoreText = document.getElementById("scoreText");
	}

	renderize(){
		this.renderer.render(this.myscene.getScene(), this.myscene.camera.getCamera());//draw
	}

	goGame(){

		if(!this.finished){

			window.requestAnimationFrame(this.goGame.bind(this));//request next update

			if(this.started){

				if(this.isLiving){

					this.myscene.player.rotate();
					this.myscene.player.goDown();
					this.obstacleLogic();
					this.myscene.camera.rotate();
					this.myscene.flashLight();
				}
				else{
					this.die();
				}
			}
			this.renderize();
		}
		else {
			setButtonVisibility(DEAD);
			var xmlhttp = new XMLHttpRequest();

			xmlhttp.onreadystatechange = function() {
				if (this.readyState == 4 && this.status == 200) {
					document.getElementById("highscores").innerHTML = this.responseText;
				}
			};
			xmlhttp.open("GET", "setHighscore.php?q=" + this.score, true);
			xmlhttp.send();
		}

		
	}

	die(){

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
		else {
			this.finished = true;
		}

		
	}

	gameOver(){

		this.isLiving = false;

	}

	collisionLogic(i){


		if(this.myscene.player.isOnTheSecondLevel && this.player_on_obstacle_index == i){


			if((this.myscene.player.getPositionZ() + (PLAYER_EDGE/2)  < this.myscene.getObstacleTailPositionZ(i))) {


				console.log("SCENDO");
				
				this.myscene.player.going_down = true;
				this.myscene.player.isOnTheSecondLevel=false;
				this.player_on_obstacle_index = -1;
			}
			else if(this.myscene.player.getPositionX() != this.myscene.getObstaclePositionX(i)){

				//console.log(this.myscene.player.command + " "+
				//(this.myscene.player.getPositionX() /*- (PLAYER_EDGE/2)*/+ " > " + this.myscene.getObstaclePositionX(i) + (PLAYER_EDGE/2)));


				if((((this.myscene.player.command == 0|| this.myscene.player.command == 1)) && 
				(this.myscene.player.getPositionX() - (PLAYER_EDGE/2) > this.myscene.getObstaclePositionX(i)+ (PLAYER_EDGE/2)))
				|| (((this.myscene.player.command == 2|| this.myscene.player.command == 3)) && 
				(this.myscene.player.getPositionX() + (PLAYER_EDGE/2) < this.myscene.getObstaclePositionX(i) - (PLAYER_EDGE/2)))
				){

					console.log("SCENDO DI LATO)");

					

					//this.myscene.player.going_down = true;
					
					this.player_on_obstacle_index = -1;
				}

			}

		}
		else{

			if(this.myscene.player.getPositionZ() - (PLAYER_EDGE/2) <= this.myscene.getObstacleFrontPositionZ(i) && 
			this.myscene.player.getPositionZ() >= this.myscene.getObstacleTailPositionZ(i)){
				
				if((this.myscene.player.getPositionX() - (PLAYER_EDGE/2) == this.myscene.getObstaclePositionX(i) + (PLAYER_EDGE/2))
					|| (this.myscene.player.getPositionX() + (PLAYER_EDGE/2) == this.myscene.getObstaclePositionX(i) - (PLAYER_EDGE/2))
					|| (this.myscene.player.getPositionX() == this.myscene.getObstaclePositionX(i))){

					if(this.myscene.player.getPositionY() > this.myscene.getObstacleTop(i) && !this.myscene.player.isOnTheSecondLevel){
						
						console.log("SALGO");

						this.myscene.player.playerBaseY = this.myscene.getObstacleTop(i);
						this.myscene.player.isOnTheSecondLevel = true;
						this.player_on_obstacle_index = i;
					}
					else{
						if(!this.myscene.player.isOnTheSecondLevel) //al secondo livello non si muore
							this.gameOver();
					}
				}
			}
		}
		
	}

	changeLevel(){

		// MAX_LEVEL is only used to know if I can accelerate obstacle
		// player can play forever and levels will change without changing velocity
		if( this.level < MAX_LEVEL){
			OBSTACLE_FIRE_RATE -= OBSTACLE_FIRE_RATE_DELTA;
			this.myscene.VELOCITY_STEP += VELOCITY_STEP_DELTA;
			
		}

		this.changeLevelAux();
	}

	scorelogic(new_points){

		this.score += new_points * SCORE_MULTIPLYER; 
		this.scoreText.innerHTML= this.score.toString();
		
		if(Math.floor(this.score / CHANGE_LEVEL) != this.level){
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
		
		if(!this.started) return;
		//console.log(this.myscene.player.command +"  "+this.myscene.player.next_command+"  "+this.myscene.player.currentPosition)
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
		else if(keyEvent.keyCode == 38 && !this.myscene.player.isOnTheSecondLevel){//up
			if(this.myscene.player.command==-1){
				this.myscene.player.command=4;
			}else if(this.myscene.player.next_command==-1){
				this.myscene.player.next_command=4;
			}
		}
		 
	}	

	changeLevelAux(){		// random chosing between normal and special level
		let x = Math.random();
		
		this.turnOffSpecial();	//need to turn off some special features that can be enabled (colors, camera rotation and other)
		
		if(x < PERC_NORMAL_LEVEL) this.changeToNormalLevel();
		else this.changeToSpecialLevel();	
	}

	changeToNormalLevel(){
			
		this.myscene.ground.changeColor(Math.random() * 0xffffff);
	}

	changeToSpecialLevel(){
		
		let x = Math.floor(Math.random() * NUM_OF_SPECIAL_LEVELS); //remember to modify NUM_OF_SPECIAL_LEVELS if you add one

		this.special_level = x;
		if (x==0) this.blackAndWhite();
		else if (x==1) this.rotationLevel();
		else if (x==2) this.flashingLights();


	}

	turnOffSpecial(){	// each unset for special feature is to be added 


		if(this.special_level == 0) this.myscene.setObstacleColor(false);
		else if(this.special_level == 1) this.myscene.camera.unsetRotation();
		else if(this.special_level == 2)this.myscene.disableFlashing();

		this.special_level = -1;
	}

	/* SPECIAL LEVELS */

	blackAndWhite(){
		this.myscene.ground.changeColor(0x000000);
		this.myscene.setObstacleColor(true);
	}

	rotationLevel(){
		this.changeToNormalLevel();  // only to change color
		this.myscene.camera.setRotation();
	}

	flashingLights(){
		this.changeToNormalLevel();
		this.myscene.enableFlashing();
	}


}
