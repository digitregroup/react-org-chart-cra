import * as d3 from "d3";
import { helpers, wrapText } from "../utils";
import renderLines from "./render-lines";
import onClick from "./on-click";
import iconLink from "./components/icon-link";
var CHART_NODE_CLASS = 'org-chart-node';
var PERSON_LINK_CLASS = 'org-chart-person-link';
var PERSON_NAME_CLASS = 'org-chart-person-name';
var PERSON_TITLE_CLASS = 'org-chart-person-title';
var PERSON_DEPARTMENT_CLASS = 'org-chart-person-dept';
var PERSON_REPORTS_CLASS = 'org-chart-person-reports';

function render(config) {
  var svg = config.svg,
      tree = config.tree,
      animationDuration = config.animationDuration,
      nodeWidth = config.nodeWidth,
      nodeHeight = config.nodeHeight,
      nodePaddingX = config.nodePaddingX,
      nodePaddingY = config.nodePaddingY,
      nodeBorderRadius = config.nodeBorderRadius,
      backgroundColor = config.backgroundColor,
      nameColor = config.nameColor,
      titleColor = config.titleColor,
      reportsColor = config.reportsColor,
      borderColor = config.borderColor,
      avatarWidth = config.avatarWidth,
      lineDepthY = config.lineDepthY,
      treeData = config.treeData,
      sourceNode = config.sourceNode,
      onPersonLinkClick = config.onPersonLinkClick; // Compute the new tree layout.

  var nodes = tree.nodes(treeData).reverse();
  var links = tree.links(nodes);
  config.links = links;
  config.nodes = nodes; // Normalize for fixed-depth.

  nodes.forEach(function (d) {
    d.y = d.depth * lineDepthY;
  }); // Update the nodes

  var node = svg.selectAll('g.' + CHART_NODE_CLASS).data(nodes.filter(function (d) {
    return d.id;
  }), function (d) {
    return d.id;
  });
  var parentNode = sourceNode || treeData; // Enter any new nodes at the parent's previous position.

  var nodeEnter = node.enter().insert('g').attr('class', CHART_NODE_CLASS).attr('transform', "translate(".concat(parentNode.x0, ", ").concat(parentNode.y0, ")")).on('click', onClick(config)); // Person Card Shadow

  nodeEnter.append('rect').attr('width', nodeWidth).attr('height', nodeHeight).attr('fill', backgroundColor).attr('stroke', borderColor).attr('rx', nodeBorderRadius).attr('ry', nodeBorderRadius).attr('fill-opacity', 0.05).attr('stroke-opacity', 0.025).attr('filter', 'url(#boxShadow)'); // Person Card Container

  nodeEnter.append('rect').attr('width', nodeWidth).attr('height', nodeHeight).attr('id', function (d) {
    return d.id;
  }).attr('fill', backgroundColor).attr('stroke', borderColor).attr('rx', nodeBorderRadius).attr('ry', nodeBorderRadius).style('cursor', helpers.getCursorForNode).attr('class', 'box');
  var namePos = {
    x: nodePaddingX * 1.4 + avatarWidth,
    y: nodePaddingY * 1.8
  }; // Person's Name

  nodeEnter.append('text').attr('class', PERSON_NAME_CLASS).attr('x', namePos.x).attr('y', namePos.y).attr('dy', '.3em').style('cursor', 'pointer').style('fill', nameColor).style('font-size', 16).text(function (d) {
    return d.person.name;
  }); // Person's Title

  nodeEnter.append('text').attr('class', PERSON_TITLE_CLASS + ' unedited').attr('x', namePos.x).attr('y', namePos.y + nodePaddingY * 1.2).attr('dy', '0.1em').style('font-size', 14).style('cursor', 'pointer').style('fill', titleColor).text(function (d) {
    return d.person.title;
  });
  var heightForTitle = 45; // getHeightForText(d.person.title)
  // Person's Reports

  nodeEnter.append('text').attr('class', PERSON_REPORTS_CLASS).attr('x', namePos.x).attr('y', namePos.y + nodePaddingY + heightForTitle).attr('dy', '.9em').style('font-size', 14).style('font-weight', 500).style('cursor', 'pointer').style('fill', reportsColor).text(helpers.getTextForTitle); // Person's Avatar

  nodeEnter.append('image').attr('width', avatarWidth).attr('height', avatarWidth).attr('x', nodePaddingX).attr('y', nodePaddingY).attr('stroke', borderColor).attr('src', function (d) {
    return d.person.avatar;
  }).attr('xlink:href', function (d) {
    return d.person.avatar;
  }).attr('clip-path', 'url(#avatarClip)'); // Person's Department

  nodeEnter.append('text').attr('class', getDepartmentClass).attr('x', 34).attr('y', avatarWidth + nodePaddingY * 1.2).attr('dy', '.9em').style('cursor', 'pointer').style('fill', titleColor).style('font-weight', 600).style('font-size', 8).attr('text-anchor', 'middle').text(helpers.getTextForDepartment); // Person's Link

  var nodeLink = nodeEnter.append('a').attr('class', PERSON_LINK_CLASS).attr('xlink:href', function (d) {
    return d.person.link || 'https://lattice.com';
  }).on('click', function (datum) {
    d3.event.stopPropagation(); // TODO: fire link click handler

    if (onPersonLinkClick) {
      onPersonLinkClick(datum, d3.event);
    }
  });
  iconLink({
    svg: nodeLink,
    x: nodeWidth - 28,
    y: nodeHeight - 28
  }); // Transition nodes to their new position.

  var nodeUpdate = node.transition().duration(animationDuration).attr('transform', function (d) {
    return "translate(".concat(d.x, ",").concat(d.y, ")");
  });
  nodeUpdate.select('rect.box').attr('fill', backgroundColor).attr('stroke', borderColor); // Transition exiting nodes to the parent's new position.

  var nodeExit = node.exit().transition().duration(animationDuration).attr('transform', function (d) {
    return "translate(".concat(parentNode.x, ",").concat(parentNode.y, ")");
  }).remove(); // Update the links

  var link = svg.selectAll('path.link').data(links, function (d) {
    return d.target.id;
  }); // Wrap the title texts

  var wrapWidth = 140;
  svg.selectAll('text.unedited.' + PERSON_TITLE_CLASS).call(wrapText, wrapWidth); // Render lines connecting nodes

  renderLines(config); // Stash the old positions for transition.

  nodes.forEach(function (d) {
    d.x0 = d.x;
    d.y0 = d.y;
  });
}

function getDepartmentClass(d) {
  var person = d.person;
  var deptClass = person.department ? person.department.toLowerCase() : '';
  return [PERSON_DEPARTMENT_CLASS, deptClass].join(' ');
}

export default render;