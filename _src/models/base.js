Chartmander.models.base = function () {
  
  // parent for each chartmander model
  // provides just logic
  // stores data and state
  // animation is here

  var chart = this;

  var datasets           = []
    , width              = null
    , height             = null
    , margin             = { top: 0, right: 0, bottom: 0, left: 0 }
    , colors             = ["blue", "green", "red"]
    , font               = "13px Arial, sans-serif"
    , fontColor          = "#555"
    , animate            = true
    , animationSteps     = 100
    , animationCompleted = 0
    , easing             = "easeInQuint"
    , updated            = false
    , drawChart          = null
    ;

  ///////////////////////////////////
  // Components
  ///////////////////////////////////

  var tooltip = new Chartmander.components.tooltip();

  chart.layer   = null; // each model need a layer
  chart.tooltip = tooltip;

  ///////////////////////////////////
  // The Animating Loop
  ///////////////////////////////////

  var draw = function (finished) {
    var easingFunction = easings[easing]
      , animationIncrement = 1/animationSteps
      , _perc_
      ;

    if (!updated)
      animationCompleted = animate ? 0 : 1;

    function loop () {

      if (finished) {
        animationCompleted = 1;
      } else if (animationCompleted < 1) {
        animationCompleted += animationIncrement;
      }

      _perc_ = easingFunction(animationCompleted);

      // FAUX if layer not connected to model in chart!
      chart.layer
        .erase(0, 0, width+5, height+5)
        .hoverFinished(true)
        ;

      // Model specific drawings
      drawChart(_perc_);

      // if (hovered && tooltip.hasItems()) {
      //   // tooltip.recalc(ctx);
      //   layer.tooltip.drawInto(chart);
      // }

      // Request self-repaint if chart or tooltip or data element has not finished animating yet
      // if (animationCompleted < 1 || (tip.getState() > 0 && tip.getState() < 1) || hoverNotFinished ) {
      if (animationCompleted < 1 || !chart.layer.hoverFinished()) {
        requestAnimationFrame(loop);
      }
      else {
        console.log("Animation Finished.");
      }
    }
    // Ignite
    requestAnimationFrame(loop);
  }

  ///////////////////////////////////
  // Chart Update - Parse Data
  ///////////////////////////////////

  var parse = function (data, element) {
    if (data === undefined) {
      throw new Error("No data specified for chart " + id);
    }
    // First render, create new datasets
    if (chart.setsCount() === 0) {
      var i=0;
      forEach(data, function (set) {
        datasets.push(new Chartmander.components.dataset(set, colors[i], element));
        i++;
      });
    } else { // Update
      var i=0;
      forEach(datasets, function (set) {
        if (data[i] === undefined) {
          throw new Error("Missing dataset. Dataset count on update must match.");
        }
        set.merge(data[i], chart, element);
        i++;
      });
    }
  }

  ///////////////////////////////
  // Methods and Binding
  ///////////////////////////////

  chart.parse = parse;
  chart.draw  = draw;

  // Visual properties

  chart.width = function (_) {
    if(!arguments.length) return width;
    width = _;
    return chart;
  };

  chart.height = function (_) {
    if(!arguments.length) return height;
    height = _;
    return chart;
  };

  chart.margin = function (_) {
    if (!arguments.length) return margin;
    margin.top    = typeof _.top    != 'undefined' ? _.top    : margin.top;
    margin.right  = typeof _.right  != 'undefined' ? _.right  : margin.right;
    margin.bottom = typeof _.bottom != 'undefined' ? _.bottom : margin.bottom;
    margin.left   = typeof _.left   != 'undefined' ? _.left   : margin.left;
    return chart;
  };

  chart.colors = function (_) {
    if(!arguments.length) return colors;
    colors = _;
    return chart;
  };

  // FAUX
  chart.color = function (i) {
    if (colors[i] !== undefined)
      return colors[i];
    else
      return "red";
  };

  chart.fontColor = function (_) {
    if (!arguments.length) return fontColor;
    fontColor = _;
    return chart;
  };

  chart.font = function (_) {
    if (!arguments.length) return font;
    font = _;
    return chart;
  };

  // Data properties

  chart.datasets = function (_) {
    if(!arguments.length) return datasets;
    datasets = _;
    return chart;
  };
  
  chart.dataset = function (_) {
    return datasets[_];
  };
  
  chart.setsCount = function () {
    return datasets.length;
  };

  chart.elementCount = function () {
    var total = 0;
    forEach(datasets, function (set) {
      total += set.elementCount();
    });
    return total;
  };

  // Animation properties

  chart.completed = function (_) {
    if(!arguments.length) return animationCompleted;
    animationCompleted = _;
    return chart;
  };

  chart.easing = function (_) {
    if (!arguments.length) return easing;
    easing = _;
    return chart;
  };

  chart.drawChart = function (f) {
    drawChart = f;
    return chart;
  };

  chart.updated = function (_) {
    if (!arguments.length) return updated;
    updated = _;
    return chart;
  };

  return chart;
};
