import { Utils } from '/engine/util/utils.js';

class Shader {

	constructor(sources) {
		this.uniforms = [];
		this.shaderProgram = -1;
		this.shaders = [];
		for (let i = 0; i < sources.length; i++) {
			if (!sources[i].includes('.frag') && !sources[i].includes('.vert')) {
				console.error('Invalid shader extension: ' + sources[i]);
				return;
			}
			this.shaders[i] = this.loadShader(sources[i].includes('.frag') ? GL.FRAGMENT_SHADER : GL.VERTEX_SHADER, Utils.loadTextAsset('/shaders/' + sources[i]));
		}
		this.shaderProgram = this.createProgram(this.shaders);
		this.fetchUniforms();
	}
    
	loadShader = (shaderType, shaderSource) => {
		let handle = GL.createShader(shaderType);

		if (handle == GL.FALSE)
			throw new Error('Error creating shader!');

		GL.shaderSource(handle, shaderSource);
		GL.compileShader(handle);

		if (!GL.getShaderParameter(handle, GL.COMPILE_STATUS)) {
			GL.deleteShader(handle);
			console.error('Error compiling shader: ' + shaderType);
			console.error(GL.getShaderInfoLog(handle));
			return -1;
		} else
			return handle;
	}

	createProgram = (shaders) => {
		let handle = GL.createProgram();

		if (handle == GL.FALSE)
			throw new Error('Error creating program!');

		for (let i in this.shaders) {
			GL.attachShader(handle, this.shaders[i]);
		}
		GL.linkProgram(handle);

		if (!GL.getProgramParameter(handle, GL.LINK_STATUS)) {
			console.error('Error in program linking: ' + GL.getProgramInfoLog(handle));
			GL.deleteProgram(handle);
		} else
			return handle;
	}

	fetchUniforms = () => {
		let len = GL.getProgramParameter(this.shaderProgram, GL.ACTIVE_UNIFORMS);
		for (let i = 0; i < len; i++) {
			let uniform = GL.getActiveUniform(this.shaderProgram, i);
			this.uniforms[uniform.name] = uniform;
		}
	}

	getUniformLocation = (name) => {
		let location = this.uniforms[name].location;
		if (!location) {
			this.uniforms[name].location = GL.getUniformLocation(this.shaderProgram, name);
		}
		return this.uniforms[name].location;
	}

	use = () => {
		GL.useProgram(this.shaderProgram);
		return this;
	}

	unload = () => {
		GL.deleteProgram(this.shaderProgram);
		for (let i in this.shaders)
			GL.deleteShader(this.shaders[i]);
	}
}

export { Shader };