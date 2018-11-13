import * as THREE from "./lib/three.module.js";

/*
Class ground
***
var:
    ground
*/

export class Ground {

    constructor(width, heigth, color){

        let groundGeometry = new THREE.PlaneBufferGeometry(width, heigth);
        let groundMaterial = new THREE.MeshStandardMaterial({color : color});
        this.ground = new THREE.Mesh(groundGeometry, groundMaterial);

        this.ground.rotation.x = -90* Math.PI/180;
    }

}