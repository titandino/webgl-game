class Mesh {

    constructor(vertices, texCoords) {
        this.vertices = vertices;
        this.texCoords = texCoords;
        this.loaded = false;
        this.bound = false;
        this.vertexVao = -1;
        this.textureVao = -1;
    }

    load = () => {
        if (this.loaded)
            return this;
        //Generate 2 buffers to hold the mesh data
        this.vertexVao = GL.createBuffer();
        this.textureVao = GL.createBuffer();

        //Insert vertices into VAO
        GL.bindBuffer(GL.ARRAY_BUFFER, this.vertexVao);
        GL.bufferData(GL.ARRAY_BUFFER, this.vertices, GL.STATIC_DRAW);

        //Insert texture coordinates into VAO
        GL.bindBuffer(GL.ARRAY_BUFFER, this.textureVao);
        GL.bufferData(GL.ARRAY_BUFFER, this.texCoords, GL.STATIC_DRAW);
        this.loaded = true;
        return this;
    }

    bind = () => {
        if (this.bound)
            return;
        this.load();

        //Use this mesh's vertices in VAO #0
        GL.bindBuffer(GL.ARRAY_BUFFER, this.vertexVao);
        GL.enableVertexAttribArray(0);
        GL.vertexAttribPointer(0, 2, GL.FLOAT, false, 0, 0);

        //Use this mesh's texture coordinates VAO #1
        GL.bindBuffer(GL.ARRAY_BUFFER, this.textureVao);
        GL.enableVertexAttribArray(1);
        GL.vertexAttribPointer(1, 2, GL.FLOAT, false, 0, 0);
        this.bound = true;
    }

    unload = () => {
        if (!this.loaded)
            return;
        this.loaded = false;
        this.bound = false;
        GL.deleteBuffers(this.vertexVao);
        GL.deleteBuffers(this.textureVao);
        return;
    }
}

export { Mesh };