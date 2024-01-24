export default `@export ecgl.sdfSprite.vertex

uniform mat4 worldViewProjection : WORLDVIEWPROJECTION;
uniform float elapsedTime : 0;

attribute vec3 position : POSITION;

#ifdef VERTEX_COLOR
    attribute vec4 a_FillColor: COLOR;
    varying vec4 v_Color;
#endif

void main()
{
    gl_Position = worldViewProjection * vec4(position, 1.0);

    #ifdef VERTEX_COLOR
        v_Color = a_FillColor;
    #endif

    gl_PointSize = 100.0;
}
@end

@export ecgl.sdfSprite.fragment

varying vec4 v_Color;

void main()
{
    gl_FragColor = vec4(1) * v_Color;
}
@end`
