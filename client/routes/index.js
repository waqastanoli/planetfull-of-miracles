import React, { Component } from 'react';
import { Route, Switch  } from 'react-router';

// PAGES //
import Home from '../pages/Home';
import ProductDetail from '../pages/ProductDetail';
import Wishlist from '../pages/Wishlist';
import Cart from '../pages/Cart';
import Checkout from '../pages/Checkout';
import Signup from '../pages/Signup';
import Signin from '../pages/Signin';
import Verification from '../pages/Verification';
// CONTAINERS //
import AppContainer from '../containers/AppContainer';
import MinimumContainer from '../containers/MinimumContainer';

// Routing in React.js //

export const renderRoutes = () => {
  return (
    <div>
      <Switch>
        
        <Route exact path="/register" render={ props => <AppRoute Component={Signup} Layout={MinimumContainer} props={props} /> } />
        <Route exact path="/signin" render={ props => <AppRoute Component={Signin} Layout={MinimumContainer} props={props} /> } />
        <Route exact path="/verification" render={ props => <AppRoute Component={Verification} Layout={MinimumContainer} props={props} /> } />
        <Route exact path="/product/detail/:productID/:productName" render={ props => <AppRoute Component={ProductDetail} Layout={AppContainer} props={props} type={'detail'} /> } />
        <Route exact path="/product/wishlist" render={ props => <AppRoute Component={Wishlist} Layout={AppContainer} props={props} type={'wishlist'} /> } />
        <Route exact path="/product/cart" render={ props => <AppRoute Component={Cart} Layout={AppContainer} props={props} type={'cart'} /> } />
        <Route exact path="/product/checkout" render={ props => <AppRoute Component={Checkout} Layout={AppContainer} props={props} type={'checkout'} /> } />
        <Route exact path="/:userName" render={ props => <AppRoute Component={Home} Layout={AppContainer} props={props} /> } />
      </Switch>
    </div>
  )
}

// Structure according to separate page or any container over page etc //
const AppRoute = ({ Component, Layout, props, type }) => {
  if (Layout) {
    return (
      <Layout {...props} type={type}>
        <Component {...props} type={type} />
      </Layout>
    );
  } else if (!Component) {
    return <Layout {...props} type={type} />;
  } else {
    return <Component {...props} type={type} />;
  }
};