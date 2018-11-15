import {Scene, HemisphereLight, DirectionalLight, Fog} from "./lib/three.module.js";
import {MyCamera} from "./mycamera.js";
import {Cube} from "./cube.js";
import {Ground} from "./ground.js";
import { Obstacle, LENGHT_SCALE } from "./obstacle.js";

/*
Class Enviroment
***
var:
    ground
*/


export const NUM_OBSTACLES = 7;
export const PLAYER_EDGE = 1.5;

const VELOCITY_STEP = 0.5;
const CAMERA_POSITION = [0,4,8];
const CAMERA_ROTATION_X = -20;
const DESTROY_OBSTACLE_Z_POSITION = CAMERA_POSITION[2] + LENGHT_SCALE;


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
        if(!o.playing) return 0;

        else if (o.getObstacle().position.z > DESTROY_OBSTACLE_Z_POSITION) {
            o.playing=false;
            this.living_obstacles-=1;
            o.setPosition();
            return 1;
        }
        else {
            o.getObstacle().position.z += VELOCITY_STEP;
            return 0;
        }
    }
}