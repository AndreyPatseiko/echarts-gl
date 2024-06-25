/** 
 * File based on scatterGL/ScatterGLView.js
*/

import * as echarts from 'echarts/lib/echarts';
import graphicGL from '../../util/graphicGL';
import ViewGL from '../../core/ViewGL';
import SquareBuilder from '../common/SquareBuilder';

import GLViewHelper from '../common/GLViewHelper';

export default echarts.ChartView.extend({

    type: 'heatmapGL', // changed

    __ecgl__: true,

    init: function (ecModel, api) {

        this.groupGL = new graphicGL.Node();
        this.viewGL = new ViewGL('orthographic');

        this.viewGL.add(this.groupGL);

        this._glViewHelper = new GLViewHelper(this.viewGL);
    },

    render: function (seriesModel, ecModel, api) {
        this.groupGL.removeAll();
        this._glViewHelper.reset(seriesModel, api);

        if (!seriesModel.getData().count()) {
            return;
        }

        this._pointsBuilder = new SquareBuilder(api);

        this.groupGL.add(this._pointsBuilder.rootNode);

        this._pointsBuilder.update(seriesModel, ecModel, api);
    },

    dispose: function () {
        this.groupGL.removeAll();        
        this._pointsBuilder.dispose();        
    },

    remove: function () {
        this.groupGL.removeAll();
    }
});
