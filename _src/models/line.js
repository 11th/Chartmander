Chartmander.models.line = function () {

  var chart = new Chartmander.models.base();

  var lineWidth        = 2
    , showPoint        = true
    , pointRadius      = 5
    , pointHoverRadius = 20
    , pointHoverColor  = "orange"
    , areaVisible      = true
    , areaOpacity      = .29
    , mergeHover       = true
    , hoveredItems     = []
    , base             = 0
    , startPosition    = "direct" // or direct
    ;

  chart.margin({ top: 0, right: 0, bottom: 0, left: 0 });

  var recalc = function (xAxis, yAxis, grid) {
    var x, y;
    forEach(chart.datasets(), function (set) {
      set.each(function (point) {
        // time axis specific
        x = Math.ceil(grid.bound().left + (point.label() - xAxis.min())/xAxis.scale());
        y = chart.base() - point.value()/yAxis.scale();
        if (chart.updated()) {
          point.savePosition();
        } else {
          if (startPosition == "center")
            point.savePosition(chart.margin().left + grid.width()/2, chart.base());
          if (startPosition == "direct")
            point.savePosition(x, chart.base());
        }
        point.moveTo(x, y);
      });
    });
    return chart;
  }

  var updatePoints = function (set, _perc_) {
    set.each(function (point) {
      point.updatePosition(_perc_);
    });
  }

  var drawArea = function (set) {
    var ctx = chart.layer.ctx;
    ctx.save();
    ctx.fillStyle = set.color();
    ctx.globalAlpha = areaOpacity;
    ctx.beginPath();
    ctx.moveTo(set.getElement(0).x(), chart.base());
    ctx.lineTo(set.getElement(0).x(), set.getElement(0).y());
    set.each(function (point) {
      ctx.lineTo(point.x(), point.y());
    });
    ctx.lineTo(set.getElement("last").x(), chart.base());
    ctx.fill();
    ctx.restore();
  }

  var drawLines = function (set) {
    var ctx = chart.layer.ctx;
    ctx.save();
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = set.color();
    ctx.beginPath();
    set.each(function (point) {
      ctx.lineTo(point.x(), point.y());
    });
    ctx.stroke();
    ctx.restore();
  }

  var drawPoints = function (set) {
    var ctx = chart.layer.ctx;
    ctx.save();
    ctx.strokeStyle = set.color();
    ctx.fillStyle = set.color();
    set.each(function (point) {
      point.drawInto(chart, set);
    });

    // With high-density data there can be more hovered points
    // We need to find the one with the lowest distance from mouse

    if (hoveredItems.length > 0) {
      var closestHovered = hoveredItems[0];

      for (var i = 1, len = hoveredItems.length; i < len; i++) {
        if (hoveredItems[i].distance < closestHovered.distance)
          closestHovered = hoveredItems[i];
      }
      closestHovered = set.getElement(closestHovered.index);
      closestHovered.animIn();
      chart.layer.tooltip.addItem({
        "set"  : set.title(),
        "label": closestHovered.label(),
        "value": closestHovered.value(),
        "x"    : closestHovered.x(),
        "color": set.color()
      });
    }

    ctx.restore();
  }

  var drawModel = function (_perc_) {
    forEach(chart.datasets(), function (set) {
      hoveredItems = [];
      updatePoints(set, _perc_);
      if (areaVisible) {
        drawArea(set);
      }
      drawLines(set);
      if (showPoint)
        drawPoints(set);
    });
  }

  ///////////////////////////////
  // Public Methods
  ///////////////////////////////

  chart.recalc = recalc;
  chart.drawModel = drawModel;

  chart.areaVisible = function (_) {
    if (!arguments.length) return areaVisible;
    areaVisible = _;
    return chart;
  }

  chart.areaOpacity = function (_) {
    if (!arguments.length) return areaOpacity;
    areaOpacity = _;
    return chart;
  }

  chart.lineWidth = function (_) {
    if (!arguments.length) return lineWidth;
    lineWidth = _;
    return chart;
  }

  chart.pointRadius = function (_) {
    if (!arguments.length) return pointRadius;
    pointRadius = _;
    return chart;
  }

  chart.pointHoverRadius = function (_) {
    if (!arguments.length) return pointHoverRadius;
    pointHoverRadius = _;
    return chart;
  }

  chart.pointHoverColor = function (_) {
    if (!arguments.length) return pointHoverColor;
    pointHoverColor = _;
    return chart;
  }

  chart.mergeHover = function (_) {
    if (!arguments.length) return mergeHover;
    mergeHover = _;
    return chart;    
  }

  chart.hoveredItems = function (_) {
    if (!arguments.length) return hoveredItems;
    hoveredItems = _;
    return chart;
  };

  chart.addHoveredItem = function (_) {
    hoveredItems.push(_);
    return chart;
  };

  chart.base = function (_) {
    if (!arguments.length) return base;
    base = _;
    return chart;
  };

  chart.showPoint = function (_) {
    if (!arguments.length) return showPoint;
    showPoint = _;
    return chart;
  };

  chart.startPosition = function (_) {
    if (!arguments.length) return startPosition;
    startPosition = _;
    return chart;
  };

  return chart;
};
