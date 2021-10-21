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
import FarmManagerPage from 'pages/AdminFarmManagerPage';
import FarmByRegion from 'pages/FarmsPage/components/FarmByRegion'

import { initializeIcons } from '@fluentui/font-icons-mdl2';
import ListAccountPage from 'pages/ListAccountPage';
import EditAccountPage from 'pages/EditAccountPage';
import { NotificationContainer } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import ProductPage from 'pages/ProductListPage';
import HomePage from 'pages/AdminHomePage/homePage';

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
          <Route path="/farms/mien-bac" render={(props) => <FarmByRegion {...props} />} />
          <Route path="/farms/mien-trung" render={(props) => <FarmByRegion {...props} />} />
          <Route path="/farms/mien-nam" render={(props) => <FarmByRegion {...props} />} />
          <Route path="/farms/farmdetail/:id" render={(props) => <FarmDetail {...props} />} />
          <Route exact path="/components" render={(props) => <Index {...props} />} />
          <Route exact path="/login" render={(props) => <LoginPage {...props} />} />
          <Route exact path="/register" render={(props) => <RegisterPage {...props} />} />
          <Route exact path="/shoppingcart" render={(props) => <ShoppingCartPage {...props} />} />
          <Route path="/addproduct" render={(props) => <AddProductPage {...props} />} />
          <Route exact path="/havests" render={(props) => <HavestPage {...props} />} />
          <Route path="/havests/havestdetail/" render={(props) => <HavestDetailPage {...props} />} />
          <Route exact path="/production" render={(props) => <ProductPage {...props} />} />
          <Route exact path="/admin/manageaccount" render={(props) => <ListAccountPage {...props} />} />
          <Route path="/admin/manageaccount/:id/edit" render={(props) => <EditAccountPage {...props} />} />
          <Route path="/admin/manageaccount/:id/view" render={(props) => <EditAccountPage {...props} />} />
          <Route exact path="/admin/farmManagement" render={(props) => <FarmManagerPage {...props} />} />
          <Route exact path="/admin/home" render={(props) => <HomePage {...props} />} />
          <Redirect to="/home" />
        </Switch>
      </BrowserRouter>
      <NotificationContainer />
    </AuthContextProvider>
  );
}
export default App;
