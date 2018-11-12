//Import

import * as THREE from "./lib/three.module.js";
import {Cube} from "./cube.js";

//Globals

var sceneWidth;
var sceneHeight;
var camera;
var scene;
var renderer;
var sun;

var ground;
var groundWidth = 1000;
var groundHeigth = 1000;

var player;
var playerEdge = 1;

var playerState; //0=>1 , 1=>2
var clock;

// Game
var scoreText;
var score;
var hasCollided;

init();

function init() {
	// set up the scene
	createScene();

	//call game loop
	update();
}

function createScene(){
	hasCollided=false;
	score=0;

	clock=new THREE.Clock();
	clock.start();

    sceneWidth=window.innerWidth;
    sceneHeight=window.innerHeight;
    scene = new THREE.Scene();//the 3d scene

    camera = new THREE.PerspectiveCamera( 75, sceneWidth / sceneHeight, 0.1, 1000 );//perspective camera
   
	inizializeCanvas();
	addPlayer();
    addLight();
    addGround();
	
	camera.position.z = 4.5;
    camera.position.y = 2.5;
    camera.rotation.x = -20 * Math.PI/180;

	window.addEventListener('resize', onWindowResize, false);//resize callback

	document.onkeydown = handleKeyDown;
}

function inizializeCanvas(){

    renderer = new THREE.WebGLRenderer({alpha:true, antialias:true});//renderer with transparent backdrop
    renderer.setClearColor(0xfffafa, 1); 
    renderer.shadowMap.enabled = true;//enable shadow
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setSize( sceneWidth, sceneHeight );
    document.body.appendChild( renderer.domElement );

    scoreText = document.createElement('div');
	scoreText.style.position = 'absolute';
	scoreText.style.width = 100;
	scoreText.style.height = 100;
	scoreText.innerHTML = "0";
	scoreText.style.top = 50 + 'px';
	scoreText.style.left = 10 + 'px';
	document.body.appendChild(scoreText);
}

function handleKeyDown(keyEvent){
	if ( keyEvent.keyCode === 32) {//space
		if(playerState == 0){
            playerState=1;
        }
        else{
            playerState = 0;
        }
	}
}

function addGround(){
    var groundGeometry = new THREE.PlaneBufferGeometry(groundWidth, groundHeigth);
    var groundMaterial = new THREE.MeshStandardMaterial({color : 0x000000});
    ground = new THREE.Mesh(groundGeometry, groundMaterial);

    ground.rotation.x = -90* Math.PI/180;

    scene.add(ground)
}

function addPlayer(){
	
	player = new Cube(playerEdge, 0xffffff).player;

	scene.add( player );

	playerState=0;

}

function addLight(){
	var hemisphereLight = new THREE.HemisphereLight(0xfffafa,0x000000, .9)
	scene.add(hemisphereLight);
	sun = new THREE.DirectionalLight( 0xcdc1c5, 0.9);
	sun.position.set( 12,6,-7 );
	sun.castShadow = true;
    scene.add(sun);

	//Set up shadow properties for the sun light
	sun.shadow.mapSize.width = 256;
	sun.shadow.mapSize.height = 256;
	sun.shadow.camera.near = 0.5;
	sun.shadow.camera.far = 50 ;
}

function update(){

    render();
	requestAnimationFrame(update);//request next update
}

function render(){
    renderer.render(scene, camera);//draw
}

function onWindowResize() {
	//resize & align
	sceneHeight = window.innerHeight;
	sceneWidth = window.innerWidth;
	renderer.setSize(sceneWidth, sceneHeight);
	camera.aspect = sceneWidth/sceneHeight;
	camera.updateProjectionMatrix();
}