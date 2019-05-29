import { MeshManager } from '/engine/util/meshmanager.js';
import { FBO } from '/engine/render/fbo.js';
import { Shader } from '/engine/render/shader.js';
import { Entity } from '/engine/entity/entity.js';
import { Vector2f } from '/engine/math/vector2f.js';
import { Utils } from '/engine/util/utils.js';

class Renderer {

  constructor(canvasId, level) {
    this.canvasId = canvasId;
    this.level = level;
    this.loadGL();
    this.shader = new Shader(['basic.vert', 'basic.frag']);
    this.initGL();
    MeshManager.init();

    this.fbo = new FBO(this.level.width, this.level.height);
    this.view = new Entity(new Vector2f(1920/2, 1080/2), new Vector2f(1920, 1080), MeshManager.defaultMesh(), this.fbo, true);
  }

  loadGL = () => {
    this.canvas = document.getElementById(this.canvasId);
    try {
      window.GL = this.canvas.getContext('webgl2');
      if (window.GL) {
        console.log('WebGL 2.0 Initialized');
      } else {
        window.GL = this.canvas.getContext('webgl1');
        if (window.GL) {
          console.log('WebGL 1.0 Initialized');
        }
      }
    } catch (e) {
      console.log(e);
    }
  }

  initGL = () => {
    if (!GL) {
      console.log('WebGL unsupported.');
    } else {
      GL.clearColor(0.0, 0.0, 0.0, 1.0);
      GL.enable(GL.BLEND);
		  GL.blendFunc(GL.SRC_ALPHA, GL.ONE_MINUS_SRC_ALPHA);
      GL.viewport(0, 0, this.canvas.width, this.canvas.height);
    }
  }

  renderView = () => {
		//Bind render shader
    this.shader.use();
    
    this.resizeScreen();
		//Set orthogonal matrix/glViewport to the screen width
		//glOrtho(0, SCREEN_WIDTH, 0, SCREEN_HEIGHT, -1, 1);
		Utils.glOrtho(this.shader, this.view.scale.x, this.view.scale.y);
		GL.viewport(0, 0, this.view.scale.x, this.view.scale.y);
		GL.clear(GL.COLOR_BUFFER_BIT);
		//Render the fbo to the view entity
		this.view._render(this.shader);
		this.level.renderUI(this.shader);
	}

  updateAndRender = (delta) => {    
    //Update and render the level to the FBO
		this.level._update(delta);
    this.level._render(this.shader, this.fbo);
    
    this.view._update(delta);

		//Call the post processing method in case the level has special post processing
		let newFBO = this.level.postProcess(this.fbo);
		if (newFBO != null)
      this.view.setTexture(newFBO);
    //Render the simulation FBO using the view provided
		this.renderView();
  }

  resizeScreen = () => {
		let displayWidth  = this.canvas.clientWidth;
    let displayHeight = this.canvas.clientHeight;

		let ratio = displayWidth / this.level.width;

		let scaledWidth = ratio * this.level.width;
		let scaledHeight = ratio * this.level.height;

		//Calculate the best scale to fit the device's height/width
		//this.view.scale = new Vector2f(scaledWidth, scaledHeight);
    //this.view.position = new Vector2f(displayWidth / 2, displayHeight / 2);
    //console.log('Resizing: (' + displayWidth + ', ' + displayHeight + ') to (' + scaledWidth + ', ' + scaledHeight + ')');
	}
}

export { Renderer };
