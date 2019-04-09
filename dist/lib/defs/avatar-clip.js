import _objectSpread from "@babel/runtime/helpers/esm/objectSpread";
var defaultConfig = {
  borderRadius: 4
};
export default function defineAvatarClip(svg, id) {
  var config = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  config = _objectSpread({}, defaultConfig, config);
  var defs = svg.append('svg:defs');
  defs.append('clipPath').attr('id', id).append('circle').attr('cx', 34).attr('cy', 34).attr('r', 18);
}