import { MySceneCredits } from "./myscenecredits.js";
import {WebGLRenderer, Clock} from "./lib/three.module.js"



export const time_scale = 1;

export class EnviromentCredits {

    constructor() {

        
		this.clock = new Clock();
		this.sceneWidth = window.innerWidth;
		this.sceneHeight = window.innerHeight;
		this.renderer = new WebGLRenderer({antialias : true});
		this.myscene = new MySceneCredits(this.sceneWidth, this.sceneHeight);


		//Install Event Handler
		window.addEventListener('resize', this.onWindowResize.bind(this), false);//resize callback
		//document.onkeydown = this.handleKeyDown.bind(this);

		//Inizialize Interface
		this.inizializeCanvas();
	}

	inizializeCanvas(){

		this.renderer.setClearColor(0xfffafa, 1); 
		this.renderer.setPixelRatio( window.devicePixelRatio );
		this.renderer.shadowMap.enabled = true;//enable shadow
		this.renderer.setSize( this.sceneWidth, this.sceneHeight );
		document.body.appendChild( this.renderer.domElement );
	
	}

	renderize(){
		this.renderer.render(this.myscene.getScene(), this.myscene.camera.getCamera());//draw
	}

	goGame(){

		window.requestAnimationFrame(this.goGame.bind(this));//request next update

		if(this.myscene.notFinished){
			this.myscene.getNextMovement();
			//console.log("goGame");
		}
		else{
			//this.spaunText("press SPACE to continue");
			document.getElementById("bottomText").style.visibility = "visible";
			
            
		}

		this.renderize();


	}



	onWindowResize() {
		//resize & align
		this.sceneHeight = window.innerHeight;
		this.sceneWidth = window.innerWidth;
		this.renderer.setSize(this.sceneWidth, this.sceneHeight);
		this.myscene.camera.getCamera().aspect = this.sceneWidth/this.sceneHeight;
		this.myscene.camera.getCamera().updateProjectionMatrix();
	}
	

}
