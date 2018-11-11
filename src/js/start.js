//Import

import * as THREE from "./lib/three.module.js";

//Global Variables

var width;
var heigth;

var scene;
var camera;
var renderer;

var score;
var collided;
var scoreText;

var player;
var playerEdge = 1;

var sky;
var skyWidth = 100;
var skyHeigth = 100;
var skyDepth = 100;

var plane;
var planeWidth = 100;
var planeHeigth = 100;
var planeSegments = 1;

var sun;


//Functions

function inizialize(){

    //Adding Event Listener

    window.addEventListener('resize', onWindowResize, false);//resize callback
    //document.onkeydown = handleKeyDown; //Keyboard handling

    //Scene Inizialization

    scene = new THREE.Scene();

    //Camera Inizialization

    camera = new THREE.PerspectiveCamera(60, width, heigth, 0.1, 1000);
    camera.position.z = 6.5;
	camera.position.y = 2.5;

    //Ambient Inizialization

    width = window.innerWidth;
    heigth = window.innerHeight;

    //Inizialization of game variables
    score = 0;
    collided = false;

    //Player Inizialization
    var cubeGeometry = new THREE.CubeGeometry(playerEdge, playerEdge);
    var cubeMaterial = new THREE.MeshStandardMaterial({color: 0xffffff })
    player = new THREE.Mesh(cubeGeometry, cubeMaterial);

    //Skybox Inizialization
    //var skyGeometry = new THREE.CubeGeometry(skyWidth, skyHeigth, skyDepth);
    //var skyMaterial = new THREE.MeshStandardMaterial({color: 0x3779b2 })
    //sky = new THREE.Mesh(cubeGeometry, cubeMaterial);

    //Sun Inizialization

    var hemisphereLight = new THREE.HemisphereLight(0xfffafa, 0x000000, .9);
    sun = new THREE.DirectionalLight( 0xcdc1c5, 0.9);
    sun.position.set( 12,6,-7 );
    sun.castShadow = true;

    //Plane Inizialization

    var planeGeometry = new THREE.PlaneGeometry( planeWidth, planeHeigth, planeSegments );
    var planeMaterial = new THREE.MeshBasicMaterial( {color: 0xffff00} );
    plane = new THREE.Mesh( planeGeometry, planeMaterial);

    //Adding to scene
    scene.add(camera);
    scene.add(player)
    scene.add(hemisphereLight);
    scene.add(plane);
    scene.add(sun);
    

    //Renderization and DOM adding Canvas
    renderer = new THREE.WebGLRenderer(); //TODO: forse alpha:true
    renderer.setSize(width, heigth);
    renderer.setClearColor(0xfffafa, 1);
    renderer.shadowMap.enabled = true;//enable shadow
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    //Modifying HTML
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

function createObstacle(){

    var randomValue = Math.random();
    var obstacleGeometry = new THREE.BoxGeometry(2,2, randomValue*10);
    var obstacleMaterial = new MeshStandardMaterial( { color: 0x33ff33 } );
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
	heigth = window.innerHeight;
	width = window.innerWidth;
	renderer.setSize(width, heigth);
	camera.aspect = width/heigth;
	camera.updateProjectionMatrix();
}

function main (){
    inizialize();
    update();
}

main(); //GO