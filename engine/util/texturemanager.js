import { Texture } from '/engine/render/texture.js';

const TextureManager = { };

TextureManager.loadTexture = function(url) {
    const texture = new Texture(GL.createTexture());
    texture.bind();

    GL.texImage2D(GL.TEXTURE_2D, 0, GL.RGBA, 1, 1, 0, GL.RGBA, GL.UNSIGNED_BYTE, new Uint8Array([0, 0, 255, 255]));
  
    const image = new Image();
    image.onload = function() {
      texture.bind();
      GL.texImage2D(GL.TEXTURE_2D, 0, GL.RGBA, GL.RGBA, GL.UNSIGNED_BYTE, image);

      if ((image.width & (image.width - 1)) == 0 && (image.height & (image.height - 1))) {
         GL.generateMipmap(GL.TEXTURE_2D);
      } else {
         GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_WRAP_S, GL.CLAMP_TO_EDGE);
         GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_WRAP_T, GL.CLAMP_TO_EDGE);
         GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_MIN_FILTER, GL.LINEAR);
      }
    };
    image.src = '/textures/'+url;
  
    return texture;
  }

  export { TextureManager };