import * as echarts from 'echarts/lib/echarts';
import graphicGL from '../../util/graphicGL';
import spriteUtil from '../../util/sprite';
import PointsMesh from './SquareMesh';
import LabelsBuilder from '../../component/common/LabelsBuilder';
import Matrix4 from 'claygl/src/math/Matrix4';
import retrieve from '../../util/retrieve';
import { getItemVisualColor, getItemVisualOpacity } from '../../util/visual';

var SDF_RANGE = 20;

var Z_2D = -10;

function isSymbolSizeSame(a, b) {
    return a && b && a[0] === b[0] && a[1] === b[1];
}
// TODO gl_PointSize has max value.
function SquareBuilder(is2D, api) {
    this.rootNode = new graphicGL.Node();
    this.is2D = true;
    this._startDataIndex = 0;
    this._endDataIndex = 0;
}

SquareBuilder.prototype = {

    constructor: SquareBuilder,

    update: function (seriesModel, ecModel, api, start, end) {
        var data = seriesModel.getData();

        if (start == null) {
            start = 0;
        }
        if (end == null) {
            end = data.count();
        }

        this._mesh = new PointsMesh();        
        var attributes = this._mesh.geometry.attributes;

        // add mesh to rootNode
        this.rootNode.add(this._mesh);

        // init
        attributes.position.init(3);

        var points = new Float32Array([100, 100, 300, 300, 100, 300]);
        console.log(points);
        var positionArr = attributes.position.value;

        for (var i = 0; i < 3; i++) {
            var i3 = i * 3;
            var i2 = i * 2;
            positionArr[i3] = points[i2];
            positionArr[i3 + 1] = points[i2 + 1];
            positionArr[i3 + 2] = Z_2D;
        }
    },
};

export default SquareBuilder;
