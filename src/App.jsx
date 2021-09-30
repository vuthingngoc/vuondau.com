import React from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import Homepage from './pages/HomePage';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" render={() => <Homepage />} />
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  );
}
export default App;
