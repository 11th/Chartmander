Chartmander.components.xAxis = function () {

  var axis = new Chartmander.components.axis();

  var steps = [
        {
          "days": 1,
          "label": "days"
        },
        {
          "days": 7,
          "label": "weeks"
        },
        {
          "days": 30,
          "label": "months"
        },
        {
          "days": 365,
          "label": "years"
        }
      ]
    , dayMSec = 60*60*24*1000
    ;
    
  axis.format("MM/YYYY");
  // rename to timeAxis ?
  // make another numberAxis and category
  // implement in chart as x/y with options horizontal/vertical  aligned top, bottom or left,right
  // YES BUT WE HAVE NOT MUCH TIME VERY BUSY ARE WE

  var recalc = function (chart) {
    var startDate = moment(axis.min())
      , daysInRange = axis.delta()/dayMSec
      , stepIndex = steps.length
      , labelCount = 0
      ;

    // clear labels
    axis.labels([]);
    // Time per pixel
    axis.scale(axis.delta()/chart.grid.width());

    while (labelCount < 1) {
      stepIndex--;
      labelCount = daysInRange/steps[stepIndex].days;
    }

    labelCount = Math.round(labelCount);
    for (var i = 0; i < labelCount; i++) {
      var label = moment(startDate).add(steps[stepIndex].label, i);
      axis.labels().push(label.valueOf());
    }
  }

  var drawInto = function (chart, _perc_) {
    var ctx = chart.layer.ctx
      , topOffset = chart.grid.bound().bottom + 25;

    ctx.save();
    ctx.fillStyle = chart.fontColor();
    ctx.font = chart.font();
    ctx.globalAlpha = 1;
    axis.each(function (label) {
      var leftOffset = chart.margin().left + (label-chart.xAxis.min())/chart.xAxis.scale();
      ctx.fillText(moment(label).format(axis.format()), leftOffset, topOffset);
    });
    ctx.restore();
    return axis;
  }

  ///////////////////////////////
  // Public Methods & Variables
  ///////////////////////////////

  axis.drawInto = drawInto;

  axis.adapt = function (chart, range) {
    // Apply values required for label recalculation
    axis.min(range.min).max(range.max).delta(axis.max() - axis.min());
    recalc(chart);
    return axis;
  };

  return axis;
}
