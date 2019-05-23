

class Entity {

    constructor(position, velocity, width, height, mesh, texture) {
        this.position = position;
        this.velocity = velocity;
        this.scale = new Vector2f(width, height);
        this.rotation = 0;
        this.mesh = mesh;
        this.texture = texture;
        this.texFbo = texture instanceof FBO;
    }

    update = (delta) => {  }

    _update = (delta) => {
        update(delta);
        position = position.add(velocity.scale(delta));
    }

    render = (gl, shader) => { }

    _render = (gl, shader) => {
        this.mesh.bind();
        this.texture.bind(shader.getUniformLocation('tex'));

        //Flip y axis of texture coordinates if it is an FBO as a texture
        gl.glUniform1i(shader.getUniformLocation('flip'), this.texFbo ? 1 : 0);

        gl.glUniform4fv(shader.getUniformLocation('color'), [ this.color ? 2.0 : this.color.getRed() / 255, this.color ? 2.0 : this.color.getGreen() / 255, this.color ? 2.0 : this.color.getBlue() / 255, this.color ? 2.0 : this.color.getAlpha() / 255 ]);

        //Pass transformation to shader
        gl.glUniform2fv(shader.getUniformLocation('translation'), [ this.position.x, this.position.y ]);
        gl.glUniform1f(shader.getUniformLocation('rotation'), this.rotation);
        gl.glUniform2fv(shader.getUniformLocation('scale'), [ this.scale.x, this.scale.y ]);

        //Draw the entity
        gl.glDrawArrays(gl.GL_TRIANGLE_STRIP, 0, 4);
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
