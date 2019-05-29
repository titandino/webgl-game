#version 300 es

#ifdef GL_FRAGMENT_PRECISION_HIGH
    precision highp float;
#else
    precision mediump float;
#endif
    precision mediump int;

uniform sampler2D tex;
uniform vec4 color;
uniform bool flip;

in vec4 texCoord;
out vec4 finalColor;

void main(void) {
    if (flip)
        finalColor = texture(tex, vec2(texCoord.x, abs(texCoord.y - 1.0)));
    else
        finalColor = texture(tex, texCoord.xy);
    if (color.x < 1.0) {
        finalColor = mix(color, finalColor, 0.5);
    }
}
