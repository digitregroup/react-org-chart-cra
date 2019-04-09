import d3 from "d3";
export default function renderLines() {
  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var svg = config.svg,
      links = config.links,
      margin = config.margin,
      nodeWidth = config.nodeWidth,
      nodeHeight = config.nodeHeight,
      borderColor = config.borderColor,
      sourceNode = config.sourceNode,
      treeData = config.treeData,
      lineType = config.lineType,
      animationDuration = config.animationDuration;
  var parentNode = sourceNode || treeData; // Select all the links to render the lines

  var link = svg.selectAll('path.link').data(links.filter(function (link) {
    return link.source.id;
  }), function (d) {
    return d.target.id;
  }); // Define the curved line function

  var curve = d3.svg.diagonal().projection(function (d) {
    return [d.x + nodeWidth / 2, d.y + nodeHeight / 2];
  }); // Define the angled line function

  var angle = d3.svg.line().x(function (d) {
    return d.x;
  }).y(function (d) {
    return d.y;
  }).interpolate('linear');

  if (lineType === 'angle') {
    // Enter any new links at the parent's previous position.
    link.enter().insert('path', 'g').attr('class', 'link').attr('fill', 'none').attr('stroke', borderColor).attr('stroke-opacity', 0.5).attr('stroke-width', 1.25).attr('d', function (d) {
      var linePoints = [{
        x: d.source.x0 + parseInt(nodeWidth / 2),
        y: d.source.y0 + nodeHeight + 2
      }, {
        x: d.source.x0 + parseInt(nodeWidth / 2),
        y: d.source.y0 + nodeHeight + 2
      }, {
        x: d.source.x0 + parseInt(nodeWidth / 2),
        y: d.source.y0 + nodeHeight + 2
      }, {
        x: d.source.x0 + parseInt(nodeWidth / 2),
        y: d.source.y0 + nodeHeight + 2
      }];
      return angle(linePoints);
    }); // Transition links to their new position.

    link.transition().duration(animationDuration).attr('d', function (d) {
      var linePoints = [{
        x: d.source.x + parseInt(nodeWidth / 2),
        y: d.source.y + nodeHeight
      }, {
        x: d.source.x + parseInt(nodeWidth / 2),
        y: d.target.y - margin.top / 2
      }, {
        x: d.target.x + parseInt(nodeWidth / 2),
        y: d.target.y - margin.top / 2
      }, {
        x: d.target.x + parseInt(nodeWidth / 2),
        y: d.target.y
      }];
      return angle(linePoints);
    }); // Animate the existing links to the parent's new position

    link.exit().transition().duration(animationDuration).attr('d', function (d) {
      var linePoints = [{
        x: config.callerNode.x + parseInt(nodeWidth / 2),
        y: config.callerNode.y + nodeHeight + 2
      }, {
        x: config.callerNode.x + parseInt(nodeWidth / 2),
        y: config.callerNode.y + nodeHeight + 2
      }, {
        x: config.callerNode.x + parseInt(nodeWidth / 2),
        y: config.callerNode.y + nodeHeight + 2
      }, {
        x: config.callerNode.x + parseInt(nodeWidth / 2),
        y: config.callerNode.y + nodeHeight + 2
      }];
      return angle(linePoints);
    }).each('end', function () {
      config.callerNode = null;
    });
  } else if (lineType === 'curve') {
    link.enter().insert('path', 'g').attr('class', 'link').attr('stroke', borderColor).attr('fill', 'none').attr('x', nodeWidth / 2).attr('y', nodeHeight / 2).attr('d', function (d) {
      var source = {
        x: parentNode.x0,
        y: parentNode.y0
      };
      return curve({
        source: source,
        target: source
      });
    }); // Transition links to their new position.

    link.transition().duration(animationDuration).attr('d', curve); // Transition exiting nodes to the parent's new position.

    link.exit().transition().duration(animationDuration).attr('d', function (d) {
      var source = {
        x: parentNode.x,
        y: parentNode.y
      };
      return curve({
        source: source,
        target: source
      });
    }).remove();
  }
}