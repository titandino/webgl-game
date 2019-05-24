import { Game }  from '/engine/game.js';
import { Asteroids } from '/asteroids.js';

let game = new Game('game-canvas', new Asteroids());
game.init();