import{PlaneBufferGeometry, MeshStandardMaterial, Mesh} from "./lib/three.module.js";

/*
Class ground
***
var:
    ground
*/

export class Ground {

    constructor(width, heigth, color){

        let groundGeometry = new PlaneBufferGeometry(width, heigth);
        let groundMaterial = new MeshStandardMaterial({color : color});
        this.ground = new Mesh(groundGeometry, groundMaterial);

        this.ground.rotation.x = -90* Math.PI/180;
    }

}