import React from 'react';
import OrgChart from "./components/OrgChart/org-chart";
import fakeData from "./lib/utils/fake-data";

const treeChildren = fakeData();

const ReactOrgChart = () => (
  <OrgChart
    tree={treeChildren}
    loadChildren={async () => {
      console.log('loading children..');
      return treeChildren.children;
    }}
    lineType={"angle"}
  />
);

export default ReactOrgChart;
