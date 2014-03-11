Chartmander.models.lineChart = function (canvas) {

  var chart = new Chartmander.models.chart(canvas);

  var type = "line";
    , lineWidth = 2
    , pointRadius = 5
    , pointHoverRadius = 20
    , drawArea = true
    , areaOpacity = .7
    , mergeHover = true
    , xAxisVisible = true
    , yAxisVisible = true
    ;

  chart.margin({ top: 30, right: 50, bottom: 50, left: 50 });

  ///////////////////////////////////
  // Use components
  ///////////////////////////////////

  var xAxis = new Chartmander.components.xAxis()
    , yAxis = new Chartmander.components.yAxis()
    , grid  = new Chartmander.components.grid()
    ;

  // Construct
  // chart.datasets = getDatasetFrom(data, type, colors);
  // chart.xAxis = getAxesFrom(chart.datasets)[0];
  // chart.itemsInHoverRange = [];

  // var xValues = getArrayBy(data, "label")
  // , yValues = getArrayBy(data, "value")
  // , xRange = getRange(xValues)
  // , yRange = getRange(yValues)
  // Recalculation based on provided data

  var render =  function (data) {
    if (chart.setsCount() == 0) {
      var xrange = getRange(getArrayBy(data, "label"));
      var yrange = getRange(getArrayBy(data, "value"));

      chart.datasets(getDatasetFrom(data, type, chart.colors()));
      // grid before axes
      grid.adapt(chart.width(), chart.height(), chart.margin());
      // axes use grid height to calculate their scale
      xAxis.adapt(chart, xrange);
      yAxis.adapt(chart, yrange);
      recalcPoints();
      chart.draw(drawComponents, false);
    }
    else {
      update(data);
      recalcPoints(true);
      chart.completed(0);
      chart.draw(drawComponents, false)
    }
  }


  chart.recalcPoints = function () {
    var x, y;

    forEach(chart.datasets(), function (set) {
      set.each(function (point) {
        x = Math.ceil(grid.left() + (point.label()-xAxis.min())/xAxis.scale());
        y = chart.base()- point.value()/yAxis.scale();
        point.savePosition(grid.width()/2, chart.base()).moveTo(x, y);
      })
    });
  }

  chart.updatePoints = function (_perc_) {
    forEach(chart.datasets, function (set) {
      set.each(function (point) {
        point.updatePosition(_perc_);
      })
    });
  }

  chart.drawArea = function () {
    ctx.save();

    forEach(chart.datasets, function (set) {
      ctx.fillStyle = set.color();
      ctx.globalAlpha = areaOpacity;

      ctx.beginPath();
      ctx.moveTo(set.element(0).x(), chart.base());
      ctx.lineTo(set.element(0).x(), set.element(0).y());
      set.each(function (point) {
        ctx.lineTo(point.x(), point.y());
      });
      ctx.lineTo(set.element("last").x(), chart.base());
      ctx.fill();
    });

    ctx.restore();
  }

  chart.drawLines = function () {
    ctx.save();
    ctx.lineWidth = lineWidth;
    forEach(chart.datasets(), function (set) {
      ctx.strokeStyle = set.color();
      ctx.beginPath();
      set.each(function (point) {
        ctx.lineTo(point.x(), point.y());
      });
      ctx.stroke();
    });
    ctx.restore();
  }

  chart.drawPoints = function () {
    ctx.save();
    forEach(chart.datasets(), function (set) {
      var hoveredInThisSet = []
        , closestHovered
        ;

      ctx.strokeStyle = set.color();
      ctx.fillStyle = set.color();

      set.each(function (point) {
        point.drawInto(chart, set);
      });

      // Get items only from current set
      // forEach(chart.itemsInHoverRange, function (item) {
      //   if (item.set == set.title) {
      //     hoveredInThisSet.push(item);
      //   }
      // });

      // Find closest hovered
      // for (var i = 0, len = hoveredInThisSet.length; i < len; i++) {
      //   if (i == 0) {
      //     closestHovered = hoveredInThisSet[i];
      //     continue;
      //   }
      //   if (hoveredInThisSet[i].hoverDistance < closestHovered.hoverDistance) {
      //     closestHovered = hoveredInThisSet[i];
      //   }
      // }

      // Control Hovered
      // for (var i = 0, len = hoveredInThisSet.length; i < len; i++) {
      //   if (hoveredInThisSet[i] === closestHovered) {
      //     set.elements[closestHovered.index].animIn();
      //     chart.tooltip.addItem({
      //         set: set.title,
      //         label: set.elements[closestHovered.index].label,
      //         value: set.elements[closestHovered.index].value,
      //         color: set.style.normal.color
      //       })
      //     if (set.elements[closestHovered.index].isAnimated()){
      //       hoverNotFinished = true;
      //     }
      //   } else {
      //     set.elements[hoveredInThisSet[i].index].animOut();
      //   }
      // }
    });
    ctx.restore();
  }

  chart.update = function (data) {
    var i = 0
      , xValues = getArrayBy(data, "label")
      , yValues = getArrayBy(data, "value")
      , xRange = getRange(xValues)
      , yRange = getRange(yValues)
      ;

    // Recalc Axes
    chart.yAxis.dataMin = yRange.min;
    chart.yAxis.dataMax = yRange.max;
    chart.yAxis.recalc(chart);

    chart.xAxis.dataMin = xRange.min;
    chart.xAxis.dataMax = xRange.max;
    chart.xAxis.recalc(chart);

    // Recalc sets
    forEach(line.datasets, function (set) {
      if (data[i] === undefined)
        throw new Error("Missing dataset. Dataset count on update must match.")
      set.merge(data[i], chart);
      set.each(function (point) {
        var x = chart.getGridProperties().left + (point.label - chart.xAxis.dataMin)/chart.xAxis.scale()
          , y = chart.base() - point.value/chart.yAxis.scale();

        point.moveTo(x, y);
      });
      i++;
    });

    chart.animationCompleted = 0;
    chart.draw();
  }


  ///////////////////////////////
  // Public Methods & Variables
  ///////////////////////////////

  chart.xAxis = xAxis;
  chart.yAxis = yAxis;
  chart.grid = grid;

  chart.render = render;
  chart.drawFull = drawFull;

  chart.areaVisible = function (_) {
    if (!arguments.length) return drawArea;
    drawArea = _;
    return chart;
  }

  chart.lineWidth = function (_) {
    if (!arguments.length) return lineWidth;
    lineWidth = _;
    return chart;
  }

  return chart;
};
