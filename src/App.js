import React, {Fragment, useState} from "react";
import ReactOrgChart from "./component/ReactOrgChart";

import fakeData from '../src/component/lib/utils/fake-data';

function App() {
  const [contacts, setContacts] = useState(fakeData());
  return <Fragment>

    <button onClick={() => setContacts(fakeData())}>Reset</button>

    <ReactOrgChart contacts={contacts}/>

  </Fragment>;
}

export default App;
