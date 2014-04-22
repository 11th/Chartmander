Chartmander.charts.pie = function (canvas) {

  var chart = new Chartmander.components.baseChart(canvas);

  ///////////////////////////////////
  // Use Components
  ///////////////////////////////////

  var pie = new Chartmander.models.slices(chart);

  ///////////////////////////////////
  // Setup drawing & defaults
  ///////////////////////////////////
  // pie
  //   .radius(chart.width()/2)
  //   ;
  
  chart
    .drawChart(function (ctx, _perc_) {
      pie.drawInto(ctx, _perc_);
    })
    ;


  var render =  function (data) {
    pie.parse(data, Chartmander.components.slice);
    pie.recalc();
    
    chart
      .completed(0)
      .draw(false);
  }

  ///////////////////////////////
  // Binding & Methods
  ///////////////////////////////

  chart.pie = pie;

  chart.render = render;

  return chart;
};
