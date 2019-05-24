import { Renderer } from '/engine/render/renderer.js';

class Game {

  constructor(canvasId, startLevel) {
    this.startLevel = startLevel;
    this.renderer = new Renderer(canvasId, startLevel);
    this.prevFrame = new Date().getTime();
  }

  init = () => {
    this.render();
  }

  render = () => {
    let millis = new Date().getTime() - this.prevFrame;
		let delta = millis / 1000.0;
    this.prevFrame = new Date().getTime();
    
    this.renderer.updateAndRender(delta);
    requestAnimationFrame(this.render);
  }
}

export { Game };