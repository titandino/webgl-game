import { Texture } from '/engine/render/texture.js';

class FBO extends Texture {
    constructor(width, height) {
		super(glGenTextures());
		this.width = width;
		this.height = height;
		
		// Load in an empty texture with specified size.
		glBindTexture(GL_TEXTURE_2D, textureId);
		glTexImage2D(GL_TEXTURE_2D, 0, GL_RGBA, width, height, 0, GL_RGBA, GL_UNSIGNED_BYTE, 0);
		glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_MAG_FILTER, GL_NEAREST);
		glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_MIN_FILTER, GL_NEAREST);
		
		this.fboId = glGenFramebuffers();
		// Generate the frame buffer, bind it, and attach the texture to it.
		glBindFramebuffer(GL_FRAMEBUFFER, fboId);
		glFramebufferTexture2D(GL_FRAMEBUFFER, GL_COLOR_ATTACHMENT0, GL_TEXTURE_2D, textureId, 0);
		let status = glCheckFramebufferStatus(GL_FRAMEBUFFER);
		if (status != GL_FRAMEBUFFER_COMPLETE)
			System.err.println("Error creating FBO");
		glBindFramebuffer(GL_FRAMEBUFFER, 0);
	}

	bind(uniform) {
		glBindTexture(GL_TEXTURE_2D, fboId);
	}

	bindFBO() {
		glBindFramebuffer(GL_FRAMEBUFFER, fboId);
	}

	unbindFBO() {
		glBindFramebuffer(GL_FRAMEBUFFER, 0);
	}
}