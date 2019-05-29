class Texture {

    constructor(textureId) {
    	this.textureId = textureId;
    }

    bind = () => {
        GL.activeTexture(GL.TEXTURE0);
        GL.bindTexture(GL.TEXTURE_2D, this.textureId);
    }

    bind = (uniform) => {
        GL.activeTexture(GL.TEXTURE0);
        GL.bindTexture(GL.TEXTURE_2D, this.textureId);
        GL.uniform1i(uniform, 0);
    }

    release = () => {
        GL.deleteTextures(this.textureId);
    }
}

export { Texture };