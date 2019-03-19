import React, {Fragment, useState} from 'react';
import './App.css';
import OrgChart from "./components/OrgChart/org-chart";
import fakeData from "./lib/utils/fake-data";

const treeChildren = fakeData();

const filterNodesByName = (nameSearch) => {
    console.log(treeChildren);
    return treeChildren;
};

const App = () => {

    const [tree, setTree]             = useState(treeChildren);
    const [nameSearch, setNameSearch] = useState("");

    const onNameSearchChange = e => {
        setNameSearch(e.target.value);
    };

    return (
        <Fragment>

            <input type={"text"} value={nameSearch} onChange={onNameSearchChange}/>
            <button onClick={() => setTree(filterNodesByName(nameSearch))} type={"button"}>test</button>

            <OrgChart
                tree={tree}
                loadChildren={async () => {
                    console.log('loading children..');
                    return treeChildren.children;
                }}
                lineType={"angle"}
            />

        </Fragment>
    );
};

export default App;
