import { BoxBufferGeometry, MeshStandardMaterial, Mesh} from "./lib/three.module.js";
import { PLAYER_EDGE } from "./myscene.js";
import { History } from "./history.js";
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
const OBSTACLES_DIST = 30;


export class Obstacle {

    constructor(history){
        
        this.length = Math.random()*LENGHT_SCALE;

        var geometry = new BoxBufferGeometry(PLAYER_EDGE,PLAYER_EDGE,this.length);
        var material = new MeshStandardMaterial({color : 0xfff000})

        this.center_y = PLAYER_EDGE/2;
        this.obstacle = new Mesh(geometry, material);
        this.obstacle.castShadow=true;
        this.playing = false;
        this.type = BASSO; //tipo di ostacolo 0 => BASSO, 1 => ALTO

        this.obstacle.receiveShadow = true;
        this.setPosition(history);
    }

    setPosition(history){

        //console.log("setting position");
        let scale =  Math.round(Math.random()+1);
        this.obstacle.scale.y = scale;
        this.type= scale-1;

        this.obstacle.position.y =  PLAYER_EDGE/2 * scale ;
        

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


        // get len last obstacle and check if I can spawn in calculated position
        
        if(this.getPositionX() == DESTRA*2*PLAYER_EDGE){
            if(history.last_generated_obstacle_right==null){
                this.obstacle.position.z = Math.random()*DISTANCE + MIN_DISTANCE;               //TODO: add "history.""
                history.last_generated_obstacle_right = this;
            }
            else{      
                let distZ = Math.random()*DISTANCE + MIN_DISTANCE + this.length/2;
                let lastLen = history.getLastRightPositionZ();
                if((Math.abs(distZ+this.length - lastLen) <= OBSTACLES_DIST && lastLen < distZ) || lastLen < distZ){  //gap between obstacle_dist and 2 * obstacle_dist
                    this.obstacle.position.z = lastLen - OBSTACLES_DIST - this.length/2 - Math.random()*OBSTACLES_DIST;    
                }
                else{
                    this.obstacle.position.z = distZ;
                }
                history.last_generated_obstacle_right = this;
            }
        }else if(this.getPositionX() == SINISTRA*2*PLAYER_EDGE){
            if(history.last_generated_obstacle_left==null){
                this.obstacle.position.z = Math.random()*DISTANCE + MIN_DISTANCE;
                history.last_generated_obstacle_left = this;
            }
            else{      
                let distZ = Math.random()*DISTANCE + MIN_DISTANCE + this.length/2;
                let lastLen = history.getLastLeftPositionZ();

                if((Math.abs(distZ+this.length - lastLen) <= OBSTACLES_DIST && lastLen < distZ) || lastLen < distZ){  //gap between obstacle_dist and 2 * obstacle_dist
                    this.obstacle.position.z = lastLen - OBSTACLES_DIST -this.length/2 - Math.random()*OBSTACLES_DIST;    
                }
                else{
                    this.obstacle.position.z = distZ;
                }
                history.last_generated_obstacle_left = this;
            }
        }else{
            if(history.last_generated_obstacle_center==null){
                this.obstacle.position.z = Math.random()*DISTANCE + MIN_DISTANCE;
                history.last_generated_obstacle_center = this;
            }
            else{      
                let distZ = Math.random()*DISTANCE + MIN_DISTANCE + this.length/2;
                let lastLen = history.getLastCenterPositionZ();
                
                if((Math.abs(distZ+this.length - lastLen) <= OBSTACLES_DIST && lastLen < distZ) || lastLen < distZ){  //gap between obstacle_dist and 2 * obstacle_dist
                    this.obstacle.position.z = lastLen - OBSTACLES_DIST - (this.length/2) - Math.random()*OBSTACLES_DIST;    
                }
                else{
                    this.obstacle.position.z = distZ;
                }
                history.last_generated_obstacle_center = this;
            }
        }

        //history.getObstacleList().addToTail(this);

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