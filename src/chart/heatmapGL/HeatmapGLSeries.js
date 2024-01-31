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

        progressive: 1e5,
        progressiveThreshold: 1e5,

        itemStyle: {
            opacity: 1
        },

        postEffect: {
            enable: false,
            colorCorrection: {
                exposure: 0,
                brightness: 0,
                contrast: 1,
                saturation: 1,
                enable: true
            }
        }
    },

});