import {PerspectiveCamera} from "./lib/three.module.js";

/*
Class mycamera
***
var:
    player
    currentposition
*/
const ROTATION_ANGLE = Math.PI/6;
const DESTRA = 1;
const SINISTRA = 0;
const ROTATION_STEP = 0.01;

export class MyCamera {

    constructor(sceneWidth, sceneHeight, cameraPosition, xrotation){

        this.camera = new PerspectiveCamera( 45, sceneWidth / sceneHeight, 0.25, 200 );
        this.camera.position.x= cameraPosition[0];
        this.camera.position.y = cameraPosition[1];
        this.camera.position.z = cameraPosition[2];
        this.camera.rotation.x = xrotation * Math.PI/180;
        this.isRotating = false;
        this.rotationDirection = DESTRA;
    }

    getCamera() {return this.camera}

    rotate(){
        
        if(!this.isRotating && this.camera.rotation.z == 0) return;
        if(!this.isRotating){
            if(this.rotationDirection == DESTRA){
                if(this.camera.rotation.z < 0){
                    this.camera.rotation.z += ROTATION_STEP;
                    if(this.camera.rotation.z >= 0){
                        this.camera.rotation.z = 0;
                        this.rotationDirection = SINISTRA;
                        return;
                    }
                }

                this.camera.rotation.z += ROTATION_STEP;
                if(this.camera.rotation.z >= ROTATION_ANGLE){
                    this.camera.rotation.z = ROTATION_ANGLE;
                    this.rotationDirection = SINISTRA;
                }
            }else{
                if(this.camera.rotation.z > 0){
                    this.camera.rotation.z -= ROTATION_STEP;
                    if(this.camera.rotation.z <= 0){
                        this.camera.rotation.z = 0;
                        this.rotationDirection = DESTRA;
                        return;
                    }
                }

                this.camera.rotation.z -= ROTATION_STEP;
                if(this.camera.rotation.z <= -ROTATION_ANGLE){
                    this.camera.rotation.z = -ROTATION_ANGLE;
                    this.rotationDirection = DESTRA;
                }
            }
            return;
        }

        if(this.rotationDirection == DESTRA){
            this.camera.rotation.z += ROTATION_STEP;
            if(this.camera.rotation.z >= ROTATION_ANGLE){
                this.camera.rotation.z = ROTATION_ANGLE;
                this.rotationDirection = SINISTRA;
            }
        }else{
            this.camera.rotation.z -= ROTATION_STEP;
            if(this.camera.rotation.z <= -ROTATION_ANGLE){
                this.camera.rotation.z = -ROTATION_ANGLE;
                this.rotationDirection = DESTRA;
            }
        }
    }

    setRotation(){
        this.isRotating = true;
    }

    unsetRotation(){
        this.isRotating = false;
    }
}