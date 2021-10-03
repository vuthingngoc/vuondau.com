import React from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';

//page
import Homepage from './pages/HomePage';
import Index from 'pages/Index';
import ProductDetail from 'pages/ProductDetail';
import LoginPage from 'pages/LoginPage/index';
import RegisterPage from 'pages/RegisterPage';
import FarmsPage from 'pages/FarmsPage';
import GardenDetail from 'pages/FarmsPage/component/GardenDetail';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" render={(props) => <Homepage {...props} />} />
        <Route exact path="/home" render={(props) => <Homepage {...props} />} />
        <Route path="/product/productdetail" render={(props) => <ProductDetail {...props} />} />
        <Route path="/farms" render={(props) => <FarmsPage {...props} />} />
        <Route path="/gardendetail" render={(props) => <GardenDetail {...props} />} />
        <Route exact path="/components" render={(props) => <Index {...props} />} />
        <Route exact path="/login" render={(props) => <LoginPage {...props} />} />
        <Route exact path="/register" render={(props) => <RegisterPage {...props} />} />
        <Redirect to="/home" />
      </Switch>
    </BrowserRouter>
  );
}
export default App;
