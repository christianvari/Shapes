import {Scene, HemisphereLight, DirectionalLight, Fog} from "./lib/three.module.js";
import {MyCamera} from "./mycamera.js";
import {Cube} from "./cube.js";
import {Ground} from "./ground.js";
import { Obstacle, LENGHT_SCALE } from "./obstacle.js";
import {History} from "./history.js";

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
const DESTROY_OBSTACLE_Z_POSITION = CAMERA_POSITION[2] + LENGHT_SCALE;
const MAX_LIGHT_INTENSITY = 0.9;
const TIME_STEP = 0.05;

var playerColor = 0xffffff;
var groundWidth = 500;
var groundHeigth = 500;
var groundColor = 0x000000; 



export class MyScene {
    constructor(sceneWidth, sceneHeight){
        
        this.scene = new Scene();
        this.camera = new MyCamera(sceneWidth, sceneHeight, CAMERA_POSITION, CAMERA_ROTATION_X);
        this.player = new Cube(PLAYER_EDGE, playerColor);
        this.ground = new Ground(groundWidth, groundHeigth, groundColor);
        this.scene.fog = new Fog(0xffffff, 99, 150)
        this.history = new History();
        this.obstacles = [];
        this.living_obstacles = 0;
        this.VELOCITY_STEP = 0.5;
        this.generateObstacles();
        
        this.hemisphereLight = new HemisphereLight(0xffffff,0x000000, MAX_LIGHT_INTENSITY);
        this.sun = new DirectionalLight( 0xffffff, MAX_LIGHT_INTENSITY);
        this.time = 0;
        this.isFlashing = false;

        this.addObjectsToScene();
    }

    generateObstacles(){

        for(let i = 0; i< NUM_OBSTACLES; i++){
            let o = new Obstacle(this.history);
            this.obstacles.push(o);
            this.scene.add(o.obstacle);
            this.history.getObstacleList().addToTail(o);
        }

    }

    startObstacle(){
        let x = this.history.getObstacleList().removeHead();
        let index = this.obstacles.findIndex( 
            function findPlaying(element){
                //console.log("first: "+x+" elem: "+element);
                return x == element;
            }
        );
        this.obstacles[index].setPosition(this.history);
        this.obstacles[index].playing = true;
        this.living_obstacles+=1;
    }

    addObjectsToScene(){
        this.scene.add(this.player.getPlayer());
        this.scene.add(this.ground.ground);
        this.scene.add(this.ground.rightSide);
        this.scene.add(this.ground.leftSide);
        this.addLight();
    }

    addLight(){
        
        this.sun.position.set( 12,6,7 );
        this.sun.castShadow = true;
    
        //Set up shadow properties for the sun light
        this.sun.shadow.mapSize.width = 256;
        this.sun.shadow.mapSize.height = 256;
        this.sun.shadow.camera.near = 0.5;
        this.sun.shadow.camera.far = 50 ;
        
        this.scene.add(this.sun);
        this.scene.add(this.hemisphereLight);
    }

    getScene(){return this.scene}

    obstacleMovement(i){

        let o = this.obstacles[i];
        if(!o.playing) return 0;

        else if (o.getPositionZ() > DESTROY_OBSTACLE_Z_POSITION) {
            o.playing=false;
            this.living_obstacles-=1;
            //console.log(this.history.getLastCenterPositionZ());
            this.history.getObstacleList().addToTail(o);
            return 1;
        }
        else {
            o.getObstacle().position.z += this.VELOCITY_STEP;
            return 0;
        }
    }

    getObstacleTailPositionZ(i){
            return this.obstacles[i].getTailPositionZ();
    }
    getObstacleFrontPositionZ(i){
        return this.obstacles[i].getFrontPositionZ();
    }

    getObstaclePositionZ(i){
        return this.obstacles[i].getPositionZ();
    }

    getObstaclePositionX(i){
        return this.obstacles[i].getPositionX();
    }

    getObstaclePositionY(i){
        return this.obstacles[i].getPositionY();
    }

    getObstacleTop(i){
        return this.obstacles[i].getTop();
    }

    flashLight(){
        if(!this.isFlashing && this.sun.intensity==MAX_LIGHT_INTENSITY) return;
        if(!this.isFlashing) {
            this.sun.intensity = MAX_LIGHT_INTENSITY; 
            this.hemisphereLight.intensity = MAX_LIGHT_INTENSITY; 
            this.time = 0; 
            return;
        }

        this.sun.intensity = (MAX_LIGHT_INTENSITY/2 * Math.cos(this.time)) + MAX_LIGHT_INTENSITY/2;
        this.hemisphereLight.intensity = (MAX_LIGHT_INTENSITY/2 * Math.cos(this.time)) + MAX_LIGHT_INTENSITY/2;

        this.time += TIME_STEP;
    }

    enableFlashing(){
        this.isFlashing = true;
    }

    disableFlashing(){
        this.isFlashing = false;
    }


}