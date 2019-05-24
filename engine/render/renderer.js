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

    this.fbo = new FBO(1920, 1080);
    this.view = new Entity(new Vector2f(0, 0), new Vector2f(0, 0), 1, 1, MeshManager.defaultMesh(), this.fbo);
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
      GL.enable(GL.DEPTH_TEST, GL.BLEND);
		  GL.blendFunc(GL.SRC_ALPHA, GL.ONE_MINUS_SRC_ALPHA);
      GL.clear(GL.COLOR_BUFFER_BIT | GL.DEPTH_BUFFER_BIT);
      GL.viewport(0, 0, this.canvas.width, this.canvas.height);
    }
  }

  renderView = () => {
		//Bind render shader
		this.shader.use();
		//Set orthogonal matrix/glViewport to the screen width
		//glOrtho(0, SCREEN_WIDTH, 0, SCREEN_HEIGHT, -1, 1);
		Utils.glOrtho(this.shader, 1920, 1080);
		GL.viewport(0, 0, 1920, 1080);
		GL.clear(GL.COLOR_BUFFER_BIT);
		//Render the fbo to the view entity
		this.view._render(this.shader);
		this.level.renderUI(this.shader);
	}

  updateAndRender = (delta) => {    
    //Update and render the level to the FBO
		this.level._update(delta);
		this.level._render(this.shader, this.fbo);

		//Call the post processing method in case the level has special post processing
		let newFBO = this.level.postProcess(this.fbo);
		if (newFBO != null)
      this.view.setTexture(newFBO);
    //Render the simulation FBO using the view provided
		this.renderView();
  }

  checkResize = () => {
    let displayWidth  = this.canvas.clientWidth;
    let displayHeight = this.canvas.clientHeight;
   
    if (this.canvas.width  != displayWidth || this.canvas.height != displayHeight) {
      this.canvas.width  = displayWidth;
      this.canvas.height = displayHeight;
    }
  }
}

export { Renderer };
