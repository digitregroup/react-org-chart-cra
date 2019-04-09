import _objectSpread from "@babel/runtime/helpers/esm/objectSpread";
import d3 from "d3";
import { collapse } from "../utils";
export default function onClick() {
  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var loadChildren = config.loadChildren,
      render = config.render,
      onPersonClick = config.onPersonClick;
  return function (datum) {
    if (onPersonClick) {
      var result = onPersonClick(datum, d3.event); // If the `onPersonClick` handler returns `false`
      // Cancel the rest of this click handler

      if (typeof result === 'boolean' && !result) {
        return;
      }
    } // If this person doesn't have children but `hasChild` is true,
    // attempt to load using the `loadChildren` config function


    if (!datum.children && !datum._children && datum.hasChild) {
      if (!loadChildren) {
        console.error('react-org-chart.onClick: loadChildren() not found in config');
        return;
      }

      var _result = loadChildren(datum);

      var handler = handleChildrenResult(config, datum); // Check if the result is a promise and render the children

      if (_result.then) {
        return _result.then(handler);
      } else {
        return handler(_result);
      }
    }

    if (datum.children) {
      // Collapse the children
      config.callerNode = datum;
      config.callerMode = 0;
      datum._children = datum.children;
      datum.children = null;
    } else {
      // Expand the children
      config.callerNode = datum;
      config.callerMode = 1;
      datum.children = datum._children;
      datum._children = null;
    } // Pass in the clicked datum as the sourceNode which
    // tells the child nodes where to animate in from


    render(_objectSpread({}, config, {
      sourceNode: datum
    }));
  };
}

function handleChildrenResult(config, datum) {
  var tree = config.tree,
      render = config.render;
  return function (children) {
    var result = _objectSpread({}, datum, {
      children: children
    }); // Collapse the nested children


    if (children) {
      children.forEach(collapse);
      result.children.forEach(function (child) {
        if (!tree.nodes(datum)[0]._children) {
          tree.nodes(datum)[0]._children = [];
        }

        child.x = datum.x;
        child.y = datum.y;
        child.x0 = datum.x0;
        child.y0 = datum.y0;

        tree.nodes(datum)[0]._children.push(child);
      });

      if (datum.children) {
        // Collapse the children
        config.callerNode = datum;
        config.callerMode = 0;
        datum._children = datum.children;
        datum.children = null;
      } else {
        // Expand the children
        config.callerNode = null;
        config.callerMode = 1;
        datum.children = datum._children;
        datum._children = null;
      } // Pass in the newly rendered datum as the sourceNode
      // which tells the child nodes where to animate in from


      render(_objectSpread({}, config, {
        sourceNode: result
      }));
    }
  };
}