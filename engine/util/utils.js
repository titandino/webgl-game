const Utils = {};

Utils.glOrtho = function(shader, width, height) {
    let ortho = new Float32Array([
            2.0 / width, 0.0, 0.0, -1.0,
            0.0, 2.0 / height, 0.0, -1.0,
            0.0, 0.0, 1.0, 0.0,
            0.0, 0.0, 0.0, 1.0
    ]);

    GL.uniformMatrix4fv(shader.getUniformLocation('ortho'), true, ortho);
}

Utils.loadTextAsset = function(path) {
    let req = new XMLHttpRequest();
    req.open('GET', path, false);
    req.send(null);
  
    if (req.status === 200) {
      return req.responseText;
    } else {
      console.error('Error: ' + req.status);
      return null;
    }
}

export { Utils };