import { Texture } from '/engine/render/texture.js';

class FBO extends Texture {

  constructor(width, height) {
		super(GL.createTexture());
		this.width = width;
		this.height = height;
		
		// Load in an empty texture with specified size.
		GL.bindTexture(GL.TEXTURE_2D, this.textureId);
		GL.texImage2D(GL.TEXTURE_2D, 0, GL.RGBA, this.width, this.height, 0, GL.RGBA, GL.UNSIGNED_BYTE, null);
		GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_MAG_FILTER, GL.NEAREST);
		GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_MIN_FILTER, GL.NEAREST);
		
		this.fboId = GL.createFramebuffer();
		// Generate the frame buffer, bind it, and attach the texture to it.
		GL.bindFramebuffer(GL.FRAMEBUFFER, this.fboId);
		GL.framebufferTexture2D(GL.FRAMEBUFFER, GL.COLOR_ATTACHMENT0, GL.TEXTURE_2D, this.textureId, 0);
		let status = GL.checkFramebufferStatus(GL.FRAMEBUFFER);
		if (status != GL.FRAMEBUFFER_COMPLETE)
			console.error('Error loading framebuffer ' + status);
		GL.bindFramebuffer(GL.FRAMEBUFFER, null);
	}

	bind = (uniform) => {
		GL.bindTexture(GL.TEXTURE_2D, this.textureId);
	}

	bindFBO = () => {
		GL.bindFramebuffer(GL.FRAMEBUFFER, this.fboId);
	}

	unbindFBO = () => {
		GL.bindFramebuffer(GL.FRAMEBUFFER, null);
	}
}

export { FBO };