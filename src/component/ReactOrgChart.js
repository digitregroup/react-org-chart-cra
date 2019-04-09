import React from 'react';
import OrgChart from "./components/OrgChart/org-chart";
import fakeData from "./lib/utils/fake-data";

const ReactOrgChart = ({contacts}) => {
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
};

export default ReactOrgChart;
