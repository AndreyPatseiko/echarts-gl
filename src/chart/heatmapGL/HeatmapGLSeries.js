/*
* File based on scatterGL/ScatterGLSeries.js
*/
import * as echarts from 'echarts/lib/echarts';

export default echarts.SeriesModel.extend({

    type: 'series.heatmapGL',

    dependencies: ['grid'],

    getInitialData: function () {
        return echarts.helper.createList(this);
    },

    defaultOption: {
        coordinateSystem: 'cartesian2d',
        zlevel: 10,
        itemStyle: {
            opacity: 1
        },
    },

});