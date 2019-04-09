import _objectSpread from "@babel/runtime/helpers/esm/objectSpread";
var defaultConfig = {
  width: '150%',
  height: '150%',
  x: 0,
  y: 2,
  blurRadius: 1
};
export default function defineBoxShadow(svg, id) {
  var config = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  config = _objectSpread({}, defaultConfig, config);
  var filter = svg.append('svg:defs').append('svg:filter').attr('id', id).attr('height', '150%').attr('width', '150%');
  filter.append('svg:feGaussianBlur').attr('in', 'SourceAlpha').attr('stdDeviation', config.blurRadius) // stdDeviation is how much to blur
  .attr('result', 'blurOut');
  filter.append('svg:feOffset').attr('in', 'blurOut').attr('dx', config.x).attr('dy', config.y).attr('result', 'offsetOut'); // how much to offset

  var feMerge = filter.append('feMerge');
  feMerge.append('feMergeNode').attr('in', 'offsetOut');
  feMerge.append('feMergeNode').attr('in', 'SourceGraphic');
}