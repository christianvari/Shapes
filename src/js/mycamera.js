import {PerspectiveCamera} from "./lib/three.module.js";

/*
Class mycamera
***
var:
    player
    currentposition
*/


export class MyCamera {

    constructor(sceneWidth, sceneHeight, cameraPosition, xrotation){

        this.camera = new PerspectiveCamera( 45, sceneWidth / sceneHeight, 0.25, 200 );
        this.camera.position.x= cameraPosition[0];
        this.camera.position.y = cameraPosition[1];
        this.camera.position.z = cameraPosition[2];
        this.camera.rotation.x = xrotation * Math.PI/180;
    }

    getCamera() {return this.camera}

}