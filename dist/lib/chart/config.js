var animationDuration = 350;
var shouldResize = true; // Nodes

var nodeWidth = 240;
var nodeHeight = 120;
var nodeSpacing = 12;
var nodePaddingX = 16;
var nodePaddingY = 16;
var avatarWidth = 40;
var nodeBorderRadius = 4;
var margin = {
  top: 20,
  right: 20,
  bottom: 20,
  left: 20 // Lines

};
var lineType = 'angle';
var lineDepthY = 120;
/* Height of the line for child nodes */
// Colors

var backgroundColor = '#fff';
var borderColor = '#e6e8e9';
var nameColor = '#222d38';
var titleColor = '#617080';
var reportsColor = '#92A0AD';
var config = {
  margin: margin,
  animationDuration: animationDuration,
  nodeWidth: nodeWidth,
  nodeHeight: nodeHeight,
  nodeSpacing: nodeSpacing,
  nodePaddingX: nodePaddingX,
  nodePaddingY: nodePaddingY,
  nodeBorderRadius: nodeBorderRadius,
  avatarWidth: avatarWidth,
  lineType: lineType,
  lineDepthY: lineDepthY,
  backgroundColor: backgroundColor,
  borderColor: borderColor,
  nameColor: nameColor,
  titleColor: titleColor,
  reportsColor: reportsColor,
  shouldResize: shouldResize
};
export default config;