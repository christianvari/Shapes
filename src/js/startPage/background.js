import { Scene, WebGLRenderer, PerspectiveCamera, BoxBufferGeometry, MeshNormalMaterial, Mesh } from "../lib/three.module.js";
import {isWebGLSupported} from "../lib/webGL.js";

//Globals

var renderer;
var sceneWidth;
var sceneHeight;
var camera;
var scene;
var cube;

const BACKGROND_COLOR = 0xcad8f7;
const SPEED_MULTIPLIER = 0.02;

if(!isWebGLSupported()){
    alert("Your graphics card does not seem to support WebGL.\n This game will not work.");
}
else{
	goLive();
}


function goLive() {
    createEnviroment();

    animate();
}

function createEnviroment(){

    sceneWidth = window.innerWidth;
    sceneHeight = window.innerHeight;
    scene = new Scene();
    camera = new PerspectiveCamera(75, sceneWidth/sceneHeight, 0.1, 10);
    camera.position.set(0,3.5,5)
    camera.lookAt(scene.position)

    createCube();
    createRenderer();

}

function createCube(){
    let box = new BoxBufferGeometry(2,2,2)
    let boxMaterial = new MeshNormalMaterial();
    cube = new Mesh(box, boxMaterial);

    scene.add(cube);
}

function createRenderer(){
    renderer = new WebGLRenderer();
    renderer.setClearColor(BACKGROND_COLOR, 1); 
	renderer.setSize( sceneWidth, sceneHeight );
    document.body.prepend( renderer.domElement );

    window.addEventListener('resize', onWindowResize, false);
}

function rotateCube(){
    cube.rotation.x +=SPEED_MULTIPLIER;
    cube.rotation.y +=SPEED_MULTIPLIER;
    cube.rotation.z +=SPEED_MULTIPLIER;
}


function animate(){
    requestAnimationFrame(animate);
    rotateCube();
    renderer.render(scene,camera);
}

function onWindowResize() {
    //resize & align
    sceneHeight = window.innerHeight;
    sceneWidth = window.innerWidth;
    renderer.setSize(sceneWidth, sceneHeight);
    camera.aspect = sceneWidth/sceneHeight;
    camera.updateProjectionMatrix();
}
