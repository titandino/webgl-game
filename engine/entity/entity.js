import { Vector2f } from '/engine/math/vector2f.js';

class Entity {

    constructor(position, scale, mesh, texture, texFbo = false) {
        this.position = position;
        this.scale = scale;
        this.rotation = 0;
        this.mesh = mesh;
        this.texture = texture;
        this.texFbo = texFbo;

        this.velocity = new Vector2f(0, 0);
    }

    update = (delta) => {  }

    _update = (delta) => {
        this.update(delta);
        this.position = this.position.add(this.velocity.scale(delta));
    }

    render = (shader) => { }

    _render = (shader) => {
        this.mesh.bind();
        this.texture.bind(shader.getUniformLocation('tex'));

        //Flip y axis of texture coordinates if it is an FBO as a texture
        GL.uniform1i(shader.getUniformLocation('flip'), this.texFbo ? 1 : 0);

        GL.uniform4fv(shader.getUniformLocation('color'), new Float32Array([!this.color ? 2.0 : this.color.getRed() / 255.0, !this.color ? 2.0 : this.color.getGreen() / 255.0, !this.color ? 2.0 : this.color.getBlue() / 255.0, !this.color ? 2.0 : this.color.getAlpha() / 255.0 ]));

        //Pass transformation to shader
        GL.uniform2fv(shader.getUniformLocation('translation'), new Float32Array([ this.position.x, this.position.y ]));
        GL.uniform1f(shader.getUniformLocation('rotation'), this.rotation);
        GL.uniform2fv(shader.getUniformLocation('scale'), new Float32Array([ this.scale.x, this.scale.y ]));

        //Draw the entity
        GL.drawArrays(GL.TRIANGLE_STRIP, 0, 4);
    }

    collides = (vec) => {
        if (vec.x > (this.position.x+this.scale.x/2))
            return false;
        if (vec.x < (this.position.x-this.scale.x/2))
            return false;
        if (vec.y > (this.position.y+this.scale.y/2))
            return false;
        if (vec.y < (this.position.y-this.scale.y/2))
            return false;
        return true;
    }
}

export { Entity };