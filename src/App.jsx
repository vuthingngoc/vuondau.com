import React from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';

//page
import Homepage from './pages/HomePage';
// import Header from './components/index';
import Index from 'pages/Index';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" render={(props) => <Homepage {...props} />} />
        <Route exact path="/index" render={(props) => <Index {...props} />} />
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  );
}
export default App;
