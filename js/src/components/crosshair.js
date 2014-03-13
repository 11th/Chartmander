Chartmander.components.crosshair = function () {

  var crosshair = this;

  var x = null
    , y = null
    , visible = true
    , sticky = true
    , color = "#555"
    , lineWidth = 1
    ;


  var drawInto = function (chart) {
    var ctx = chart.ctx;

    ctx.save();
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;

    if (chart.grid.hasInRangeX(chart.config.mouse)) {
      x = chart.mouse().x;
      if (sticky && chart.itemsInHoverRange.length > 0) {
        var availablePoints = [];

        forEach(chart.hoveredItems, function (point) {
          availablePoints.push(point.position.x);
        })
        x = closestElement(x, availablePoints);
      }
    }
    else
      return;

    chart.ctx.beginPath();
    chart.ctx.moveTo(x, chart.grid.top());
    chart.ctx.lineTo(x, chart.grid.bottom());
    chart.ctx.stroke();
    chart.ctx.restore();
  }

  ///////////////////////////////
  // Public Methods & Variables
  ///////////////////////////////


  return crosshair;
}
