import {BoxBufferGeometry, MeshStandardMaterial, Mesh} from "./lib/three.module.js";
import { time_scale } from "./enviroment.js";

/*
Class cube
***
var:
    player
    currentposition
*/

var playerBaseY;
const time_to_jump = 1.7;
const h_jump = 0.14;
var gravity_constant;
var velocity_to_jump;
const time_to_change_line=0.4;
const n_time_fractions = 62.8;

export class Cube {

    constructor(edge, color){
        this.edge=edge;
        var cubeGeometry = new BoxBufferGeometry(edge, edge, edge);
        var cubeMaterial = new MeshStandardMaterial( { color: color } )

        this.player = new Mesh( cubeGeometry, cubeMaterial );
        this.player.receiveShadow = true;
        this.player.castShadow=true;
        playerBaseY=edge/2;
        this.player.position.y=playerBaseY;
        this.player.position.z=0;
        this.player.position.x=0;
        this.currentPosition = 0;
        this.command=-1;
        this.next_command=-1;
        this.time=0;
        this.second_turn=false;
        this.isTranslating = 0;
        this.wantsToTranslate=false;


        gravity_constant = 8 * h_jump / Math.pow(time_to_jump,2);
        velocity_to_jump = 4 * h_jump/time_to_jump;
        console.log("g: "+gravity_constant+ "  v: "+ velocity_to_jump);
    }

    getPlayer() {return this.player}

    
    rotate(){

        /*  commands schema

              0    1
            | -> | -> |
            | <- | <- |
              2    3
        
            4 to jump
              */
        // console.log("y: "+this.player.position.y+" yBase: "+playerBaseY); 
        console.log(this.wantsToTranslate);
        if(this.isTranslating != 0){
            this.translateAux();
        }

        if(this.command==-1) return;
        let teta = ((Math.PI/n_time_fractions)/time_to_change_line)*time_scale;

        
        if(this.currentPosition==0 && this.command==1){
            if(!this.second_turn){
                this.player.rotation.z -= teta;
                let x = this.player.position.x;
                let y = this.player.position.y;
                let a = this.edge/2;
                let b = -this.edge/2+playerBaseY;
                this.player.position.x = a + (x-a)*Math.cos(-teta) - (y-b)*Math.sin(-teta);
                this.player.position.y = b + (x-a)*Math.sin(-teta) + (y-b)*Math.cos(-teta);
                
                if(this.player.rotation.z < -Math.PI/2){
                    this.player.rotation.z = -Math.PI/2;
                    this.player.position.y=playerBaseY;
                    this.player.position.x=this.edge;
                    this.second_turn=true;
                }
            }else{
                this.player.rotation.z -= teta;
                let x = this.player.position.x;
                let y = this.player.position.y;
                let a = this.edge+this.edge/2;
                let b = -this.edge/2+playerBaseY;
                this.player.position.x = a + (x-a)*Math.cos(-teta) - (y-b)*Math.sin(-teta);
                this.player.position.y = b + (x-a)*Math.sin(-teta) + (y-b)*Math.cos(-teta);
                
                if(this.player.rotation.z < -Math.PI){
                    this.player.rotation.z = -Math.PI;
                    this.player.position.y=playerBaseY;
                    this.player.position.x=2*this.edge;
                    this.currentPosition=1;
                    this.command = this.next_command;
                    this.next_command=-1;
                    this.second_turn=false;
                }
            }
        }else if(this.currentPosition == 0 && this.command==2){
            if(!this.second_turn){
                this.player.rotation.z += teta;
                let x = this.player.position.x;
                let y = this.player.position.y;
                let a = -this.edge/2;
                let b = -this.edge/2+playerBaseY;
                this.player.position.x = a + (x-a)*Math.cos(teta) - (y-b)*Math.sin(teta);
                this.player.position.y = b + (x-a)*Math.sin(teta) + (y-b)*Math.cos(teta);
                
                if(this.player.rotation.z > Math.PI/2){
                    this.player.rotation.z = Math.PI/2;
                    this.player.position.x=-this.edge;
                    this.player.position.y = playerBaseY;
                    this.second_turn=true;
                }
            }else{
                this.player.rotation.z += teta;
                let x = this.player.position.x;
                let y = this.player.position.y;
                let a = -this.edge-this.edge/2;
                let b = -this.edge/2+playerBaseY;
                this.player.position.x = a + (x-a)*Math.cos(teta) - (y-b)*Math.sin(teta);
                this.player.position.y = b + (x-a)*Math.sin(teta) + (y-b)*Math.cos(teta);
                
                if(this.player.rotation.z > Math.PI){
                    this.player.rotation.z = Math.PI;
                    this.player.position.x=-2*this.edge;
                    this.player.position.y = playerBaseY;
                    this.currentPosition=-1;
                    this.command = this.next_command;
                    this.next_command=-1;
                    this.second_turn=false;
                }
            }
        }else if(this.currentPosition == -1 && this.command==0){
            if(!this.second_turn){
                this.player.rotation.z -= teta;
                let x = this.player.position.x;
                let y = this.player.position.y;
                let a = -this.edge-this.edge/2;
                let b = -this.edge/2+playerBaseY;
                this.player.position.x = a + (x-a)*Math.cos(-teta) - (y-b)*Math.sin(-teta);
                this.player.position.y = b + (x-a)*Math.sin(-teta) + (y-b)*Math.cos(-teta);
                
                if(this.player.rotation.z < Math.PI/2){
                    this.player.rotation.z = Math.PI/2;
                    this.player.position.x= -this.edge;
                    this.player.position.y=playerBaseY;
                    this.second_turn=true;
                }
            }else{
                this.player.rotation.z -= teta;
                let x = this.player.position.x;
                let y = this.player.position.y;
                let a = -this.edge/2;
                let b = -this.edge/2+playerBaseY;
                this.player.position.x = a + (x-a)*Math.cos(-teta) - (y-b)*Math.sin(-teta);
                this.player.position.y = b + (x-a)*Math.sin(-teta) + (y-b)*Math.cos(-teta);
                
                if(this.player.rotation.z <0){
                    this.player.rotation.z = 0;
                    this.player.position.x=0
                    this.player.position.y=playerBaseY;
                    this.currentPosition = 0;
                    this.command = this.next_command;
                    this.next_command=-1;
                    this.second_turn=false;
                }
            }
        }else if(this.currentPosition == 1 && this.command==3){
            if(!this.second_turn){
                this.player.rotation.z += teta;
                let x = this.player.position.x;
                let y = this.player.position.y;
                let a = this.edge+this.edge/2;
                let b = -this.edge/2+playerBaseY;
                this.player.position.x = a + (x-a)*Math.cos(teta) - (y-b)*Math.sin(teta);
                this.player.position.y = b + (x-a)*Math.sin(teta) + (y-b)*Math.cos(teta);
                
                if(this.player.rotation.z > -Math.PI/2){
                    this.player.rotation.z = -Math.PI/2;
                    this.player.position.x= this.edge;
                    this.player.position.y=playerBaseY;
                    this.second_turn=true;
                }
            }else{
                this.player.rotation.z += teta;
                let x = this.player.position.x;
                let y = this.player.position.y;
                let a = this.edge/2;
                let b = -this.edge/2+playerBaseY;
                this.player.position.x = a + (x-a)*Math.cos(teta) - (y-b)*Math.sin(teta);
                this.player.position.y = b + (x-a)*Math.sin(teta) + (y-b)*Math.cos(teta);
                
                if(this.player.rotation.z >0){
                    this.player.rotation.z = 0;
                    this.player.position.x=0;
                    this.player.position.y=playerBaseY; 
                    this.currentPosition = 0;
                    this.command = this.next_command;
                    this.next_command=-1;
                    this.second_turn=false;
                }
            }
        }else if(this.command==4){ //salto in alto
            this.player.position.y += ((-(1/2)*gravity_constant*Math.pow(this.time+0.05,2) + velocity_to_jump*(this.time+0.05))-(-(1/2)*gravity_constant*Math.pow(this.time,2) + velocity_to_jump*this.time))/0.05;
            this.time+=0.05

            this.player.rotation.x -= (3/2*Math.PI)/(time_to_jump/0.05);
            
            
            if(this.player.position.y < playerBaseY){
                this.player.position.y=playerBaseY;
                this.player.rotation.x = 0;
                this.command = this.next_command;
                this.next_command=-1;
                
                this.time=0;
            }
        
        }

    }

    translateX(direction){

        /*
              -1    1
            | <- | -> |
            | -> | <- |
              -2    2
        */
       /*
       if(this.jumpingTranslatingIsPossible()==-1 && this.isTranslating==0){
           this.wantsToTranslate=true;
           if(direction==-1 && this.currentPosition==0)
                this.isTranslating=-1;
            else if(direction==1 && this.currentPosition==0)
                this.isTranslating=1;
            else if(direction==-1 && this.currentPosition==1)
                this.isTranslating=2;
            else if(direction==1 && this.currentPosition==-1)
                this.isTranslating=-2;
       }*/

       if(this.jumpingTranslatingIsPossible()==0){
            this.wantsToTranslate=true;
            if(this.isTranslating==0){
                if(direction==-1 && this.currentPosition==0)
                    this.isTranslating=-1;
                else if(direction==1 && this.currentPosition==0)
                    this.isTranslating=1;
                else if(direction==-1 && this.currentPosition==1)
                    this.isTranslating=2;
                else if(direction==1 && this.currentPosition==-1)
                    this.isTranslating=-2;
            }

        }
    }

    translateAux(){
        let inc = 2*((2*this.edge/n_time_fractions)/time_to_change_line)*time_scale;
        
        if(this.isTranslating==1){
            this.player.position.x += inc;
            if(this.player.position.x > 2*this.edge){
                this.player.position.x = 2*this.edge;
                this.isTranslating=0;
                this.player.rotation.z = -Math.PI;
                this.currentPosition=1;
                this.wantsToTranslate=false;
            }
        }
        else if(this.isTranslating== -1){
            this.player.position.x -= inc;
            if(this.player.position.x < -2*this.edge){
                this.player.position.x = -2*this.edge;
                this.isTranslating=0;
                this.player.rotation.z = Math.PI;
                this.currentPosition=-1;
                this.wantsToTranslate=false;
            }
        }
        else if(this.isTranslating == 2){
            this.player.position.x -= inc;
            if(this.player.position.x < 0){
                this.player.position.x = 0;
                this.isTranslating=0;
                this.player.rotation.z = 0;
                this.currentPosition = 0;
                this.wantsToTranslate=false;
            }
        }
        else if(this.isTranslating == -2){
            this.player.position.x += inc;
            if(this.player.position.x > 0){
                this.player.position.x = 0;
                this.isTranslating=0;
                this.player.rotation.z = 0;
                this.currentPosition = 0;
                this.wantsToTranslate=false;
            }
        }

    }

    jumpingTranslatingIsPossible(){
        let per = 0.40;
        let excluded_time= (time_to_jump-(time_to_jump*per))/2;
        
        if(this.time <= excluded_time){
            return -1;
        }
        else if(this.time <= time_to_jump - excluded_time){
            return 0;
        }
        else{
            return 1;
        }
    }

}