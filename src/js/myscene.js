import {Scene, HemisphereLight, DirectionalLight, Fog} from "./lib/three.module.js";
import {MyCamera} from "./mycamera.js";
import {Cube} from "./cube.js";
import {Ground} from "./ground.js";
import { Obstacle } from "./obstacle.js";

/*
Class Enviroment
***
var:
    ground
*/


export const NUM_OBSTACLES = 7;
export const PLAYER_EDGE = 1.5;
const VELOCITY_STEP = 0.5;

var playerColor = 0xffffff;
var groundWidth = 500;
var groundHeigth = 500;
var groundColor = 0x000000; 

export class MyScene {
    constructor(cameraPosition, cameraRotationX, sceneWidth, sceneHeight){
        this.scene = new Scene();
        this.camera = new MyCamera(sceneWidth, sceneHeight, cameraPosition, cameraRotationX);
        this.player = new Cube(PLAYER_EDGE, playerColor);
        this.ground = new Ground(groundWidth, groundHeigth, groundColor);
        this.scene.fog = new Fog(0xffffff, 99, 150)
        this.obstacles = [];
        this.living_obstacles = 0;
        this.generateObstacles();
        this.addObjectsToScene();
    }

    generateObstacles(){

        for(let i = 0; i< NUM_OBSTACLES; i++){
            let o = new Obstacle();
            this.obstacles.push(o);
            this.scene.add(o.obstacle);
        }

    }

    startObstacle(){
        let index = this.obstacles.findIndex( 
            function findPlaying(element){
                return !element.playing;
            }
        );

        this.obstacles[index].playing = true;
        this.living_obstacles+=1;
    }

    addObjectsToScene(){
        this.scene.add(this.player.getPlayer());
        this.scene.add(this.ground.ground);
        this.addLight();
    }

    addLight(){
        let hemisphereLight = new HemisphereLight(0xfffafa,0x000000, .9);
        let sun = new DirectionalLight( 0xcdc1c5, 0.9);
        sun.position.set( 12,6,7 );
        sun.castShadow = true;
    
        //Set up shadow properties for the sun light
        sun.shadow.mapSize.width = 256;
        sun.shadow.mapSize.height = 256;
        sun.shadow.camera.near = 0.5;
        sun.shadow.camera.far = 50 ;

        this.scene.add(sun);
        this.scene.add(hemisphereLight);
    }

    getScene(){return this.scene}

    obstacleMovement(i){

        let o = this.obstacles[i];
        
        if(!o.playing) return;
        else if (o.getObstacle().position.z > 10){
            o.playing=false;
            this.living_obstacles-=1;
            o.setPosition();
        }
        else {
            o.getObstacle().position.z += VELOCITY_STEP;
        }
    }
}