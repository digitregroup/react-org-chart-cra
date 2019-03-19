import React, {useEffect} from "react";
import {init} from "../../lib/chart";

const OrgChart = ({id = 'react-org-chart', tree, ...options}) => {

    useEffect(() => init({
        id: `#${id}`,
        data: tree,
        ...options
    }), [tree]);

    return <div id={id}/>;
};

export default OrgChart;
