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
import OrderManagerPage from './pages/AdminOrderManager/adminOrderManagerPage'
import { initializeIcons } from '@fluentui/font-icons-mdl2';
import ListAccountPage from 'pages/ListAccountPage';
import EditAccountPage from 'pages/EditAccountPage';
import { NotificationContainer } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import ProductPage from 'pages/ProductListPage';
import HomePage from 'pages/AdminHomePage/homePage';
import FarmManagerDetail from 'pages/AdminFarmManagerDetail/farmDetail'
import CheckoutPage from 'pages/CheckoutPage';
import ProductoManagerPage from 'pages/ProductManagerPage';
import AdminProductDetailPage from 'pages/AdminProductDetailPage';
import CreateProfilePage from 'pages/CreateProfilePage';
import CustomerOrder from 'pages/CustomerOrderPage';

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
          <Route exact path="/newprofile" render={(props) => <CreateProfilePage {...props} />} />
          <Route exact path="/shoppingcart" render={(props) => <ShoppingCartPage {...props} />} />
          <Route path="/shoppingcart/checkout/:id" render={(props) => <CheckoutPage {...props} />} />
          <Route path="/order" render={(props) => <CustomerOrder {...props} />} />
          <Route path="/addproduct" render={(props) => <AddProductPage {...props} />} />
          <Route exact path="/harvests/:id" render={(props) => <HavestPage {...props} />} />
          <Route path="/harvests/harvestdetail/:id" render={(props) => <HavestDetailPage {...props} />} />
          <Route exact path="/production" render={(props) => <ProductPage {...props} />} />
          <Route exact path="/admin/manageaccount" render={(props) => <ListAccountPage {...props} />} />
          <Route path="/admin/manageaccount/:view/:id/:action" render={(props) => <EditAccountPage {...props} />} />
          <Route path="/admin/manageproduct/productdetail/:id/:action" render={(props) => <AdminProductDetailPage {...props} />} />
          <Route exact path="/admin/farmManagement" render={(props) => <FarmManagerPage {...props} />} />
          <Route exact path="/admin/home" render={(props) => <HomePage {...props} />} />
          <Route exact path="/admin/farmManagement/:id" render={(props) => <FarmManagerDetail {...props} />} />
          <Route exact path="/admin/manageproduct" render={(props) => <ProductoManagerPage {...props} />} />
          <Route exact path="/admin/manageorder" render={(props) => <OrderManagerPage {...props} />} />
          <Redirect to="/home" />
        </Switch>
      </BrowserRouter>
      <NotificationContainer />
    </AuthContextProvider>
  );
}
export default App;
