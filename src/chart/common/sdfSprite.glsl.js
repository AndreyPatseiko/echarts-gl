export default `@export ecgl.sdfSprite.vertex

uniform mat4 worldViewProjection : WORLDVIEWPROJECTION;
uniform float elapsedTime : 0;

attribute vec3 position : POSITION;

void main()
{
    gl_Position = worldViewProjection * vec4(position, 1.0);
    gl_PointSize = 50.0;
}
@end

@export ecgl.sdfSprite.fragment

varying vec4 v_Color;

void main()
{
    gl_FragColor = vec4(0.5, 0.5, 0.5, 1.0);
}
@end`
