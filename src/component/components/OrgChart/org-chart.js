import React, {Component} from "react";
import {init} from "../../lib/chart";
import * as PropTypes from "prop-types";

class OrgChart extends Component {

  static defaultProps = {
    id: 'react-org-chart'
  };

  componentDidMount() {
    init({
      id:   `#${this.props.id}`,
      data: this.props.tree,
      ...this.props.options
    });
  }

  componentDidUpdate() {
    init({
      id:   `#${this.props.id}`,
      data: this.props.tree,
      ...this.props.options
    });
  }

  render() {
    let {id} = this.props;

    return <div id={id}/>;
  }
}

OrgChart.propTypes = {
  id:   PropTypes.string,
  tree: PropTypes.any
};

OrgChart.defaultProps = {id: 'react-org-chart'};

export default OrgChart;
