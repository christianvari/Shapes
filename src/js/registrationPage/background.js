import { Scene, WebGLRenderer, PerspectiveCamera, BoxBufferGeometry, MeshNormalMaterial, Mesh } from "../lib/three.module.js";
import {isWebGLSupported} from "../lib/webGL.js";

//Globals

var renderer;
var sceneWidth;
var sceneHeight;
var camera;
var scene;
var cube1;
var cube2;

const BACKGROND_COLOR = 0xffcc99;
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
    camera = new PerspectiveCamera(45, sceneWidth/sceneHeight, 0.1, 30);
    camera.position.set(0,3.5,5)
    camera.lookAt(scene.position)

    createCube1();
    createCube2();
    createRenderer();

}

function createCube1(){
    let box = new BoxBufferGeometry(2,2,2)
    let boxMaterial = new MeshNormalMaterial();
    cube1 = new Mesh(box, boxMaterial);
    cube1.position.x = -4;
    cube1.position.y = -3;
    cube1.position.z = -3;
    scene.add(cube1);
}

function createCube2(){
    let box = new BoxBufferGeometry(2,2,2)
    let boxMaterial = new MeshNormalMaterial();
    cube2 = new Mesh(box, boxMaterial);
    cube2.position.x = 3.5;
    cube2.position.y =-0.5;
    cube2.position.z = -3;

    scene.add(cube2);
}

function createRenderer(){
    renderer = new WebGLRenderer({antialias : true});
    renderer.setClearColor(BACKGROND_COLOR, 1); 
	renderer.setSize( sceneWidth, sceneHeight );
    document.body.prepend( renderer.domElement );

    window.addEventListener('resize', onWindowResize, false);
}

function rotateCube(){
    cube1.rotation.x +=SPEED_MULTIPLIER*1.1;
    cube1.rotation.y -=SPEED_MULTIPLIER;
    cube1.rotation.z +=SPEED_MULTIPLIER*0.9;

    cube2.rotation.x -=SPEED_MULTIPLIER;
    cube2.rotation.y +=SPEED_MULTIPLIER*0.8;
    cube2.rotation.z -=SPEED_MULTIPLIER*1.1;
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
