class Texture {

    constructor(textureId) {
    	this.textureId = textureId;
    }

    bind = (gl) => {
        gl.glActiveTexture(gl.GL_TEXTURE0);
        gl.glBindTexture(gl.GL_TEXTURE_2D, this.textureId);
    }

    bind = (gl, uniform) => {
        gl.glActiveTexture(gl.GL_TEXTURE0);
        gl.glBindTexture(gl.GL_TEXTURE_2D, this.textureId);
        gl.glUniform1i(uniform, 0);
    }

    release = (gl) => {
        gl.glDeleteTextures(this.textureId);
    }
}

export { Texture };