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
        this.addEntity(new Entity(new Vector2f(1, 1), new Vector2f(0, 0), 24, 24, MeshManager.defaultMesh(), TextureManager.loadTexture('/textures/ship.png')));
    }

}

export { Asteroids };