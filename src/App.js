import React from 'react';
import store from './redux/store';
import { Provider } from 'react-redux';
import { Panel } from './components';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Router>
        <Switch>
          <Route path="/">
            <Panel />
          </Route>
        </Switch>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
