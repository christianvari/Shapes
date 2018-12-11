import { BoxBufferGeometry, MeshStandardMaterial, Mesh} from "./lib/three.module.js";
import { PLAYER_EDGE } from "./myscene.js";

/* Class Obstacle

*/

export const LENGHT_SCALE = 30;
const DISTANCE = 50;
const MIN_DISTANCE = 150;
export const BASSO = 0;
export const ALTO = 1;
const CENTRO = 0;
const DESTRA = 1;
const SINISTRA = -1;
const MIN_INTERCEPTION_SPACE=4;
const MIN_LENGTH = 10;
const MIN_GAP = 2;


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
        this.interceptions = 0;

        this.obstacle.receiveShadow = true;
        this.setPosition(last_tail_position);
        
    }

    setPosition(last_tail_position_z, last_lane,  obstacles){

        //console.log("setting position");

        this.setObstacleColor(this.black_and_white);

        this.chose_lane(last_lane);
        //this.setObstacleColor(false);

        //NO COLLISION ON THE SAME LANE
        if(last_tail_position_z[this.lane] == null  || 
        (last_tail_position_z[this.lane].getTailPositionZ() >  -1* (MIN_DISTANCE + MIN_LENGTH))){

            this.obstacle.position.z = -1 * Math.random() * DISTANCE - MIN_DISTANCE - this.length;
        }
        else{
            this.obstacle.position.z = (-1 * Math.random() * DISTANCE) + last_tail_position_z[this.lane].getTailPositionZ() - this.length - MIN_GAP ;
        }

        //NO ALL TALL OBSTACLE IN LINE
        this.interceptions = 0;
        if(obstacles != undefined){
                
            for (let i=0; i<obstacles.length; i+=1){
                if(this.intercept(obstacles[i])){
                    obstacles[i].interceptions += 1+ this.interceptions;
                    this.interceptions +=  obstacles[i].interceptions;
                    
                    //obstacles[i].setObstacleColor(false);
                    //this.setObstacleColor(false);
                }
            }
            if(this.interceptions <2){
                let scale =  Math.round(Math.random()+1);
                this.obstacle.scale.y = scale;
                this.type= scale-1;
                this.obstacle.position.y = PLAYER_EDGE/2 * scale;
            }else{
                this.obstacle.scale.y = 1;
                this.type = BASSO;
                this.obstacle.position.y = PLAYER_EDGE/2;
                //console.log(".");
                //console.log("---------CORREGGO----------")
                //this.obstacle.material.color.setHex(0x000000);
            
            }
        }
        else{
            let scale =  Math.round(Math.random()+1);
            this.obstacle.scale.y = scale;
            this.type= scale-1;
            this.obstacle.position.y = PLAYER_EDGE/2 * scale;
        }

        //this.setObstacleColor(false);

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
                /*if(this.interceptions==0)*/ this.obstacle.material.color.setHex(Math.random() * 0xffffff); 
                //else if(this.interceptions==1) this.obstacle.material.color.setHex(0xff0000);
                //else if(this.interceptions==2) this.obstacle.material.color.setHex(0x00ff00);
            }
    }

    setBlackAndWhite(bool){
        this.black_and_white = bool;
    }

    getLane(){
        return this.lane;
    }

    intercept(obstacle){
        //console.log(this.getFrontPositionZ()+"  "+this.getTailPositionZ()+"  "+obstacle.getFrontPositionZ()+"  "+obstacle.getTailPositionZ());
        if(obstacle.playing && this.getFrontPositionZ() < obstacle.getFrontPositionZ()+MIN_INTERCEPTION_SPACE && this.getFrontPositionZ() > obstacle.getTailPositionZ()-MIN_INTERCEPTION_SPACE && obstacle.type==ALTO){
            return true;
        }else if(obstacle.playing && this.getTailPositionZ() < obstacle.getFrontPositionZ()+MIN_INTERCEPTION_SPACE && this.getTailPositionZ()>obstacle.getTailPositionZ()-MIN_INTERCEPTION_SPACE && obstacle.type==ALTO){
            return true;
        }

        return false;
    }

    chose_lane(lane){
        var randval = Math.random();

        if(lane==null){
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
        }else if(lane==0){
            if (randval <= 0.1){
                this.lane = 0;
                this.obstacle.position.x = SINISTRA * 2*PLAYER_EDGE;
            }
            else if (randval > 0.1 && randval < 0.55){
                this.lane = 1;
                this.obstacle.position.x = CENTRO;
            }
            else{
                this.lane = 2;
                this.obstacle.position.x = DESTRA* 2*PLAYER_EDGE;
            }
        }else if(lane==1){
            if (randval <= 0.45){
                this.lane = 0;
                this.obstacle.position.x = SINISTRA * 2*PLAYER_EDGE;
            }
            else if (randval > 0.45 && randval < 0.55){
                this.lane = 1;
                this.obstacle.position.x = CENTRO;
            }
            else{
                this.lane = 2;
                this.obstacle.position.x = DESTRA* 2*PLAYER_EDGE;
            }
        }else if(lane==2){
            if (randval <= 0.45){
                this.lane = 0;
                this.obstacle.position.x = SINISTRA * 2*PLAYER_EDGE;
            }
            else if (randval > 0.45 && randval < 0.9){
                this.lane = 1;
                this.obstacle.position.x = CENTRO;
            }
            else{
                this.lane = 2;
                this.obstacle.position.x = DESTRA* 2*PLAYER_EDGE;
            }
        }
    }
}