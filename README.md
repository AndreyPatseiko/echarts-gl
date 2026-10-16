# ECHARTS-GL

ECharts-GL is an extension pack of [Apache ECharts](http://echarts.apache.org/), which providing 3D plots, globe visualization and WebGL acceleration.

## Docs

- [Option Manual](https://echarts.apache.org/zh/option-gl.html)

- [Gallery](https://www.makeapie.com/explore.html#tags=echarts-gl)

- [Changes in this fork](#changes-in-this-fork)

## Installing

### npm and webpack

```bash
npm install echarts
npm install echarts-gl
```

#### Import all

```js
import * as echarts from "echarts";
import "echarts-gl";
```

#### Minimal Import

```js
import * as echarts from "echarts/core";
import { Scatter3DChart } from "echarts-gl/charts";
import { Grid3DComponent } from "echarts-gl/components";

echarts.use([Scatter3DChart, Grid3DComponent]);
```

### Include by scripts

```html
<script src="https://cdn.jsdelivr.net/npm/echarts/dist/echarts.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/echarts-gl/dist/echarts-gl.min.js"></script>
```

NOTE:

ECharts GL 2.x is compatible with ECharts 5.x.
ECharts GL 1.x is compatible with ECharts 4.x.

## Basic Usage

```js
var chart = echarts.init(document.getElementById("main"));
chart.setOption({
  grid3D: {},
  xAxis3D: {},
  yAxis3D: {},
  zAxis3D: {},
  series: [
    {
      type: "scatter3D",
      symbolSize: 50,
      data: [
        [-1, -1, -1],
        [0, 0, 0],
        [1, 1, 1],
      ],
      itemStyle: {
        opacity: 1,
      },
    },
  ],
});
```

## License

ECharts-GL is available under the BSD license.

## Notice

The Apache Software Foundation [Apache ECharts, ECharts](https://echarts.apache.org/), Apache, the Apache feather, and the Apache ECharts project logo are either registered trademarks or trademarks of the [Apache Software Foundation](https://www.apache.org/).

</br>
</br>

# Changes in this fork

The fork has been updated to the echart v.6.0.0.

1. New chart type - `heatmapGL` - was developed. \
   This chart was based on the scatterGL. And it has some limitation on styling in `itemStyle` (you can't use borders, or emphasis options).
   You can find example in <b>./test/hetamapGL-simple.html</b>

2. `ScatterGL`
   - items outside the grid boundary have been excluded from the rendering process.
   - <b>Only for series.large = false (default)</b>
     - The behavior for tooltip was fixed. Now it works with single item and with trigger = "axis".
     - The tooltip doesn't appear if the item is hidden by the visual map.
   - The warning - Canvas2D: Multiple readback operations using getImageData are faster with the willReadFrequently attribute set to true. See:sprite.js:132 - was fixed

3. `Fix for warning - 'Too many active WebGL contexts' has been added`. \
   Issue - [Too many active WebGL contexts warning](https://github.com/ecomfe/echarts-gl/issues/439) was added from [not merged PR](https://github.com/ecomfe/echarts-gl/pull/440)

4. The behavior of tooltips when connecting charts has been fixed. It works the same as with regular charts.

## Installing

```bash
npm i github:AndreyPatseiko/echarts-gl#v2.1.1
```

## Deploy

```bash
npm run release
```

Then push all files in `dist` folder to the repo.
