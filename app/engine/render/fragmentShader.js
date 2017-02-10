module.exports = `
  uniform vec4 uColor;

  int main(void) {
    gl_fragColor = uColor;
  }
`;
