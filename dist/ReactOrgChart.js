import _regeneratorRuntime from "@babel/runtime/regenerator";
import _asyncToGenerator from "@babel/runtime/helpers/esm/asyncToGenerator";
import React from 'react';
import OrgChart from "./components/OrgChart/org-chart";
import fakeData from "./lib/utils/fake-data";
var treeChildren = fakeData();

var ReactOrgChart = function ReactOrgChart() {
  return React.createElement(OrgChart, {
    tree: treeChildren,
    loadChildren:
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    _regeneratorRuntime.mark(function _callee() {
      return _regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              console.log('loading children..');
              return _context.abrupt("return", treeChildren.children);

            case 2:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    })),
    lineType: "angle"
  });
};

export default ReactOrgChart;