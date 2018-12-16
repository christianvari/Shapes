import { BoxBufferGeometry, TextureLoader, MeshBasicMaterial, MeshFaceMaterial, Mesh, MeshStandardMaterial } from "../lib/three.module.js";

const BLOCK_EDGE = 3;
const BLOCK_LENGTH = 10;
const INITIAL_POSITION = -150;
const FIRST_PHOTO_PATH = "../images/marco_photo.jpg";
const SECOND_PHOTO_PATH = "../images/christian_photo.jpg";
const FIRST_TEXT_PATH = "../images/marco.png";
const SECOND_TEXT_PATH = "../images/christian.png";
const THIRD_TEXT_PATH = "../images/william.png";
const THANKS_PATH = "../images/thanks.png";
const X_DISPLACEMENT = 2.5;
const SECOND_COLOR_PHOTO = 0x728bd4;
const FIRST_COLOR_PHOTO = 0x00cc1e;
const FIRST_TEXT_COLOR = 0x0040ff;
const SECOND_TEXT_COLOR = 0xffff00;
const THIRD_TEXT_COLOR = 0x00ff00;
const THANKS_COLOR = 0xffffff;

export class ObstacleCredits{

    constructor(i){

        this.length = BLOCK_LENGTH;
        this.obstacle = null;
        this.stopped = false;
        this.time = 0;
        this.positionZ = 0;

        if(i==1){
            var geometry = new BoxBufferGeometry(BLOCK_EDGE, BLOCK_EDGE, BLOCK_LENGTH);
            var loader = new TextureLoader();
            var texture = loader.load(FIRST_TEXT_PATH);
            var materials = [
                new MeshStandardMaterial( { color: FIRST_TEXT_COLOR}),
                new MeshStandardMaterial( { color: FIRST_TEXT_COLOR}),
                new MeshStandardMaterial( { color: FIRST_TEXT_COLOR}),
                new MeshStandardMaterial( { color: FIRST_TEXT_COLOR}),
                new MeshBasicMaterial( { map: texture}),
                new MeshStandardMaterial( { color: FIRST_TEXT_COLOR})
            ];
            
            this.obstacle = new Mesh(geometry, materials);
            this.obstacle.position.y = BLOCK_EDGE/2;
            this.obstacle.position.z = INITIAL_POSITION;
            this.positionZ = INITIAL_POSITION;
            this.obstacle.position.x = -X_DISPLACEMENT;
            
        }
        if(i==2){
            var geometry = new BoxBufferGeometry(BLOCK_EDGE, BLOCK_EDGE, BLOCK_LENGTH);
            var loader = new TextureLoader();
            var texture = loader.load(SECOND_PHOTO_PATH);
            var materials = [
                new MeshStandardMaterial( { color: SECOND_COLOR_PHOTO}),
                new MeshStandardMaterial( { color: SECOND_COLOR_PHOTO}),
                new MeshStandardMaterial( { color: SECOND_COLOR_PHOTO}),
                new MeshStandardMaterial( { color: SECOND_COLOR_PHOTO}),
                new MeshBasicMaterial( { map: texture}),
                new MeshStandardMaterial( { color: SECOND_COLOR_PHOTO})
            ];
            
            
            this.obstacle = new Mesh(geometry, materials);
            this.obstacle.position.y = BLOCK_EDGE/2;
            this.obstacle.position.z = INITIAL_POSITION;
            this.positionZ = INITIAL_POSITION;
            this.obstacle.position.x = X_DISPLACEMENT;
        }
        if (i==3){
            var geometry = new BoxBufferGeometry(BLOCK_EDGE, BLOCK_EDGE, BLOCK_LENGTH);
            var loader = new TextureLoader();
            var texture = loader.load(SECOND_TEXT_PATH);
            var materials = [
                new MeshStandardMaterial( { color: SECOND_TEXT_COLOR}),
                new MeshStandardMaterial( { color: SECOND_TEXT_COLOR}),
                new MeshStandardMaterial( { color: SECOND_TEXT_COLOR}),
                new MeshStandardMaterial( { color: SECOND_TEXT_COLOR}),
                new MeshBasicMaterial( { map: texture}),
                new MeshStandardMaterial( { color: SECOND_TEXT_COLOR})
            ];
            
            this.obstacle = new Mesh(geometry, materials);
            this.obstacle.position.y = BLOCK_EDGE/2;
            this.obstacle.position.z = INITIAL_POSITION;
            this.positionZ = INITIAL_POSITION;
            this.obstacle.position.x = X_DISPLACEMENT;
        
        }
        if (i==4){
            

            var geometry = new BoxBufferGeometry(BLOCK_EDGE, BLOCK_EDGE, BLOCK_LENGTH);
            var loader = new TextureLoader();
            var texture = loader.load(FIRST_PHOTO_PATH);
            var materials = [
                new MeshStandardMaterial( { color: FIRST_COLOR_PHOTO}),
                new MeshStandardMaterial( { color: FIRST_COLOR_PHOTO}),
                new MeshStandardMaterial( { color: FIRST_COLOR_PHOTO}),
                new MeshStandardMaterial( { color: FIRST_COLOR_PHOTO}),
                new MeshBasicMaterial( { map: texture}),
                new MeshStandardMaterial( { color: FIRST_COLOR_PHOTO})
            ];
            
            
            this.obstacle = new Mesh(geometry, materials);
            this.obstacle.position.y = BLOCK_EDGE/2;
            this.obstacle.position.z = INITIAL_POSITION;
            this.positionZ = INITIAL_POSITION;
            this.obstacle.position.x = -X_DISPLACEMENT;
        }
        if (i==5){
            var geometry = new BoxBufferGeometry(BLOCK_EDGE*1.5, BLOCK_EDGE, BLOCK_LENGTH);
            var loader = new TextureLoader();
            var texture = loader.load(THIRD_TEXT_PATH);
            var materials = [
                new MeshStandardMaterial( { color: THIRD_TEXT_COLOR}),
                new MeshStandardMaterial( { color: THIRD_TEXT_COLOR}),
                new MeshStandardMaterial( { color: THIRD_TEXT_COLOR}),
                new MeshStandardMaterial( { color: THIRD_TEXT_COLOR}),
                new MeshBasicMaterial( { map: texture}),
                new MeshStandardMaterial( { color: THIRD_TEXT_COLOR})
            ];
            
            this.obstacle = new Mesh(geometry, materials);
            this.obstacle.position.y = BLOCK_EDGE/2;
            this.obstacle.position.z = INITIAL_POSITION;
            this.positionZ = INITIAL_POSITION;
            this.obstacle.position.x = 0;
        }
        if (i==6){
            var geometry = new BoxBufferGeometry(BLOCK_EDGE*1.5, BLOCK_EDGE, BLOCK_LENGTH);
            var loader = new TextureLoader();
            var texture = loader.load(THANKS_PATH);
            var materials = [
                new MeshStandardMaterial( { color: THANKS_COLOR}),
                new MeshStandardMaterial( { color: THANKS_COLOR}),
                new MeshStandardMaterial( { color: THANKS_COLOR}),
                new MeshStandardMaterial( { color: THANKS_COLOR}),
                new MeshBasicMaterial( { map: texture}),
                new MeshStandardMaterial( { color: THANKS_COLOR})
            ];
            
            this.obstacle = new Mesh(geometry, materials);
            this.obstacle.position.y = BLOCK_EDGE/2;
            this.obstacle.position.z = INITIAL_POSITION;
            this.positionZ = INITIAL_POSITION;
            this.obstacle.position.x = 0;
        }

        if(document.location.pathname == "/desktop/credits.php"){
            this.obstacle.receiveShadow = true;
            this.obstacle.castShadow = true;
        }
    }


    addStep(i){
        this.obstacle.position.z += i;
        this.positionZ += i;
        //console.log("addStep: "+this.obstacle.position.z+" "+this.positionZ)
    }

    setPositionZ(i){
        this.obstacle.position.z = i;
        this.positionZ = i;
    }


}