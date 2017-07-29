let Renderer = module.exports = function(canvasId) {
  this.canvasId = canvasId;
  this.initGL();
};

Renderer.prototype.initGL = function() {
  this.canvas = document.getElementById(this.canvasId);

  try {
    this.gl = this.canvas.getContext('webgl') || this.canvas.getContext('experimental-webgl');
  } catch(e) {
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
  }
};

Renderer.prototype.loadShader = function(shaderSource) {

};
