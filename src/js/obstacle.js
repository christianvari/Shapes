import { BoxBufferGeometry, MeshStandardMaterial, Mesh} from "./lib/three.module.js";
import {PLAYER_EDGE} from "./myscene.js"

/* Class Obstacle

*/

const LENGHT_SCALE = 20;
const DISTANCE = -50;
const MIN_DISTANCE = -150;
const POSITION_ON_GROUND = 1;


export class Obstacle {

    constructor(){
        var geometry = new BoxBufferGeometry(PLAYER_EDGE,PLAYER_EDGE,Math.random()*LENGHT_SCALE);
        var material = new MeshStandardMaterial({color : 0xfff000});


        this.obstacle = new Mesh(geometry, material);
        this.setPosition();
        this.obstacle.castShadow=true;
        this.playing = false;
    }

    setPosition(){

        this.obstacle.position.y = POSITION_ON_GROUND;
        this.obstacle.position.z = (Math.random())*DISTANCE + MIN_DISTANCE;
        this.obstacle.material.color.setHex( Math.random() * 0xffffff );

        var randval = Math.random();

        if (randval <= 0.33){
            this.obstacle.position.x = -1 * 2*PLAYER_EDGE;
        }
        else if (randval > 0.33 && randval < 0.66){
            this.obstacle.position.x = 0;
        }
        else{
            this.obstacle.position.x =2* PLAYER_EDGE;
        }

    }

    getObstacle() {return this.obstacle};

}