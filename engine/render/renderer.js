import { ShaderManager } from '/engine/util/shadermanager.js';

class Renderer {

  constructor(canvasId) {
    this.canvasId = canvasId;
    this.initGL();
  }

  initGL = () => {
    this.canvas = document.getElementById(this.canvasId);
    try {
      this.gl = this.canvas.getContext('webgl2');
      if (this.gl) {
        console.log('WebGL 2.0 Initialized');
      } else {
        this.gl = this.canvas.getContext('webgl1');
        if (this.gl) {
          console.log('WebGL 1.0 Initialized');
        }
      }
    } catch (e) {
      console.log(e);
    }
    if (!this.gl) {
      console.log('WebGL unsupported.');
    } else {
      this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
      this.gl.enable(this.gl.DEPTH_TEST);
      this.gl.depthFunc(this.gl.LEQUAL);
      this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
      this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);

      ShaderManager.createAttachLinkProgram(this.gl, 'basicVert.glsl', 'basicFrag.glsl');
    }
  }

  render = () => {
    this.resize(this.canvas);
  }

  resize = (canvas) => {
    let displayWidth  = canvas.clientWidth;
    let displayHeight = canvas.clientHeight;
   
    if (canvas.width  != displayWidth || canvas.height != displayHeight) {
      canvas.width  = displayWidth;
      canvas.height = displayHeight;
    }
  }
}

export { Renderer };
