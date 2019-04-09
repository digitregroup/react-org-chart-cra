import d3 from "d3"; // One way of achieving text-wrapping capability in SVG

export default function wrapText(text, width) {
  if (text.length === 0) {
    return '';
  }

  var editedClass = '';
  text[0].forEach(function (textNode) {
    var text = d3.select(textNode);
    var x = text.attr('x');
    var y = text.attr('y');
    var dy = parseFloat(text.attr('dy'));
    var lineHeight = 1.1;
    var words = text.text().split(/\s+/).reverse();
    var lineNumber = 0;
    var word;
    var line = [];
    var tspan = text.text(null).append('tspan').attr('x', x).attr('y', y).attr('dy', dy + 'em');

    while (word = words.pop()) {
      line.push(word);
      tspan.text(line.join(' '));

      if (tspan.node().getComputedTextLength() > width) {
        line.pop();
        tspan.text(line.join(' '));
        line = [word];
        tspan = text.append('tspan').attr('x', x).attr('y', y).attr('dy', ++lineNumber * lineHeight + dy + 'em').text(word);
      }
    }

    if (!editedClass) {
      editedClass = text.attr('class').replace(' unedited', '');
    }

    text.attr('class', editedClass);
  });
}