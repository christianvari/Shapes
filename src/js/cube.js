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
const time_to_jump = 1.2;
const h_jump = 0.12;
var gravity_constant;
var velocity_to_jump;



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
    
        if(this.command==-1) return;
        let scala=3*time_scale;
        let teta = 0.05*scala;

        
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
                console.log(this.player.position.x+" "+this.player.position.y+" "+this.player.rotation.z);
                if(this.player.rotation.z > -Math.PI/2){
                    this.player.rotation.z = -Math.PI/2;
                    this.player.position.x= this.edge;
                    this.player.position.y=playerBaseY;
                    this.second_turn=true;
                    console.log(this.player.position.x+" "+this.player.position.y+" "+this.player.rotation.z);
                }
            }else{
                this.player.rotation.z += teta;
                let x = this.player.position.x;
                let y = this.player.position.y;
                let a = this.edge/2;
                let b = -this.edge/2+playerBaseY;
                this.player.position.x = a + (x-a)*Math.cos(teta) - (y-b)*Math.sin(teta);
                this.player.position.y = b + (x-a)*Math.sin(teta) + (y-b)*Math.cos(teta);
                console.log(this.player.position.x+" "+this.player.position.y+" "+this.player.rotation.z);
                if(this.player.rotation.z >0){
                    this.player.rotation.z = 0;
                    this.player.position.x=0;
                    this.player.position.y=playerBaseY; 
                    this.currentPosition = 0;
                    this.command = this.next_command;
                    this.next_command=-1;
                    this.second_turn=false;
                    console.log(this.player.position.x+" "+this.player.position.y+" "+this.player.rotation.z);
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

}

//function angle_proportion_jump();