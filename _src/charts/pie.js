Chartmander.charts.pie = function (canvas) {

  ///////////////////////////////////
  // Use Components
  ///////////////////////////////////

  var layer = new Chartmander.components.layer(canvas)
    , pie   = new Chartmander.models.pie()
    ;

  pie.layer = layer;

  ///////////////////////////////////
  // Setup defaults
  ///////////////////////////////////

  layer
    .onHover(function () {
      pie.draw(true);
    })
    .onLeave(function () {
      if ( pie.completed() ) {
        pie.draw(true);
      }
    })
    ;

  pie
    .radius(layer.width()/2)
    ;

  var render =  function (data) {
    pie.parse(data, Chartmander.components.slice);
    var xrange = getRange(getArrayBy(data, "label"));
    var yrange = getRange(function(){
      var values = [];
      forEach(pie.datasets(), function (set) {
        values.push(set.min());
        values.push(set.max());
      });
      return values;
    }());

    pie.recalc();
    pie.completed(0);
    pie.draw(false);
  }

  ///////////////////////////////////
  // Extend Animation Loop
  ///////////////////////////////////

  pie.drawModel(function (_perc_) {
    pie.drawComponents(_perc_);
  });

  ///////////////////////////////////
  // Methods
  ///////////////////////////////////

  pie.render = render;

  return pie;
};
