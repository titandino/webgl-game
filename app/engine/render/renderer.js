let Renderer = module.exports = function() {
  this.initGL();
};

Renderer.prototype.initGL = function() {
  this.canvas = document.getElementById('game-canvas');

  try {
    this.gl = canvas.getContext('experimental-webgl');
  } catch(e) {
    console.log(e);
  }

  if (!this.gl) {
    console.log('WebGL unsupported.');
  }
};
