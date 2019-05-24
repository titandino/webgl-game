const Utils = {};

Utils.glOrtho = function(shader, width, height) {
    let ortho = [
            2 / width, 0, 0, -1,
            0, 2 / height, 0, -1,
            0, 0, 1, 0,
            0, 0, 0, 1
    ];

    GL.uniformMatrix4fv(shader.getUniformLocation("ortho"), true, ortho);
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