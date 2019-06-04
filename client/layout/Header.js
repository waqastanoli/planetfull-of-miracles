import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import _ from 'lodash';
import Action from '../actions/accountActions';
// image
import logo from '../public/jocallio/image/logo.png';
import API_URL from '../config/API_URL';
import small_profile_img from '../public/jocallio/image/small_profile.png';
import profileplaceholder from '../public/jocallio/image/small_profileL.png';
// sub components
import Checkout from './header/Checkout';
import HeaderNav from './header/HomeBreadCrumbs';
import CartNav from './header/Cart';
import WishlistNav from './header/Wishlist';
import Detail from './header/Detail';
import { NavDropdown } from 'react-bootstrap'
class Header extends Component {

  
  onLogout(e) {
      e.preventDefault();
      const { dispatch } = this.props;
      dispatch(Action.logoutUser(this.props.history));
  }
  onshowWorks(e){
    e.preventDefault();
      const { dispatch } = this.props;
      dispatch(Action.showorks()); 
  }
  render() {
    const { cartItems, auth, profile } = this.props;
    if(auth.isAuthenticated){
      var helloname = auth.user.name;
      var username = auth.user.username;
    }
    
    if(auth.user.image==null)
    var profile_img=profileplaceholder;
    else
    var profile_img = auth.user.image;//API_URL.API_URL+'/public/'+auth.user.id+'/profile/'+auth.user.image;
    
    return (
      
    <header>
        <div className="main clearfix">
            <div className="logo">
                <a href="#" title="JocialIO">
                    <img src={logo} alt="JocialIO" />
                </a>
                <h5 className="techchi">TECK CHI.com</h5>
            </div>
            <div className="search">
                <span className="sprite iconsearch"></span>
                <input type="Search" placeholder="Search" name="hello" />
            </div>
            <div className="buttonHolder inline-block how_it_works">
                    <button onClick={this.onshowWorks.bind(this)} className="button" id="myBtn">HOW IT WORKS</button>
                </div>
            <div className="fright">
                
                { !auth.isAuthenticated &&
                   <div className="login inline-block">
                <NavDropdown title="Accounts" id="collasible-nav-dropdown" className="profile_name">
                  <NavDropdown.Item onClick={() => this.props.history.push('/signin')}>Sign in</NavDropdown.Item>
                  <NavDropdown.Item onClick={() => this.props.history.push('/register')}>Sign up</NavDropdown.Item>
                </NavDropdown>
                </div>
              }
                {auth.isAuthenticated && <div className="login inline-block">
                    <div className="imageHolder inline-block"><img src={profile_img} alt="image"/></div>
                   
                    
                 
                  <NavDropdown title={helloname} id="collasible-nav-dropdown" className="profile_name">
                  <NavDropdown.Item href={username} >My Account</NavDropdown.Item>
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
    profile: state.profile,
    auth:state.auth
  })
)(withRouter(Header));
