export default `@export ecgl.sdfSprite.vertex

uniform mat4 worldViewProjection : WORLDVIEWPROJECTION;
uniform float elapsedTime : 0;

attribute vec3 position : POSITION;
attribute vec4 a_FillColor: COLOR;
varying vec4 v_Color;

void main()
{
    gl_Position = worldViewProjection * vec4(position, 1.0);
    gl_PointSize = 50.0;
    v_Color = a_FillColor;
}
@end

@export ecgl.sdfSprite.fragment
uniform vec4 color: [1, 1, 1, 1];
varying vec4 v_Color;

void main()
{    
    gl_FragColor = color * v_Color;
    //  gl_FragColor = vec4(1.0, 0,0,1.0);
}
@end`
