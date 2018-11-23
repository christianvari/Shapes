import { BoxBufferGeometry, MeshStandardMaterial, Mesh} from "./lib/three.module.js";
import { PLAYER_EDGE } from "./myscene.js";

/* Class Obstacle

*/

export const LENGHT_SCALE = 30;
const DISTANCE = 50;
const MIN_DISTANCE = 150;
const BASSO = 0;
const ALTO = 1;
const CENTRO = 0;
const DESTRA = 1;
const SINISTRA = -1;

const MIN_LENGTH = 10;


export class Obstacle {

    constructor(last_tail_position){
        
        this.length = Math.random()*LENGHT_SCALE + MIN_LENGTH;

        var geometry = new BoxBufferGeometry(PLAYER_EDGE,PLAYER_EDGE,this.length);
        var material = new MeshStandardMaterial();

        this.center_y = PLAYER_EDGE/2;
        this.obstacle = new Mesh(geometry, material);
        this.obstacle.castShadow=true;
        this.playing = false;
        this.type = BASSO; //tipo di ostacolo 0 => BASSO, 1 => ALTO
        this.lane;
        this.black_and_white = false;

        this.obstacle.receiveShadow = true;
        this.setPosition(last_tail_position);
        
    }

    setPosition(last_tail_position_z){

        //console.log("setting position");

        this.setObstacleColor(this.black_and_white);

        var randval = Math.random();

        if (randval <= 0.33){
            this.lane = 0;
            this.obstacle.position.x = SINISTRA * 2*PLAYER_EDGE;
        }
        else if (randval > 0.33 && randval < 0.66){
            this.lane = 1;
            this.obstacle.position.x = CENTRO;
        }
        else{
            this.lane = 2;
            this.obstacle.position.x = DESTRA* 2*PLAYER_EDGE;
        }


        //NO ALL TALL OBSTACLE IN LINE
        if(last_tail_position_z[(this.lane + 1) % 3] !=null
            && last_tail_position_z[(this.lane + 2) % 3] != null
            && last_tail_position_z[(this.lane + 1) % 3].type == ALTO 
            &&  last_tail_position_z[(this.lane + 2) % 3].type == ALTO ){
                this.type = BASSO;
        }
        else{
            let scale =  Math.round(Math.random()+1);
            this.obstacle.scale.y = scale;
            this.type= scale-1;
            this.obstacle.position.y = PLAYER_EDGE/2 * scale;

        }

        //NO COLLISION ON THE SAME LANE
        
        if(last_tail_position_z[this.lane] == null  || 
        (last_tail_position_z[this.lane].getTailPositionZ() >  -1* (MIN_DISTANCE + MIN_LENGTH))){

            this.obstacle.position.z = -1 * Math.random() * DISTANCE - MIN_DISTANCE - this.length;
        }
        else{
            this.obstacle.position.z = (-1 * Math.random() * DISTANCE) + last_tail_position_z[this.lane].getTailPositionZ() - this.length;
        }

        this.setObstacleColor(false);

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


    setObstacleColor(bianconero){
            if(bianconero){
                this.obstacle.material.color.setHex(0xffffff); 
            }
            else{
                this.obstacle.material.color.setHex(Math.random() * 0xffffff); 
            }
    }

    setBlackAndWhite(bool){
        this.black_and_white = bool;
    }

    getLane(){
        return this.lane;
    }
}