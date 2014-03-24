Chartmander.charts.bar = function (canvas) {

  ///////////////////////////////////
  // Use Components
  ///////////////////////////////////

  var layer     = new Chartmander.components.layer(canvas)
    , bars      = new Chartmander.models.bar()
    , xAxis     = new Chartmander.components.xAxis()
    , yAxis     = new Chartmander.components.yAxis()
    , grid      = new Chartmander.components.grid()
    , crosshair = new Chartmander.components.crosshair()
    ;

  bars.layer = layer; // super important

  var xAxisVisible = true
    , yAxisVisible = true
    ;

  ///////////////////////////////////
  // Setup defaults
  ///////////////////////////////////

  layer
    .onHover(function () {
      bars.draw(true);
    })
    .onLeave(function () {
      if ( bars.completed() ) {
        bars.draw(true);
      }
    })
    ;

  bars
    .width(layer.width())
    .height(layer.height())
    ;

  var x0, y0;

  var render =  function (data) {
    bars.parse(data, Chartmander.components.bar);
    var oldYScale; //undefined
    var xrange = getRange(getArrayBy(data, "label"));
    var yrange = getRange(function(){
      var values = [];
      forEach(bars.datasets(), function (set) {
        values.push(set.min());
        values.push(set.max());
      });
      return values;
    }());

    if (bars.updated()) {
      x0 = xAxis.copy(); // just object with labels and scale
      y0 = yAxis.copy();
      oldYScale = y0.scale;
    }
    // grid before axes
    grid.adapt(bars.width(), bars.height(), bars.margin());
    // axes use grid height to calculate their scale
    xAxis.adapt(bars, xrange);
    yAxis.adapt(bars, yrange, oldYScale);

    // recalc old labels to new position
    if (bars.updated()) {
      forEach(y0.labels, function (label) {
        label.savePosition().moveTo(false, bars.base() - label.value()/yAxis.scale());
      });
    }

    bars.recalc(xAxis, yAxis, grid);
    bars.completed(0);
    bars.draw(false);
  }

  bars.drawChart(function (_perc_) {
    var ctx = layer.ctx;

    grid.drawInto(bars, _perc_);

    if (xAxisVisible) {
      xAxis
        .animIn()
        .drawInto(bars, _perc_);
      // if (x0 && x0.state > 0) {
      //   ctx.save();
      //   forEach(x0.labels, function (label) {

      //   });
      //   ctx.restore();
      // } 
    }

    if (yAxisVisible) {
      yAxis
        .animIn()
        .drawInto(bars, _perc_);

      if (y0 && y0.state > 0) {
        ctx.save();
        ctx.textAlign = "right";
        ctx.fillStyle = bars.fontColor();
        ctx.font = bars.font();
        ctx.globalAlpha = y0.state;
        forEach(y0.labels, function (label) {
          label.updatePosition(_perc_);
          ctx.fillText(label.label().toString() + " " + yAxis.unit(), grid.left() - yAxis.margin(), label.y());
        });
        ctx.restore();
        y0.state -= .01;
      }
    }

    bars.drawModel(_perc_);
  });

  bars.xAxis = xAxis;
  bars.yAxis = yAxis;
  bars.grid = grid;
  bars.crosshair = crosshair;

  bars.render = render;

  bars.base = function (_) {
    return grid.bottom() - yAxis.zeroLevel();
  };

  bars.showXAxis = function (_) {
    if (!arguments.length) return xAxisVisible;
    xAxisVisible = _;
    return bars;
  };

  bars.showYAxis = function (_) {
    if (!arguments.length) return yAxisVisible;
    yAxisVisible = _;
    return bars;
  };

  return bars;
}
