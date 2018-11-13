import {Scene, HemisphereLight, DirectionalLight} from "./lib/three.module.js";
import {MyCamera} from "./mycamera.js";
import {Cube} from "./cube.js";
import {Ground} from "./ground.js";

/*
Class Enviroment
***
var:
    ground
*/

var playerEdge = 1;
var playerColor = 0xffffff;

var groundWidth = 1000;
var groundHeigth = 10000;
var groundColor = 0x000000; 

export class MyScene {
    constructor(cameraPosition, cameraRotationX, sceneWidth, sceneHeight){
        this.scene = new Scene();
        this.camera = new MyCamera(sceneWidth, sceneHeight, cameraPosition, cameraRotationX);
        this.player = new Cube(playerEdge, playerColor);
        this.ground = new Ground(groundWidth, groundHeigth, groundColor);
        this.addObjectsToScene();
    }

    addObjectsToScene(){
        this.scene.add(this.player.getPlayer());
        this.scene.add(this.ground.ground);
        this.addLight();
    }

    addLight(){
        let hemisphereLight = new HemisphereLight(0xfffafa,0x000000, .9);
        let sun = new DirectionalLight( 0xcdc1c5, 0.9);
        sun.position.set( 12,6,-7 );
        sun.castShadow = true;
    
        //Set up shadow properties for the sun light
        sun.shadow.mapSize.width = 256;
        sun.shadow.mapSize.height = 256;
        sun.shadow.camera.near = 0.5;
        sun.shadow.camera.far = 50 ;

        this.scene.add(sun);
        this.scene.add(hemisphereLight);
    }
    getScene(){return this.scene}
}