import {Scene, HemisphereLight, DirectionalLight, Fog, Clock} from "../lib/three.module.js";
import {MyCamera} from "../mycamera.js";
import {Ground} from "./groundcredits.js";
import { ObstacleCredits} from "./obstacleCredits.js";

/*
Class Enviroment
***
var:
    ground
*/


export const NUM_OBSTACLES = 10;
export const PLAYER_EDGE = 1.5;


const CAMERA_POSITION = [0,5,8];
const CAMERA_ROTATION_X = -20;
const DESTROY_OBSTACLE_Z_POSITION = 10;
const MAX_LIGHT_INTENSITY = 0.9;
const TIME_STEP = 1;
const TIME_STOPPED = 140;
const STOP_POSITION = -6;

var groundWidth = 500;
var groundHeigth = 500;
var groundColor = 0x000000; 



export class MySceneCredits {
    constructor(sceneWidth, sceneHeight){
        
        this.notFinished = true;
        this.scene = new Scene();
        this.camera = new MyCamera(sceneWidth, sceneHeight, CAMERA_POSITION, CAMERA_ROTATION_X);
        this.ground = new Ground(groundWidth, groundHeigth, groundColor);
        this.scene.fog = new Fog(0xffffff, 50, 140)
        this.firstObstacle;
        this.secondObstacle;
        this.thirdObstacle;
        this.thanksObstacle;
        this.firstText;
        this.living_obstacles = 0;
        this.VELOCITY_STEP = 0.5;
        this.hemisphereLight = new HemisphereLight(0xffffff,0x000000, MAX_LIGHT_INTENSITY);
        this.sun = new DirectionalLight( 0xffffff, MAX_LIGHT_INTENSITY);
        this.scenetime = 0;
        
        this.clock = new Clock();

        this.walkingThings = [];

        this.generateSituation();
        this.addObjectsToScene();
    }

    generateSituation(){


        if (this.scenetime == 0){
            this.firstObstacle = new ObstacleCredits(1);
            this.scene.add(this.firstObstacle.obstacle);
            let a = this.walkingThings.push(this.firstObstacle);
            
            this.firstText = new ObstacleCredits(3);
            this.scene.add(this.firstText.obstacle);
            this.walkingThings.push(this.firstText);
        
        }
        if (this.scenetime == 250){
            this.secondObstacle = new ObstacleCredits(2);
            this.scene.add(this.secondObstacle.obstacle);
            this.walkingThings.push(this.secondObstacle);

            this.secondText = new ObstacleCredits(4);
            this.scene.add(this.secondText.obstacle);
            this.walkingThings.push(this.secondText);
        }
        if(this.scenetime == 500){
            this.thirdText = new ObstacleCredits(5);
            this.scene.add(this.thirdText.obstacle);
            this.walkingThings.push(this.thirdText);
        }
        if(this.scenetime == 750){
            this.thanksObstacle = new ObstacleCredits(6);
            this.scene.add(this.thanksObstacle.obstacle);
            this.walkingThings.push(this.thanksObstacle);
        }
        if(this.scenetime == 1150){
            this.notFinished = false;
            document.onkeydown = this.handleKeyDown.bind(this);
            
        }

    }


    handleKeyDown(keyEvent){
		if(keyEvent.keyCode == 32){  //this is UP (check space code)
			window.location.replace("game.php");
		}
	}
    

    addObjectsToScene(){
        this.scene.add(this.ground.ground);
        this.scene.add(this.ground.rightSide);
        this.scene.add(this.ground.leftSide);
        this.addLight();
    }

    addLight(){
        
        this.sun.position.set( 12,6,7 );

        if(document.location.pathname == "/desktop/credits.php"){
            this.sun.castShadow = true;
        
            //Set up shadow properties for the sun light
            this.sun.shadow.mapSize.width = 256;
            this.sun.shadow.mapSize.height = 256;
            this.sun.shadow.camera.near = 0.5;
            this.sun.shadow.camera.far = 50 ;
        }
        
        this.scene.add(this.sun);
        this.scene.add(this.hemisphereLight);
    }

    getScene(){return this.scene}


    getNextMovement(){

        //console.log("getNextMovement")
        //for update position
        for(let i=0; i<this.walkingThings.length; i++){
            //console.log(this.walkingThings[i])
            this.walk(this.walkingThings[i]);
            //console.log("in primo ciclo " + i)
        }

        //for update time
        for(let i=0; i<this.walkingThings.length; i++){
            if(this.walkingThings[i].stopped){
                this.walkingThings[i].time += 1;
            }
        }
        this.scenetime += 1;
        //console.log(this.scenetime);
        this.generateSituation();
    }

    walk(o){
        //console.log("walk")
        //console.log(o.stopped +" "+o.positionZ)
        if (!o.stopped && o.positionZ < STOP_POSITION){
            //console.log("dentro")
            o.addStep(TIME_STEP);
        }
        else if(!o.stopped && o.positionZ >= STOP_POSITION){
            o.setPositionZ(STOP_POSITION);
            o.stopped = true;
        }
        else if(o.stopped && o.time<TIME_STOPPED){

        }
        else if(o.stopped && o.time > TIME_STOPPED){
            o.addStep(TIME_STEP);
            if(o.positionZ > DESTROY_OBSTACLE_Z_POSITION){
                this.walkingThings.splice(this.walkingThings.indexOf(o),1);
            }
        }

    }
}