import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Signup from "./user/signup";
import Signin from "./user/signin";
import forgetpasswordlink from "./user/forgetpasswordLink";
import forgetPassword from "./user/forgetPassword";
import Home from "./core/newHome";
import Shop from "./core/Shop";
import PrivateRoute from "./auth/privateRoute";
import AdminRoute from "./auth/adminRoute";
import dashBoard from "./user/userDashboard";
import adminDashBoard from "./user/adminDashboard";
import AddCategory1 from "./admin/createCategory1";
import AddProduct from "./admin/CreateProduct";
import Product from "./core/Product2";
import Cart from "./core/Cart";
import SendMail from "./core/mail";
import Orders from "./admin/orders";
import Profile from "./user/Profile";
import ManageProducts from "./admin/ManageProducts";
import UpdateProduct from "./admin/UpdateProduct";
import ShowCategory from "./core/categoryPage";
import CategoryPage from "./core/categoryPage";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/signin" exact component={Signin} />
        <Route path="/forgetpassword" exact component={forgetpasswordlink} />
        <Route
          path="/forgetpasswordlink/:token"
          exact
          component={forgetPassword}
        />
        {/* <Route
          path="/forgetpassword/:token"
          exact
          component={forgetpasswordlink}
        /> */}
        <Route path="/product/:productId" exact component={Product} />
        <Route path="/cart" exact component={Cart} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/shop" exact component={Shop} />
        <Route path="/" exact component={Home} />
        <Route path="/send" exact component={SendMail} />
        {/* <Route path="/facebookLogin" exact component={FacebookLogin} /> */}
        <PrivateRoute path="/user/dashboard" exact component={dashBoard} />
        <PrivateRoute path="/profile/:userId" exact component={Profile} />
        {/* <PrivateRoute path="/send" exact component={SendMail} /> */}
        <AdminRoute path="/admin/dashboard" exact component={adminDashBoard} />
        <AdminRoute path="/create/category" exact component={AddCategory1} />
        <AdminRoute
          path="/category/:categoryId"
          exact
          component={ShowCategory}
        />
        <AdminRoute
          path="/product/by/category/:categoryId"
          exact
          component={ShowCategory}
        />
        <AdminRoute path="/create/product" exact component={AddProduct} />
        <AdminRoute path="/admin/products" exact component={ManageProducts} />
        <AdminRoute
          path="/admin/product/update/:productId/"
          exact
          component={UpdateProduct}
        />
        <AdminRoute path="/admin/orders" exact component={Orders} />
      </Switch>
    </BrowserRouter>
  );
};
export default Routes;
