import React, { useState, useEffect } from 'react';

import Dashboard from './screen/Dashboard';
import Affiliation from './screen/Affiliation';
import Transaction from './screen/Transaction';
import Setting from './screen/Setting';
import Slamchat from './Slamchat';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

// Redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';

function App() {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [userId, setUserId] = useState(0);

  const childToParent = async (childdata) => {
    await setPhone(childdata.phone);
    await setEmail(childdata.email);
    await setUserId(childdata.id);
  }

  return (
    <Provider store={store}>
      <React.Fragment>
        <Router>
          <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route exact path="/Affiliation" component={Affiliation} />
            <Route exact path="/Transaction" component={Transaction} />
            <Route exact path="/Setting" component={Setting} />
            <Route exact path="/Slamchat" component={Slamchat} />
          </Switch>
        </Router>
      </React.Fragment>
    </Provider>
  );
}

export default App;
