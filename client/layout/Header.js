import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import _ from 'lodash';
import Action from '../actions/accountActions';
// image
import logo from '../public/jocallio/image/logo.png';

import small_profile_img from '../public/jocallio/image/small_profile.png';

// sub components
import Checkout from './header/Checkout';
import HeaderNav from './header/HomeBreadCrumbs';
import CartNav from './header/Cart';
import WishlistNav from './header/Wishlist';
import Detail from './header/Detail';
import { NavDropdown } from 'react-bootstrap'
class Header extends Component {

  NavHandle() {
    const { type } = this.props;
    let component = '';
    if(type) {
      if(type === 'cart') component = <CartNav />
      if(type === 'wishlist') component = <WishlistNav />
      if(type === 'checkout') component = <Checkout />
      if(type === 'detail') component = <Detail {...this.props}/>
    } else {
      component = <HeaderNav />
    }
    return component;
  }
  onLogout(e) {
      e.preventDefault();
      const { dispatch } = this.props;
      dispatch(Action.logoutUser(this.props.history));
  }
  render() {
    const { cartItems, auth } = this.props;
    if(auth.isAuthenticated){
      var helloname = auth.user.name;
    }
    
    return (
      
    <header>
        <div className="main clearfix">
            <div className="logo">
                <a href="#" title="JocialIO">
                    <img src={logo} alt="JocialIO" />
                </a>
            </div>
            <div className="search">
                <span className="sprite iconsearch"></span>
                <input type="Search" value="" placeholder="Search" name="hello" />
            </div>
            <div className="fright">
                <div className="buttonHolder inline-block">
                    <button className="button" id="myBtn">how it works</button>
                </div>
                { !auth.isAuthenticated &&
                   <div className="login inline-block">
                <NavDropdown title="Accounts" id="collasible-nav-dropdown" className="profile_name">
                  <NavDropdown.Item onClick={() => this.props.history.push('signin')}>Sign in</NavDropdown.Item>
                  <NavDropdown.Item onClick={() => this.props.history.push('register')}>Sign up</NavDropdown.Item>
                </NavDropdown>
                </div>
              }
                {auth.isAuthenticated && <div className="login inline-block">
                    <div className="imageHolder inline-block"><img src={small_profile_img} alt="image"/></div>
                   
                    
                 
                  <NavDropdown title={helloname} id="collasible-nav-dropdown" className="profile_name">
                  <NavDropdown.Item href="#">My Account</NavDropdown.Item>
                  <NavDropdown.Item href="#">Settings</NavDropdown.Item>
                    <NavDropdown.Item href="#" onClick={this.onLogout.bind(this)}>Logout</NavDropdown.Item>
                </NavDropdown>
              
                </div>}
            </div>
        </div>
    </header>
    )
  }
}

export default connect(
  state => ({
    cartItems: state.cartItems,
    auth:state.auth
  })
)(withRouter(Header));
