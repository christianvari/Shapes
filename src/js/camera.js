import {PerspectiveCamera} from "./lib/three.module.js";

/*
Class camera
***
var:
    player
    currentposition
*/


export class Camera {

    constructor(sceneWidth, sceneHeight, cameraPosition,xrotation){

        this.camera = new PerspectiveCamera( 75, sceneWidth / sceneHeight, 0.1, 1000 );
        this.camera.position.x= cameraPosition[0];
        this.camera.position.y = cameraPosition[1];
        this.camera.position.z = cameraPosition[2];
        this.camera.rotation.x = xrotation * Math.PI/180;
    }

}