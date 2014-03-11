Chartmander.components.bar = function (data, title) {

  var bar = new Chartmander.components.element(data, title);

  var base = {
        from: 0,
        to:   0,
        now:  0
      }
      ;

  drawInto = function (chart, set) {
    var ctx = chart.ctx;

    if (isHovered(chart)) {
      ctx.save();
      ctx.fillStyle = set.hoverColor();
      // ctx.strokeStyle = style.onHover.strokeColor;
      // chart.tooltip.addItem({
      //   "set": set.title
      //   "label": bar.label,
      //   "value": bar.value,
      //   "color": style.normal.color
      // });
    }

    ctx.fillRect(bar.x(), bar.base(), chart.barWidth(), bar.y());
    // if (style.normal.stroke > 0)
      // ctx.strokeRect(bar.x(), bar.getBase(), chart.barWidth(), bar.y());

    // if (hover) {
    //   if (style.onHover.stroke > 0)
    //     ctx.strokeRect(bar.x(), bar.getBase(), cfg.barWidth, bar.y());
    //   ctx.restore();
    // }

    // if (chart.displayValue()) {
    //   ctx.save();
    //   ctx.fillStyle = tinycolor.darken(set.color(), 30).toHex();
    //   ctx.translate(bar.x(), chart.getBase() - 20);
    //   ctx.rotate(-Math.PI/2);
    //   ctx.fillText(bar.value/1000, 0, 15);
    //   ctx.restore();
    // }

  }

  isHovered = function (chart) {
    var x = chart.mouse("x")
      , y = chart.mouse("y")
      , cfg = chart.config
      , hovered = false
      , yRange = [bar.base(), bar.base()+bar.y()].sort(function(a,b){return a-b})
      ;

    if (x >= bar.x() && x <= bar.x()+cfg.barWidth && y >= yRange[0] && y<= yRange[1]) {
      hovered = true;
    }

    return hovered;
  }

  ///////////////////////////////
  // Public Methods & Variables
  ///////////////////////////////

  bar.drawInto = drawInto;

  bar.updatePositionBase = function (_perc_) {
    var baseDelta = base.from - base.to;
    base.now = base.from - baseDelta*_perc_;
  }

  bar.saveBase = function (_) {
    if (!arguments.length) {
      base.from = bar.base();
    }
    else {
      base.from = _;
    }
    return bar;
  }

  bar.moveBase = function (_) {
    base.to = _;
    return bar;
  }

  bar.base = function () {
    return base.now;
  }

  return bar;
};