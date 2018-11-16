import{PlaneBufferGeometry, MeshStandardMaterial, Mesh, BoxBufferGeometry} from "./lib/three.module.js";
import { PLAYER_EDGE } from "./myscene.js";
/*
Class ground
***
var:
    ground
*/

const sideWidth = 30;
var sideHeigth;
const sideLong = 200;

export class Ground {

    constructor(width, heigth, color){

        sideHeigth  = PLAYER_EDGE*2.5;

        let groundGeometry = new PlaneBufferGeometry(width, heigth);
        let groundMaterial = new MeshStandardMaterial({color : color});
        this.ground = new Mesh(groundGeometry, groundMaterial);
        this.ground.receiveShadow = true;
        //this.ground.castShadow=true;
        
        let sideBoxGeometry = new BoxBufferGeometry(sideWidth,sideHeigth, sideLong);
        let sideBoxMaterial = new MeshStandardMaterial({color: 0x565656});

        this.rightSide = new Mesh(sideBoxGeometry, sideBoxMaterial);
        this.leftSide = new Mesh(sideBoxGeometry, sideBoxMaterial);

        this.rightSide.receiveShadow = true;
        this.leftSide.receiveShadow = true;
        
        this.rightSide.position.x = 4*PLAYER_EDGE +sideWidth/2;
        this.rightSide.position.y = sideHeigth/2;
        this.rightSide.position.z = -sideLong/2+3;

        this.leftSide.position.x = -(4*PLAYER_EDGE +sideWidth/2);
        this.leftSide.position.y = sideHeigth/2;
        this.leftSide.position.z = -sideLong/2+3;
                
        this.ground.rotation.x = -90* Math.PI/180;


    }

    getGround() {return this.ground}

    changeColor(color){
        this.getGround().material.color.setHex(color);
        this.leftSide.material.color.setHex(color);
        this.rightSide.material.color.setHex(color);
    }

}