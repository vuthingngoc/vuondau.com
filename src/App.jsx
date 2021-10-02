import React from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';

//page
import Homepage from './pages/HomePage';
import Index from 'pages/Index';
import ProductDetail from 'pages/ProductDetail';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" render={(props) => <Homepage {...props} />} />
        <Route exact path="/home" render={(props) => <Homepage {...props} />} />
        <Route path="/product/productdetail" render={(props) => <ProductDetail {...props} />} />
        <Route exact path="/components" render={(props) => <Index {...props} />} />
        <Redirect to="/home" />
      </Switch>
    </BrowserRouter>
  );
}
export default App;
