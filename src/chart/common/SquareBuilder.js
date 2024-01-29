import * as echarts from 'echarts/lib/echarts';
import graphicGL from '../../util/graphicGL';
import spriteUtil from '../../util/sprite';
import PointsMesh from './SquareMesh';
import LabelsBuilder from '../../component/common/LabelsBuilder';
import retrieve from '../../util/retrieve';
import { getItemVisualColor, getItemVisualOpacity } from '../../util/visual';

var SDF_RANGE = 20;

var Z_2D = -10;

function isSymbolSizeSame(a, b) {
    return a && b && a[0] === b[0] && a[1] === b[1];
}
// TODO gl_PointSize has max value.
function SquareBuilder(api) {
    this.rootNode = new graphicGL.Node();

    this._labelsBuilder = new LabelsBuilder(256, 256, api);
    // Give a large render order.
    this._labelsBuilder.getMesh().renderOrder = 100;
    this.rootNode.add(this._labelsBuilder.getMesh());

    this._startDataIndex = 0;
    this._endDataIndex = 0;

    this._api = api;
}

SquareBuilder.prototype = {

    constructor: SquareBuilder,

    /**
    * If highlight on over
    */
    highlightOnMouseover: true,

    update: function (seriesModel, ecModel, api, start, end) {
        // Swap barMesh
        var tmp = this._prevMesh;
        this._prevMesh = this._mesh;
        this._mesh = tmp;

        var data = seriesModel.getData();

        var dataCount = data.count();

        if (start == null) {
            start = 0;
        }
        if (end == null) {
            end = dataCount;
        }

        this._startDataIndex = start;
        this._endDataIndex = end - 1;

        if (!this._mesh) {
            var material = this._prevMesh && this._prevMesh.material;
            this._mesh = new PointsMesh({
                // Render after axes
                renderOrder: 10,
                // FIXME
                frustumCulling: false
            });
            if (material) {
                this._mesh.material = material;
            }
        }

        // this._mesh = new PointsMesh();
        var material = this._mesh.material;
        var attributes = this._mesh.geometry.attributes;

        // add mesh to rootNode
        this.rootNode.remove(this._prevMesh);
        this.rootNode.add(this._mesh);

        // activate color attribute
        material.define('VERTEX_COLOR');

        /* Getting width and height one cell */
        var coordSys = seriesModel.coordinateSystem;
        var xAxis = coordSys.getAxis('x');
        var yAxis = coordSys.getAxis('y');
        var cellSize = { w: xAxis.getBandWidth(), h: yAxis.getBandWidth() };
        const half = { w: cellSize.w / 2, h: cellSize.h / 2 }
        var points = data.getLayout('points');


        // init
        attributes.position.init(dataCount * 6);
        attributes.color.init(dataCount * 6);

        var positionArr = attributes.position.value;

        var rgbaArr = [];

        for (var i = 0; i < dataCount; i++) {
            var i3 = i * 18;
            var i2 = i * 2;

            var centerX = points[i2];
            var centerY = points[i2 + 1];

            var px0 = centerX - half.w + 1;
            var py0 = centerY - half.h;

            var px1 = px0;
            var py1 = py0 + cellSize.h;

            var px2 = px0 + cellSize.w;
            var py2 = py1;

            var px3 = px2;
            var py3 = py0;

            // Triangle 1
            positionArr[i3] = px0;
            positionArr[i3 + 1] = py0;
            positionArr[i3 + 2] = Z_2D;

            positionArr[i3 + 3] = px1;
            positionArr[i3 + 4] = py1;
            positionArr[i3 + 5] = Z_2D;

            positionArr[i3 + 6] = px2;
            positionArr[i3 + 7] = py2;
            positionArr[i3 + 8] = Z_2D;

            // Triangle 2
            positionArr[i3 + 9] = px0;
            positionArr[i3 + 10] = py0;
            positionArr[i3 + 11] = Z_2D;

            positionArr[i3 + 12] = px2;
            positionArr[i3 + 13] = py2;
            positionArr[i3 + 14] = Z_2D;

            positionArr[i3 + 15] = px3;
            positionArr[i3 + 16] = py3;
            positionArr[i3 + 17] = Z_2D;

            var color = getItemVisualColor(data, i);
            var opacity = color && getItemVisualOpacity(data, i) || 0;
            graphicGL.parseColor(color, rgbaArr);
            rgbaArr[3] *= opacity;
            var col = i * 6;
            attributes.color.set(col, rgbaArr);
            attributes.color.set(col + 1, rgbaArr);
            attributes.color.set(col + 2, rgbaArr);
            attributes.color.set(col + 3, rgbaArr);
            attributes.color.set(col + 4, rgbaArr);
            attributes.color.set(col + 5, rgbaArr);
        }
        // console.log('positionArr', positionArr);
        this._updateLabelBuilder(seriesModel, start, end);

        // this._updateHandler(seriesModel, ecModel, api);

        this._updateAnimation(seriesModel);

        this._api = api;
    },

    getPointsMesh: function () {
        return this._mesh;
    },
    _updateLabelBuilder: function (seriesModel, start, end) {
        var data = seriesModel.getData();
        var geometry = this._mesh.geometry;
        var positionArr = geometry.attributes.position.value;
        var start = this._startDataIndex;
        var pointSizeScale = this._mesh.sizeScale;
        this._labelsBuilder.updateData(data, start, end);

        this._labelsBuilder.getLabelPosition = function (dataIndex, positionDesc, distance) {
            var idx3 = (dataIndex - start) * 3;
            return [positionArr[idx3], positionArr[idx3 + 1], positionArr[idx3 + 2]];
        };

        this._labelsBuilder.getLabelDistance = function (dataIndex, positionDesc, distance) {
            var size = geometry.attributes.size.get(dataIndex - start) / pointSizeScale;
            return size / 2 + distance;
        };
        this._labelsBuilder.updateLabels();

    },

    _updateAnimation: function (seriesModel) {
        graphicGL.updateVertexAnimation(
            [['prevPosition', 'position'],
            ['prevSize', 'size']],
            this._prevMesh,
            this._mesh,
            seriesModel
        );
    },

};

export default SquareBuilder;
