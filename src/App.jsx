import React from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';

//page
import Homepage from './pages/HomePage';
import Index from 'pages/Index';
import ProductDetail from 'pages/ProductDetail';
import LoginPage from 'pages/LoginPage/index';
import RegisterPage from 'pages/RegisterPage';
import ShoppingCartPage from 'pages/ShoppingCart';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" render={(props) => <Homepage {...props} />} />
        <Route exact path="/home" render={(props) => <Homepage {...props} />} />
        <Route path="/product/productdetail" render={(props) => <ProductDetail {...props} />} />
        <Route exact path="/components" render={(props) => <Index {...props} />} />
        <Route exact path="/login" render={(props) => <LoginPage {...props} />} />
        <Route exact path="/register" render={(props) => <RegisterPage {...props} />} />
        <Route exact path="/shoppingcart" render={(props) => <ShoppingCartPage {...props} />} />
        <Redirect to="/home" />
      </Switch>
    </BrowserRouter>
  );
}
export default App;
