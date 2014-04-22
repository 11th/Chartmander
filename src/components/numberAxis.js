Chartmander.components.numberAxis = function () {

  var axis = new Chartmander.components.axis();

  var labelSteps = [1, 2, 5]
    , spacing = 25 // minimum space between 2 labels
    ;

  var generate = function (chart, oldScale) {

    var height = axis.orientation() == "vertical" ? chart.grid.height() : chart.grid.width()
      , maxLabelCount = Math.floor(height / spacing)
      , stepBase = axis.delta().toExponential().split("e")
      , stepExponent = parseInt(stepBase[1])
      ;

    stepBase = closestElement(stepBase[0], labelSteps);
    axis.labels( getLabels(getAxeSetup(stepBase, stepExponent)) );

    axis.scale(axis.delta()/height);
    // zeroLevel = height - axis.max()/axis.scale();

    // Set Positions for labels
    for (var i=0, len=axis.labels().length; i<len; i++) {
      var label = axis.getLabel(i)
        , previous;
      
      if (label.value() < 0)
        previous = axis.getLabel(i+1);
      else if (label.value() > 0)
        previous = axis.getLabel(i-1);
      else if (label.value() == 0) {
        if (axis.orientation() == "vertical")
          label.startAtY(chart.base()).moveTo(false, chart.base());
        if (axis.orientation() == "horizontal")
          label.startAtX(chart.grid.bound().left).moveTo(chart.grid.bound().left, false);
        continue;
      }
      // where to start animating labels
      if (!isNaN(oldScale)) {
        if (axis.orientation() == "vertical")
          label.startAtY(chart.base() - label.value()/oldScale).moveTo(false, chart.base() - label.value()/axis.scale());
        if (axis.orientation() == "horizontal")
          label.startAtX(chart.grid.bound().left - label.value()/oldScale).moveTo(chart.grid.bound().left - label.value()/axis.scale(), false);
      } else {
        if (axis.orientation() == "vertical")
          label.startAtY(chart.base() - previous.value()/axis.scale()).moveTo(false, chart.base() - label.value()/axis.scale());
        if (axis.orientation() == "horizontal")
          label.startAtX(chart.grid.bound().left - previous.value()/axis.scale()).moveTo(chart.grid.bound().left - label.value()/axis.scale(), false);
      }
    }

    function getLabels (setup) {
      var labels = []
        , lefts = setup.labelCount
        , step = setup.valueStep
        , currLabel = 0
        , labelData = {
          label: 0,
          value: 0
        };

      labels.push(new Chartmander.components.label(labelData, "axis"));

      while ( -(axis.min() - currLabel) > step) {
        currLabel = currLabel - step;
        labelData = {
          label: currLabel,
          value: currLabel
        }
        labels.splice(0, 0, new Chartmander.components.label(labelData, "axis"));
      }

      currLabel = 0;

      while ( (axis.max() - currLabel) > step) {
        currLabel = currLabel + step;
        labelData = {
          label: currLabel,
          value: currLabel
        }
        labels.push(new Chartmander.components.label(labelData, "axis"))
      }

      return labels;
    }

    function getAxeSetup (base, exponent, stop) {
      var currIndex = indexOf.call(labelSteps, base)
        , newIndex
        , newExponent
        , currLabelValueStep = Math.pow(10, exponent)*base
        , currLabelCount = axis.delta()/currLabelValueStep
        ;

      if (stop)
        return {
          valueStep: currLabelValueStep,
          labelCount: Math.floor(currLabelCount)
        };

      // Debug
      // console.log("curr Index ", currIndex, " exponent", exponent, " currLabelValueStep ", currLabelValueStep, " labelCount ", currLabelCount, " maxLabelCount ", maxLabelCount )
      
      if (currLabelCount < maxLabelCount) {
        // Maybe there is space for more labels...
        newIndex = (currIndex - 1 <= -1) ? 2 : (currIndex - 1);
        newExponent = (newIndex == 2) ? (exponent - 1) : exponent;

        return getAxeSetup(labelSteps[newIndex], newExponent);
      }
      else {
        // Too far, return previous and stop
        newIndex = (currIndex + 1 >=  3) ? 0 : (currIndex + 1);
        newExponent = (newIndex == 0) ? (exponent + 1) : exponent;

        return getAxeSetup(labelSteps[newIndex], newExponent, true);
      }
    }
  }

  var drawInto = function (chart, _perc_) {
    var ctx = chart.layer.ctx;

    ctx.save();
    ctx.textAlign = "right";
    ctx.fillStyle = chart.fontColor();
    ctx.font = chart.font();
    ctx.globalAlpha = _perc_;
    forEach(axis.labels(), function (label) {
      label.updatePosition(_perc_);
      ctx.fillText(label.label().toString() + " ", chart.grid.bound().left - axis.margin(), label.y());
    });
    ctx.restore();
    return axis;
  }

  ///////////////////////////////
  // Public Methods & Variables
  ///////////////////////////////

  axis.drawInto = drawInto;

  axis.adapt = function (chart, range, oldScale) {
    axis.min(range.min).max(range.max).delta(axis.max() - (axis.min() > 0 ? 0 : axis.min()));
    generate(chart, oldScale);
    return axis;
  };

  return axis;
}
