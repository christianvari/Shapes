import {BoxBufferGeometry, MeshStandardMaterial, Mesh} from "./lib/three.module.js";

/*
Class cube
***
var:
    player
    currentposition
*/

const playerBaseY= 1;
const gravity_constant=1;
const velocity_to_jump=0.5;


export class Cube {

    constructor(edge, color){
        this.edge=edge;
        var cubeGeometry = new BoxBufferGeometry(edge, edge, edge);
        var cubeMaterial = new MeshStandardMaterial( { color: color } )

        this.player = new Mesh( cubeGeometry, cubeMaterial );
        this.player.receiveShadow = true;
        this.player.castShadow=true;
        this.player.position.y=playerBaseY;
        this.player.position.z=0;
        this.player.position.x=0;
        this.currentPosition = 0;
        this.command=-1;
        this.next_command=-1;
        this.time=0;
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
        
        if(this.command==-1) return;
        let scala=1.5;
        let teta = 0.05*scala;

        //console.log("rotate() command: "+this.command+" status: "+this.currentPosition+ " angle: "+this.player.rotation.z+" x: "+this.player.position.x + " y: "+this.player.position.y);
        
        if(this.currentPosition==0 && this.command==1){
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
                this.currentPosition=1;
                this.command = this.next_command;
                this.next_command=-1;
            }
        }else if(this.currentPosition == 0 && this.command==2){
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
                this.currentPosition=-1;
                this.command = this.next_command;
                this.next_command=-1;
            }
        }else if(this.currentPosition == -1 && this.command==0){
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
            }
        }else if(this.currentPosition == 1 && this.command==3){
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
            }
        }else if(this.command==4){ //salto in alto
            console.log("provo a saltare")
            this.player.position.y += -1/2*gravity_constant*Math.pow(this.time,2)*scala + velocity_to_jump*this.time*scala
            this.time+=0.05
            
            if(this.player.position.y < playerBaseY){
                this.player.position.y=playerBaseY;
                this.command = this.next_command;
                this.next_command=-1;
                this.time=0;
            }
        
        }
    }

}