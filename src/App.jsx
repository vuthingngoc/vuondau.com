import React from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';

//page
import Homepage from './pages/HomePage';
import Index from 'pages/Index';
import ProductDetail from 'pages/ProductDetail';
import LoginPage from 'pages/LoginPage/index';
import RegisterPage from 'pages/RegisterPage';
import ShoppingCartPage from 'pages/ShoppingCart';
import AddProductPage from 'pages/AddProductPage';

import FarmsPage from 'pages/FarmsPage';
import FarmDetail from 'pages/FarmDetailPage';
import HavestPage from 'pages/HavestPage';
import HavestDetailPage from 'pages/HavestDetailPage';
import AuthContextProvider from 'contexts/AuthContext';
import { initializeIcons } from '@fluentui/font-icons-mdl2';
import ListAccountPage from 'pages/ListAccountPage';
import EditAccountPage from 'pages/EditAccountPage';

function App() {
  initializeIcons();
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" render={(props) => <Homepage {...props} />} />
          <Route exact path="/home" render={(props) => <Homepage {...props} />} />
          <Route path="/product/productdetail" render={(props) => <ProductDetail {...props} />} />
          <Route exact path="/farms" render={(props) => <FarmsPage {...props} />} />
          <Route path="/farms/farmdetail/:id" render={(props) => <FarmDetail {...props} />} />
          <Route exact path="/components" render={(props) => <Index {...props} />} />
          <Route exact path="/login" render={(props) => <LoginPage {...props} />} />
          <Route exact path="/register" render={(props) => <RegisterPage {...props} />} />
          <Route exact path="/shoppingcart" render={(props) => <ShoppingCartPage {...props} />} />
          <Route path="/addproduct" render={(props) => <AddProductPage {...props} />} />
          <Route exact path="/havests" render={(props) => <HavestPage {...props} />} />
          <Route path="/havests/havestdetail/" render={(props) => <HavestDetailPage {...props} />} />
          <Route exact path="/admin/manageaccount" render={(props) => <ListAccountPage {...props} />} />
          <Route path="/admin/manageaccount/:id/edit" render={(props) => <EditAccountPage {...props} />} />
          <Redirect to="/home" />
        </Switch>
      </BrowserRouter>
    </AuthContextProvider>
  );
}
export default App;