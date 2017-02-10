let Renderer = require('./render/renderer');

let Game = module.exports = function(startLevel) {
  this.startLevel = startLevel;
  this.renderer = new Renderer();
};

Game.prototype.init = function() {

};

Game.prototype.update = function(delta) {

};

Game.prototype.render = function() {

};
