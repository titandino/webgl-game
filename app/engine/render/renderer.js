let Renderer = module.exports = function() {
  this.initGL();
};

Renderer.prototype.initGL = function() {
  this.canvas = document.getElementById('game-canvas');

  try {
    this.gl = this.canvas.getContext('experimental-webgl');
  } catch(e) {
    console.log(e);
  }

  if (!this.gl) {
    console.log('WebGL unsupported.');
  } else {
    this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
    this.gl.clearDepth(1.0);
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.depthFunc(this.gl.LEQUAL);
  }
};

Renderer.prototype.loadShader = function(shaderSource) {

};
