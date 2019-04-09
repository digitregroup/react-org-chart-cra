import _objectSpread from "@babel/runtime/helpers/esm/objectSpread";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/esm/inherits";

var _require = require('react'),
    createElement = _require.createElement,
    PureComponent = _require.PureComponent;

var _require2 = require('../chart'),
    init = _require2.init;

var OrgChart =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(OrgChart, _PureComponent);

  function OrgChart() {
    _classCallCheck(this, OrgChart);

    return _possibleConstructorReturn(this, _getPrototypeOf(OrgChart).apply(this, arguments));
  }

  _createClass(OrgChart, [{
    key: "render",
    value: function render() {
      var id = this.props.id;
      return createElement('div', {
        id: id
      });
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this$props = this.props,
          id = _this$props.id,
          tree = _this$props.tree,
          options = _objectWithoutProperties(_this$props, ["id", "tree"]);

      init(_objectSpread({
        id: "#".concat(id),
        data: tree
      }, options));
    }
  }]);

  return OrgChart;
}(PureComponent);

OrgChart.defaultProps = {
  id: 'react-org-chart'
};
module.exports = OrgChart;