import { Mesh } from '/engine/render/mesh.js';

const MeshManager = { };
    
const SQUARE_VTX = new Float32Array([
        0.0, 0.0,
        0.0, 1.0,
        1.0, 0.0,
        1.0, 1.0,
    ]);

const SQUARE_TEX = new Float32Array([
        0.0, 1.0,
        0.0, 0.0,
        1.0, 1.0,
        1.0, 0.0,
    ]);

let MESH_CACHE = {};

MeshManager.init = function() {
    MeshManager.unloadMeshes();
    GL.enableVertexAttribArray(0);
    GL.enableVertexAttribArray(1);
};

MeshManager.mapMesh = function(name, vertices, textureCoords) {
    MESH_CACHE[name] = new Mesh(vertices, textureCoords);
};

MeshManager.getMesh = function(name) {
    return MESH_CACHE[name];
};

MeshManager.defaultMesh = function() {
    return MESH_CACHE['square'];
};

MeshManager.unloadMeshes = function() {
    for (let key in MESH_CACHE) {
        if (MESH_CACHE[key])
            MESH_CACHE[key].unload();
    }
    MESH_CACHE = {};
    MeshManager.mapMesh('square', SQUARE_VTX, SQUARE_TEX);
};

export { MeshManager };