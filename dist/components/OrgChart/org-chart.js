import _objectSpread from "@babel/runtime/helpers/esm/objectSpread";
import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import React, { Component, useEffect } from "react";
import { init } from "../../lib/chart";

var OrgChart =
/*#__PURE__*/
function (_Component) {
  _inherits(OrgChart, _Component);

  function OrgChart() {
    _classCallCheck(this, OrgChart);

    return _possibleConstructorReturn(this, _getPrototypeOf(OrgChart).apply(this, arguments));
  }

  _createClass(OrgChart, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      init(_objectSpread({
        id: "#".concat(this.props.id),
        data: this.props.tree
      }, this.props.options));
    }
  }, {
    key: "render",
    value: function render() {
      console.log('oijoijoijoijoijoijoijoij');
      var id = this.props.id;
      return React.createElement("div", {
        id: id
      });
    }
  }]);

  return OrgChart;
}(Component);

OrgChart.defaultProps = {
  id: 'react-org-chart'
};
OrgChart.defaultProps = {
  id: 'react-org-chart'
};
export default OrgChart;