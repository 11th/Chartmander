Chartmander.charts.line = function (canvas) {

  var chart = new Chartmander.components.baseChart(canvas);

  ///////////////////////////////////
  // Use Components
  ///////////////////////////////////

  var xAxis     = new Chartmander.components.xAxis()
    , yAxis     = new Chartmander.components.yAxis()
    , grid      = new Chartmander.components.grid()
    , crosshair = new Chartmander.components.crosshair()
    , lines     = new Chartmander.models.lines(chart)
    ;

  ///////////////////////////////////
  // Setup Defaults
  ///////////////////////////////////

  chart
    .onHover(function () {
      chart.draw(true);
    })
    .onLeave(function () {
      if ( chart.completed() ) {
        chart.draw(true);
      }
    })
    .drawChart(function (ctx, _perc_) {
      grid.drawInto(ctx, chart, lines, _perc_);
      
      // if (xAxisVisible) {
        xAxis
          .animIn()
          .drawInto(ctx, chart, lines, _perc_);
      // }

      // if (yAxisVisible) {
        yAxis
          .animIn()
          .drawInto(ctx, chart, lines, _perc_);
      // }

      if (chart.hovered() && crosshair.visible() && grid.hovered(chart.mouse())) {
        crosshair.drawInto(lines);
      }
      
      lines.drawInto(_perc_);
    });
    ;

  grid.margin({left: 70, top: 20});

  ///////////////////////////////
  // Life cycle
  ///////////////////////////////

  var x0, y0;

  var render =  function (data) {
    lines.parse(data, Chartmander.components.point);

    var xrange = getRange(getArrayBy(data, "label"));
    var yrange = getRange(function(){
      var values = [];
      forEach(lines.datasets(), function (set) {
        values.push(set.min());
        values.push(set.max());
      });
      return values;
    }());

    // grid before axes
    grid.adapt(lines);
    // axes use grid height to calculate their scale
    xAxis.adapt(chart, xrange);
    yAxis.adapt(chart, lines, yrange);
    lines.base(grid.bound().bottom - yAxis.zeroLevel());

    lines.recalc(xAxis, yAxis, grid);
    
    chart
      .completed(0)
      .draw(false);
  }

  ///////////////////////////////
  // Binding & Methods
  ///////////////////////////////

  chart.xAxis     = xAxis;
  chart.yAxis     = yAxis;
  chart.grid      = grid;
  chart.crosshair = crosshair;
  chart.lines     = lines;

  chart.render    = render;

  return chart;
};
