import { Utils } from '/engine/util/utils.js';

class Level {

    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.renderer = null;
        this.entities = [];
    }

    init = (shader) => { };

    update = (delta) => { };

    render = (shader) => { };

    postProcess = (fbo) => {
        return null;
    }

    renderUI = (shader) => {

    }

    _update = (delta) => {
        this.update(delta);

        for (let i in this.entities) {
            if (this.entities[i]) {
                this.entities[i]._update(delta);
            }
        }
    }

    _render = (shader, fbo) => {
        //Bind the render shader
        shader.use();
        //Bind the FBO for drawing to
        fbo.bindFBO();

        //Set the viewport and orthogonal matrix to full texture resolution
        //glOrtho(0, width, 0, height, -1, 1);
        Utils.glOrtho(shader, this.width, this.height);
        GL.viewport(0, 0, this.width, this.height);

        //Clear the previous frame and render all entities
        GL.clear(GL.COLOR_BUFFER_BIT);
        for (let i in this.entities) {
            if (this.entities[i]) {
                this.entities[i]._render(shader);
            }
        }
        //Render extra functionality
        this.render(shader);
        //Finish rendering to FBO by unbinding it
        fbo.unbindFBO();
    }

    addEntity = (entity) => {
        this.entities.push(entity);
    }

    removeEntity = (entity) => {
        this.entities.remove(entity);
    }
    
    setRenderer = (renderer) => {
    	this.renderer = renderer;
    }
}

export { Level };