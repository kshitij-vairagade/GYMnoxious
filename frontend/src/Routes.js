import React from "react";
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Signin from './user/Signin'
import Signup from './user/Signup'
import Home from './core/Home';
import Shop from './core/Shop';
import AdminRoute from './auth/AdminRoute';
import PrivateRoute from './auth/PrivateRoute';
import Dashboard from './user/UserDashboard';
import AdminDashboard from './user/AdminDashboard';
import AddCategory from './admin/AddCategory';
import AddService from "./admin/AddService";
import Service from "./core/Service"
import Cart from "./core/Cart";
import Orders from './admin/Orders';
import Profile from './user/Profile';

const Routes = () => {
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/shop" exact component={Shop} />
                <Route path="/service/:serviceId" exact component={Service} />
                <Route path="/signin" exact component={Signin} />
                <Route path="/signup" exact component={Signup} />
                <PrivateRoute path="/user/dashboard" exact component={Dashboard} />
                <AdminRoute path="/create/category" exact component={AddCategory} />
                <AdminRoute path="/create/service" exact component={AddService} />
                <AdminRoute path="/admin/dashboard" exact component={AdminDashboard} />
                {/* <AdminRoute path="/admin/orders" exact component={Orders} /> */}
                <PrivateRoute path="/profile/:userId" exact component={Profile} />
                <Route path="/cart" exact component={Cart} />
            </Switch>
        </BrowserRouter>
    );
};

export default Routes;

