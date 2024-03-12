// TODO ECharts GL must be imported whatever component,charts is imported.
import '../../echarts-gl';

import ScatterGLSeries from './ScatterGLSeries';
import ScatterGLView from './ScatterGLView';

export function install(registers) {
    registers.registerChartView(ScatterGLView);
    registers.registerSeriesModel(ScatterGLSeries);

    registers.registerLayout({
        seriesType: 'scatterGL',
        reset: function (seriesModel) {
            var coordSys = seriesModel.coordinateSystem;
            var data = seriesModel.getData();

            const boundaryRect = coordSys.master._rect;
            var topLeft = { x: boundaryRect.x, y: boundaryRect.y };
            var bottomRight = { x: boundaryRect.x + boundaryRect.width, y: boundaryRect.y + boundaryRect.height };

            var progress;
            if (coordSys) {
                var dims = coordSys.dimensions.map(function (dim) {
                    return data.mapDimension(dim);
                }).slice(0, 2);
                var pt = [];
                if (dims.length === 1) {
                    progress = function (params) {
                        var points = new Float32Array((params.end - params.start) * 2);
                        for (var idx = params.start; idx < params.end; idx++) {
                            var offset = (idx - params.start) * 2;
                            var x = data.get(dims[0], idx);
                            var pt = coordSys.dataToPoint(x);
                            points[offset] = pt[0];
                            points[offset + 1] = pt[1];
                        }
                        data.setLayout('points', points);
                    };
                }
                else if (dims.length === 2) {
                    progress = function (params) {
                        var points = new Float32Array((params.end - params.start) * 2);
                        for (var idx = params.start; idx < params.end; idx++) {
                            var offset = (idx - params.start) * 2;
                            var x = data.get(dims[0], idx);
                            var y = data.get(dims[1], idx);
                            pt[0] = x;
                            pt[1] = y;

                            pt = coordSys.dataToPoint(pt);
                            points[offset] = pt[0] > topLeft.x && pt[0] < bottomRight.x ? pt[0] : undefined;
                            points[offset + 1] = pt[1] > topLeft.y && pt[1] < bottomRight.y ? pt[1] : undefined;
                        }
                        data.setLayout('points', points);
                    };
                }
            }

            return { progress: progress };
        }
    });
}