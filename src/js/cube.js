import * as THREE from "./lib/three.module.js";

/*
Class cube
***
var:
    player
    currentposition
*/

var playerBaseY= 1;

export class Cube {

    constructor(edge, color){

        var cubeGeometry = new THREE.BoxBufferGeometry(edge, edge, edge);
        var cubeMaterial = new THREE.MeshStandardMaterial( { color: color } )

        this.player = new THREE.Mesh( cubeGeometry, cubeMaterial );
        this.player.receiveShadow = true;
        this.player.castShadow=true;
        this.player.position.y=playerBaseY;
        this.player.position.z=0;
        this.player.position.x=0;
        this.currentPosition = 0;
    }

}