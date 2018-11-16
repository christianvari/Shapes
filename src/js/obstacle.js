import { BoxBufferGeometry, MeshStandardMaterial, Mesh} from "./lib/three.module.js";
import { PLAYER_EDGE } from "./myscene.js";

/* Class Obstacle

*/

export const LENGHT_SCALE = 30;
const DISTANCE = -50;
const MIN_DISTANCE = -150;
const BASSO = 0;
const ALTO = 1;
const CENTRO = 0;
const DESTRA = 1;
const SINISTRA = -1;


export class Obstacle {

    constructor(){
        
        this.length = Math.random()*LENGHT_SCALE;

        var geometry = new BoxBufferGeometry(PLAYER_EDGE,PLAYER_EDGE,this.length);
        var material = new MeshStandardMaterial({color : 0xfff000})

        this.center_y = PLAYER_EDGE/2;
        this.obstacle = new Mesh(geometry, material);
        this.obstacle.castShadow=true;
        this.playing = false;
        this.type = BASSO; //tipo di ostacolo 0 => BASSO, 1 => ALTO

        this.setPosition();
    }

    setPosition(){

        let scale =  Math.round(Math.random()+1);
        this.obstacle.scale.y = scale;
        this.type= scale-1;

        this.obstacle.position.y =  PLAYER_EDGE/2 * scale ;
        this.obstacle.position.z = Math.random()*DISTANCE + MIN_DISTANCE;
        this.obstacle.material.color.setHex( Math.random() * 0xffffff );

        var randval = Math.random();

        if (randval <= 0.33){
            this.obstacle.position.x = SINISTRA * 2*PLAYER_EDGE;
        }
        else if (randval > 0.33 && randval < 0.66){
            this.obstacle.position.x = CENTRO;
        }
        else{
            this.obstacle.position.x = DESTRA* 2*PLAYER_EDGE;
        }

    }

    getObstacle() {return this.obstacle}
    getPositionZ() {return this.obstacle.position.z}
    getPositionX() {return this.obstacle.position.x}
    getPositionY() {return this.obstacle.position.y}


    getTailPositionZ(){
        return this.obstacle.position.z - (this.length/2);
    }

    getFrontPositionZ(){
        return this.obstacle.position.z + (this.length/2);
    }

    getTop() {
        return this.obstacle.position.y*3 ;
    }

}