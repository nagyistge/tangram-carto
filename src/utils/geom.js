var Geom = {};

export default Geom;

Geom.px2Meters = function (fn) {
  return `function () {
  		var val = (${fn}());
  		return val * $meters_per_pixel;
  	}`.replace(/(\t)/g, '');
};
