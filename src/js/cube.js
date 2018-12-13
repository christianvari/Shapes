import {BoxBufferGeometry, MeshStandardMaterial, Mesh} from "./lib/three.module.js";
import { time_scale } from "./enviroment.js";
import { PLAYER_EDGE } from "./myscene.js";

/*
Class cube
***
var:
    player
    currentposition
*/

const time_to_jump = 1.5;
const h_jump = 0.14;
var gravity_constant;
var velocity_to_jump;
const time_to_change_line=0.3;
const n_time_fractions = 62.8;
const GO_DOWN_STEP = 0.1;

export class Cube {

    constructor(edge, color){
        this.edge=edge;
        var cubeGeometry = new BoxBufferGeometry(edge, edge, edge);
        var cubeMaterial = new MeshStandardMaterial( { color: color } )

        this.player = new Mesh( cubeGeometry, cubeMaterial );
        if(document.location.pathname == "/desktop/game.php"){
            this.player.receiveShadow = true;
            this.player.castShadow=true;
        }
        this.playerBaseY=edge/2;
        this.player.position.y=this.playerBaseY;
        this.player.position.z=0;
        this.player.position.x=0;
        this.currentPosition = 0;
        this.command=-1;
        this.next_command=-1;
        this.time=0;
        this.second_turn=false;
        this.isTranslating = 0;
        this.wantsToTranslate=false;
        this.isOnTheSecondLevel = false;

        this.going_down = false;


        gravity_constant = 8 * h_jump / Math.pow(time_to_jump,2);
        velocity_to_jump = 4 * h_jump/time_to_jump;
    }

    getPlayer() {return this.player}

    getPositionX(){return this.player.position.x}
    getPositionY(){return this.player.position.y}
    getPositionZ(){return this.player.position.z}

    getBottomPositionY(){
        return this.player.position.y - (PLAYER_EDGE/2);
    }

    goDown(){

        if(this.going_down){
            //console.log("goDown");
            if(this.getBottomPositionY() < this.edge/2){
                this.playerBaseY = this.edge/2;
                this.player.position.y = this.playerBaseY;
                this.going_down = false;
                this.translateCommand();
            }
            else{
                this.player.position.y -= GO_DOWN_STEP * time_scale;
                // this.isOnTheSecondLevel = false;  da riverede per scendere quando in pizzo in pizzo all'ostacolo
            }
        }
    }
    
    rotate(){

        /*  commands schema

              0    1
            | -> | -> |
            | <- | <- |
              2    3
        
            4 to jump
              */
        // console.log("y: "+this.player.position.y+" yBase: "+playerBaseY); 
        if(this.isTranslating != 0){
            this.translateAux();
        }

        
        if(this.command==-1) return;
        
        let teta = 3/2 * ((Math.PI/n_time_fractions)/time_to_change_line)*time_scale;
        
        if(this.currentPosition==0 && this.command==1 && this.isOnTheSecondLevel){
            //console.log("COMMAND 1 UP");
            if(!this.second_turn){
                
                this.player.rotation.z -= teta;
                let x = this.player.position.x;
                let y = this.player.position.y;
                let a = this.edge/2;
                let b = this.edge;
                this.player.position.x = a + (x-a)*Math.cos(-teta) - (y-b)*Math.sin(-teta);
                this.player.position.y = b + (x-a)*Math.sin(-teta) + (y-b)*Math.cos(-teta);
                
                if(this.player.rotation.z < -Math.PI){
                    this.player.rotation.z = -Math.PI/2;
                    this.player.position.y= this.edge/2;
                    this.player.position.x= this.edge;
                    this.second_turn=true;
                    
                }
            }else{
                //console.log("second turn: "+this.player.rotation.z)
                this.player.rotation.z -= teta;
                let x = this.player.position.x;
                let y = this.player.position.y;
                let a = 3*this.edge/2;            //check center and continue
                let b = 0;
                this.player.position.x = a + (x-a)*Math.cos(-teta) - (y-b)*Math.sin(-teta);
                this.player.position.y = b + (x-a)*Math.sin(-teta) + (y-b)*Math.cos(-teta);
                
                if(this.player.rotation.z < -Math.PI){
                    
                    this.player.rotation.z = -Math.PI;
                    this.player.position.y=this.edge/2;
                    this.player.position.x=2*this.edge;
                    this.second_turn=false;
                    this.isOnTheSecondLevel = false;
                    this.currentPosition=1;
                    this.command = this.next_command;
                    this.next_command=-1;
                    this.isOnTheSecondLevel = false;
                    this.playerBaseY = this.edge/2;
                    
                }
            }
            
            return;
        }else if(this.currentPosition == 0 && this.command==2 && this.isOnTheSecondLevel){
            //console.log("COMMAND 2 UP");
            if(!this.second_turn){
                
                this.player.rotation.z += teta;
                let x = this.player.position.x;
                let y = this.player.position.y;
                let a = -this.edge/2;
                let b = this.edge;
                this.player.position.x = a + (x-a)*Math.cos(teta) - (y-b)*Math.sin(teta);
                this.player.position.y = b + (x-a)*Math.sin(teta) + (y-b)*Math.cos(teta);
                
                if(this.player.rotation.z > Math.PI){
                    this.player.rotation.z = Math.PI/2;
                    this.player.position.y= this.edge/2;
                    this.player.position.x= -this.edge;
                    this.second_turn=true;
                    
                }
            }else{
                
                this.player.rotation.z += teta;
                let x = this.player.position.x;
                let y = this.player.position.y;
                let a = -3*this.edge/2;            //check center and continue
                let b = 0;
                this.player.position.x = a + (x-a)*Math.cos(teta) - (y-b)*Math.sin(teta);
                this.player.position.y = b + (x-a)*Math.sin(teta) + (y-b)*Math.cos(teta);
                
                if(this.player.rotation.z > Math.PI){
                    
                    this.player.rotation.z = Math.PI;
                    this.player.position.y=this.edge/2;
                    this.player.position.x=-2*this.edge;
                    this.second_turn=false;
                    this.isOnTheSecondLevel = false;
                    this.currentPosition=-1;
                    this.command = this.next_command;
                    this.next_command=-1;
                    this.isOnTheSecondLevel = false;
                    this.playerBaseY = this.edge/2;
                    
                }
            }
            
            return;
        }else if(this.currentPosition == -1 && this.command==0 && this.isOnTheSecondLevel){
            //console.log("COMMAND 0 UP");
            if(!this.second_turn){
                
                this.player.rotation.z -= teta;
                let x = this.player.position.x;
                let y = this.player.position.y;
                let a = -3*this.edge/2;
                let b = this.edge;
                this.player.position.x = a + (x-a)*Math.cos(-teta) - (y-b)*Math.sin(-teta);
                this.player.position.y = b + (x-a)*Math.sin(-teta) + (y-b)*Math.cos(-teta);
                
                if(this.player.rotation.z < 0){
                    this.player.rotation.z = Math.PI/2;
                    this.player.position.y= this.edge/2;
                    this.player.position.x= -this.edge;
                    this.second_turn=true;
                    
                }
            }else{
                
                this.player.rotation.z -= teta;
                let x = this.player.position.x;
                let y = this.player.position.y;
                let a = -this.edge/2;            //check center and continue
                let b = 0;
                this.player.position.x = a + (x-a)*Math.cos(-teta) - (y-b)*Math.sin(-teta);
                this.player.position.y = b + (x-a)*Math.sin(-teta) + (y-b)*Math.cos(-teta);
                
                if(this.player.rotation.z < 0){
                    
                    this.player.rotation.z = 0;
                    this.player.position.y=this.edge/2;
                    this.player.position.x=0;
                    this.second_turn=false;
                    this.isOnTheSecondLevel = false;
                    this.currentPosition=0;
                    this.command = this.next_command;
                    this.next_command=-1;
                    this.isOnTheSecondLevel = false;
                    this.playerBaseY = this.edge/2;
                    
                }
            }
            
            return;
        }else if(this.currentPosition == 1 && this.command==3 && this.isOnTheSecondLevel){
            //console.log("COMMAND 3 UP");
            if(!this.second_turn){
                
                this.player.rotation.z += teta;
                let x = this.player.position.x;
                let y = this.player.position.y;
                let a = 3*this.edge/2;
                let b = this.edge;
                this.player.position.x = a + (x-a)*Math.cos(teta) - (y-b)*Math.sin(teta);
                this.player.position.y = b + (x-a)*Math.sin(teta) + (y-b)*Math.cos(teta);
                
                if(this.player.rotation.z >0 ){
                    this.player.rotation.z = -Math.PI/2;
                    this.player.position.y= this.edge/2;
                    this.player.position.x= this.edge;
                    this.second_turn=true;
                    
                }
            }else{
                
                this.player.rotation.z += teta;
                let x = this.player.position.x;
                let y = this.player.position.y;
                let a = this.edge/2;            //check center and continue
                let b = 0;
                this.player.position.x = a + (x-a)*Math.cos(teta) - (y-b)*Math.sin(teta);
                this.player.position.y = b + (x-a)*Math.sin(teta) + (y-b)*Math.cos(teta);
                
                if(this.player.rotation.z >0){
                    
                    this.player.rotation.z = 0;
                    this.player.position.y = this.edge/2;
                    this.player.position.x = 0;
                    this.second_turn=false;
                    this.isOnTheSecondLevel = false;
                    this.currentPosition=0;
                    this.command = this.next_command;
                    this.next_command=-1;
                    this.isOnTheSecondLevel = false;
                    this.playerBaseY = this.edge/2;
                    
                }
            }
            
            return;
        }
        
        
        teta = ((Math.PI/n_time_fractions)/time_to_change_line)*time_scale;

        

        if(this.currentPosition==0 && this.command==1){
            //console.log("COMMAND: 1");
            if(!this.second_turn){
                this.player.rotation.z -= teta;
                let x = this.player.position.x;
                let y = this.player.position.y;
                let a = this.edge/2;
                let b = -this.edge/2+this.playerBaseY;
                this.player.position.x = a + (x-a)*Math.cos(-teta) - (y-b)*Math.sin(-teta);
                this.player.position.y = b + (x-a)*Math.sin(-teta) + (y-b)*Math.cos(-teta);
                
                if(this.player.rotation.z < -Math.PI/2){
                    this.player.rotation.z = -Math.PI/2;
                    this.player.position.y=this.playerBaseY;
                    this.player.position.x=this.edge;
                    this.second_turn=true;
                }
            }else{
                this.player.rotation.z -= teta;
                let x = this.player.position.x;
                let y = this.player.position.y;
                let a = this.edge+this.edge/2;
                let b = -this.edge/2+this.playerBaseY;
                this.player.position.x = a + (x-a)*Math.cos(-teta) - (y-b)*Math.sin(-teta);
                this.player.position.y = b + (x-a)*Math.sin(-teta) + (y-b)*Math.cos(-teta);
                
                if(this.player.rotation.z < -Math.PI){
                    this.player.rotation.z = -Math.PI;
                    this.player.position.y=this.playerBaseY;
                    this.player.position.x=2*this.edge;
                    this.currentPosition=1;
                    this.command = this.next_command;
                    this.next_command=-1;
                    this.second_turn=false;
                }
            }
        }else if(this.currentPosition == 0 && this.command==2){
            //console.log("COMMAND: 2")
            if(!this.second_turn){
                this.player.rotation.z += teta;
                let x = this.player.position.x;
                let y = this.player.position.y;
                let a = -this.edge/2;
                let b = -this.edge/2+this.playerBaseY;
                this.player.position.x = a + (x-a)*Math.cos(teta) - (y-b)*Math.sin(teta);
                this.player.position.y = b + (x-a)*Math.sin(teta) + (y-b)*Math.cos(teta);
                
                if(this.player.rotation.z > Math.PI/2){
                    this.player.rotation.z = Math.PI/2;
                    this.player.position.x=-this.edge;
                    this.player.position.y = this.playerBaseY;
                    this.second_turn=true;
                }
            }else{
                this.player.rotation.z += teta;
                let x = this.player.position.x;
                let y = this.player.position.y;
                let a = -this.edge-this.edge/2;
                let b = -this.edge/2+this.playerBaseY;
                this.player.position.x = a + (x-a)*Math.cos(teta) - (y-b)*Math.sin(teta);
                this.player.position.y = b + (x-a)*Math.sin(teta) + (y-b)*Math.cos(teta);
                
                if(this.player.rotation.z > Math.PI){
                    this.player.rotation.z = Math.PI;
                    this.player.position.x=-2*this.edge;
                    this.player.position.y = this.playerBaseY;
                    this.currentPosition=-1;
                    this.command = this.next_command;
                    this.next_command=-1;
                    this.second_turn=false;
                }
            }
        }else if(this.currentPosition == -1 && this.command==0){
            //console.log("COMMAND: 0")
            if(!this.second_turn){
                this.player.rotation.z -= teta;
                let x = this.player.position.x;
                let y = this.player.position.y;
                let a = -this.edge-this.edge/2;
                let b = -this.edge/2+this.playerBaseY;
                this.player.position.x = a + (x-a)*Math.cos(-teta) - (y-b)*Math.sin(-teta);
                this.player.position.y = b + (x-a)*Math.sin(-teta) + (y-b)*Math.cos(-teta);
                
                if(this.player.rotation.z < Math.PI/2){
                    this.player.rotation.z = Math.PI/2;
                    this.player.position.x= -this.edge;
                    this.player.position.y=this.playerBaseY;
                    this.second_turn=true;
                }
            }else{
                this.player.rotation.z -= teta;
                let x = this.player.position.x;
                let y = this.player.position.y;
                let a = -this.edge/2;
                let b = -this.edge/2+this.playerBaseY;
                this.player.position.x = a + (x-a)*Math.cos(-teta) - (y-b)*Math.sin(-teta);
                this.player.position.y = b + (x-a)*Math.sin(-teta) + (y-b)*Math.cos(-teta);
                
                if(this.player.rotation.z <0){
                    this.player.rotation.z = 0;
                    this.player.position.x=0
                    this.player.position.y=this.playerBaseY;
                    this.currentPosition = 0;
                    this.command = this.next_command;
                    this.next_command=-1;
                    this.second_turn=false;
                }
            }
        }else if(this.currentPosition == 1 && this.command==3){
            //console.log("COMMAND: 3")
            if(!this.second_turn){
                this.player.rotation.z += teta;
                let x = this.player.position.x;
                let y = this.player.position.y;
                let a = this.edge+this.edge/2;
                let b = -this.edge/2+this.playerBaseY;
                this.player.position.x = a + (x-a)*Math.cos(teta) - (y-b)*Math.sin(teta);
                this.player.position.y = b + (x-a)*Math.sin(teta) + (y-b)*Math.cos(teta);
                
                if(this.player.rotation.z > -Math.PI/2){
                    this.player.rotation.z = -Math.PI/2;
                    this.player.position.x= this.edge;
                    this.player.position.y= this.playerBaseY;
                    this.second_turn=true;
                }
            }else{
                this.player.rotation.z += teta;
                let x = this.player.position.x;
                let y = this.player.position.y;
                let a = this.edge/2;
                let b = -this.edge/2+this.playerBaseY;
                this.player.position.x = a + (x-a)*Math.cos(teta) - (y-b)*Math.sin(teta);
                this.player.position.y = b + (x-a)*Math.sin(teta) + (y-b)*Math.cos(teta);
                
                if(this.player.rotation.z >0){
                    this.player.rotation.z = 0;
                    this.player.position.x=0;
                    this.player.position.y=this.playerBaseY; 
                    this.currentPosition = 0;
                    this.command = this.next_command;
                    this.next_command=-1;
                    this.second_turn=false;
                }
            }
        }else if(this.command==4){ //salto in alto
            if(!this.wantsToTranslate){
                this.player.position.y += ((-(1/2)*gravity_constant*Math.pow(this.time+0.05,2) + velocity_to_jump*(this.time+0.05))-(-(1/2)*gravity_constant*Math.pow(this.time,2) + velocity_to_jump*this.time))/0.05;
                this.time+=0.05

                this.player.rotation.x -= (3/2*Math.PI)/(time_to_jump/0.05);
                
                
                if(this.player.position.y < this.playerBaseY){
                    this.player.position.y=this.playerBaseY;
                    this.player.rotation.x = 0;
                    this.command = this.next_command;
                    this.next_command=-1;
                    
                    this.time=0;
                }
            }
        
        }
        else{
            this.command = this.next_command;
            this.next_command=-1; 
        }
        //console.log(this.player.position.x, this.player.position.y, this.currentPosition, this.isOnTheSecondLevel)

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

       
        
        if(this.isTranslating==0 && this.jumpingTranslatingIsPossible()==0){
            if(direction==-1 && this.currentPosition==0){
                this.isTranslating=-1;
                this.wantsToTranslate=true;
            }
            else if(direction==1 && this.currentPosition==0){
                this.isTranslating=1;
                this.wantsToTranslate=true;
            }
            else if(direction==-1 && this.currentPosition==1){
                this.isTranslating=2;
                this.wantsToTranslate=true;
            }
            else if(direction==1 && this.currentPosition==-1){
                this.isTranslating=-2;
                this.wantsToTranslate=true;
            }
        } 
        else{
            if(direction==-1 && this.currentPosition==0){
                this.setCommand(2);
            }
            else if(direction==1 && this.currentPosition==0){
                this.setCommand(1);
            }
            else if(direction==-1 && this.currentPosition==1){
                this.setCommand(3);
            }
            else if(direction==1 && this.currentPosition==-1){
                this.setCommand(0);
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
        let per = 0.20;
        let good_time= (time_to_jump-(time_to_jump*per));
        
        if(this.time <= good_time){
            return 0;
        }
        else{
            return 1;
        }
    }

    setCommand(i){
        if(this.command==-1) this.command = i;
        else if (this.next_command==-1) this.next_command = i;
    }

    setNextCommand(i){
        if (this.next_command==-1) this.next_command = i;
    }

    translateCommand(){
        this.command = this.next_command;
        this.next_command = -1;
    }
}