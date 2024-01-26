import graphicGL from '../../util/graphicGL';

import sdfSpriteGLSL from './sdfSprite.glsl.js';
graphicGL.Shader.import(sdfSpriteGLSL);

var SquareMesh = graphicGL.Mesh.extend(function () {
    var geometry = new graphicGL.Geometry({
        dynamic: true,
        attributes: {
            color: new graphicGL.Geometry.Attribute('color', 'float', 4, 'COLOR'),
            position: new graphicGL.Geometry.Attribute('position', 'float', 3, 'POSITION'),
        }
    });

    var material = new graphicGL.Material({
        shader: graphicGL.createShader('ecgl.sdfSprite'),
    });

    return {
        geometry: geometry,
        material: material,
        mode: graphicGL.Mesh.POINTS,

        sizeScale: 1
    };
}, {
});

export default SquareMesh;