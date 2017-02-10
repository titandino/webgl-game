module.exports = `
  attribute vec4 position;
  uniform mat4 uTransform;

  int main(void) {
    gl_Position = position * uTransform;
  }
`;
