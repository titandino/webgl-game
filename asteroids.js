import { Level } from '/engine/level.js';
import { Entity } from '/engine/entity/entity.js';
import { Vector2f } from '/engine/math/vector2f.js';

import { MeshManager } from '/engine/util/meshmanager.js';
import { TextureManager } from '/engine/util/texturemanager.js';

class Asteroids extends Level {

    constructor() {
        super(1920, 1080);
    }

    init = () => {
        this.background = this.addEntity(new Entity(new Vector2f(this.width/2, this.height/2), new Vector2f(this.width, this.height), MeshManager.defaultMesh(), TextureManager.loadTexture('background.png')));
        this.ship = this.addEntity(new Entity(new Vector2f(this.width/2, this.height/2), new Vector2f(64, 64), MeshManager.defaultMesh(), TextureManager.loadTexture('ship.png')));
    }

    update = () => {
        this.ship.rotation += 0.5;
    }
}

export { Asteroids };