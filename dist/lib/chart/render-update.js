import d3 from "d3"; // Update the rendered node positions triggered by zoom

export default function renderUpdate(_ref) {
  var svg = _ref.svg;
  return function () {
    svg.attr('transform', "translate(".concat(d3.event.translate, ")\n     scale(").concat(d3.event.scale.toFixed(1), ")"));
  };
}