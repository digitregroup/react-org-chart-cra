import _objectSpread from "@babel/runtime/helpers/esm/objectSpread";
var defaultConfig = {
  width: '100%',
  height: '100%',
  x: null,
  y: null,
  radius: 1
};

module.exports = function defineBorderRadius(svg, id) {
  var config = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  config = _objectSpread({}, defaultConfig, config);
  var defs = svg.append('svg:defs');
  var rectId = "".concat(id, "-rect");
  defs.append('rect').attr('id', rectId).attr('height', '100%').attr('width', '100%').attr('rx', config.radius);
  defs.append('clipPath').attr('id', id).append('use').attr('xlink:href', '#' + rectId);
};