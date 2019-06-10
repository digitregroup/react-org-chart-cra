import React from 'react';
import OrgChart from "./components/OrgChart/org-chart";
import fakeData from "./lib/utils/fake-data";
import * as PropTypes from "prop-types";

function ReactOrgChart(props) {
  let {contacts} = props;

  const treeChildren = contacts || fakeData();

  return (
    <OrgChart
      tree={treeChildren}
      loadChildren={async () => {
        console.log('loading children..');
        return treeChildren.children;
      }}
      lineType={"angle"}
    />
  );
}

ReactOrgChart.propTypes = {contacts: PropTypes.any}

export default ReactOrgChart;
