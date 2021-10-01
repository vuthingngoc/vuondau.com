import React from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';

//page
import Homepage from './pages/HomePage';
import Index from 'pages/Index';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" render={(props) => <Homepage {...props} />} />
        <Route exact path="/components" render={(props) => <Index {...props} />} />
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  );
}
export default App;
