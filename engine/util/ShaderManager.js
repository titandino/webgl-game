let ShaderManager = {};

ShaderManager.allShaders = {};
ShaderManager.SHADER_TYPE_FRAGMENT = "x-shader/x-fragment";
ShaderManager.SHADER_TYPE_VERTEX = "x-shader/x-vertex";

ShaderManager.createAttachLinkProgram = function(gl, vertex, fragment) {
  ShaderManager.loadShader(vertex, ShaderManager.SHADER_TYPE_VERTEX);
  ShaderManager.loadShader(fragment, ShaderManager.SHADER_TYPE_FRAGMENT);

  let vertexShader = ShaderManager.getShader(gl, vertex);
  let fragmentShader = ShaderManager.getShader(gl, fragment);

  let prog = gl.createProgram();
  gl.attachShader(prog, vertexShader);
  gl.attachShader(prog, fragmentShader);
  gl.linkProgram(prog);

  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
    console.error('Error loading shaders.');
  }

  return prog;
};

ShaderManager.loadShader = function(file, type) {
  let cache, finished;

  let req = new XMLHttpRequest();
  req.open('GET', '/shaders/' + file, false);
  req.send(null);

  if (req.status === 200) {
    cache = { script: req.responseText, type: type };
  } else {
    console.log('Error: ' + req.status);
  }

  ShaderManager.allShaders[file] = cache;
};

ShaderManager.getShader = function(gl, id) {
  let shaderObj = ShaderManager.allShaders[id];
  let shaderScript = shaderObj.script;
  let shaderType = shaderObj.type;

  let shader;
  if (shaderType == "x-shader/x-fragment") {
    shader = gl.createShader(gl.FRAGMENT_SHADER);
  } else if (shaderType == "x-shader/x-vertex") {
    shader = gl.createShader(gl.VERTEX_SHADER);
  } else {
    return null;
  }

  gl.shaderSource(shader, shaderScript);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error('Error in shader: ' + shaderType);
    console.error(gl.getShaderInfoLog(shader));
    return null;
  }

  return shader;
};

export { ShaderManager };