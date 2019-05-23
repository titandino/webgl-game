import { Renderer } from '/engine/render/renderer.js';

class Game {

  constructor(canvasId, startLevel) {
    this.startLevel = startLevel;
    this.renderer = new Renderer(canvasId);
  }

  init = () => {
    requestAnimationFrame(this.render);
  }

  update = (delta) => {

  }

  render = () => {
    this.renderer.render();
    requestAnimationFrame(this.render);
  }
}

export { Game };