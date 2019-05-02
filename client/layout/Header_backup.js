import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import _ from 'lodash';
import Action from '../actions/accountActions';
// image
import logo from '../public/images/logo.png';
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
      var helloname = "Hello "+auth.user.name;
    }
    
    return (
      <header className="header-wrap_abm">
        <div className='top-nav-wrp'>
          <div className="container">
            <div className="row">
              <div className="col-sm-6">
                {/*<select className='lang-op'>
                                  <option value="En">En</option>
                                  <option value="Fr" >Fr</option>
                                </select>*/}
                {/*<select className='curren-op'>
                                  <option>$USD</option>
                                  <option>$CAD</option>
                                </select> */}
              </div>
              <div className="col-sm-6 h_top-lks-wrp">
                { !auth.isAuthenticated &&
                <NavDropdown title="Accounts" id="collasible-nav-dropdown" className="top-lks">
                  <NavDropdown.Item onClick={() => this.props.history.push('signin')}>Sign in</NavDropdown.Item>
                  <NavDropdown.Item onClick={() => this.props.history.push('register')}>Sign up</NavDropdown.Item>
                </NavDropdown>
              }
              { auth.isAuthenticated &&
                  <NavDropdown title={helloname} id="collasible-nav-dropdown" className="top-lks">
                  <NavDropdown.Item href="#">My Account</NavDropdown.Item>
                  {/*<NavDropdown.Item href="#">My Orders</NavDropdown.Item>
                                    <NavDropdown.Item onClick={() => this.props.history.push('/product/wishlist')}>My Wishlist</NavDropdown.Item>*/}
                  <NavDropdown.Item href="#" onClick={this.onLogout.bind(this)}>Logout</NavDropdown.Item>
                </NavDropdown>
              }
                <NavLink to="/product/cart" className='top-lks'>MY CART <span className='cart-items'>{cartItems.cartItems.length}</span></NavLink>
                
              </div>
            </div>
          </div>
        </div>
        <nav className="navbar navbar-expand-lg navbar-light">
				  <div className="container">
            <NavLink to='/' className="navbar-brand" ><img className='logo_image' src={logo} /></NavLink>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
					    <span className="navbar-toggler-icon"></span>
					  </button>
            <div className="collapse navbar-collapse float-right" id="navbarSupportedContent">
					    <ul className="navbar-nav">
                <li className='nav-item'>
                  <NavLink to='/' className="nav-link active" title="Landing Pages">All product</NavLink>
                </li>
                <li className='nav-item'>
                  <a className="nav-link" href="#" title="Elements">About</a>
                </li>
                <li className='nav-item'>
                  <a className="nav-link" href="#" title="Contact">Solution</a>
                </li>
                <li className='nav-item'>
                  <a className="nav-link" href="#" title="Buy Now">News</a>
                </li> 
                <li className='nav-item'>
                  <a className="nav-link" href="#" title="Buy Now">Careers</a>
                </li> 
                <li className='nav-item'>
                  <a className="nav-link" href="#" title="Buy Now">Contact</a>
                </li> 
                <li className='nav-item nav-item-src'>
                  <i className='fa fa-search'></i>
                </li> 
					    </ul> 
					  </div>
          </div>
        </nav>
        {
          this.NavHandle()
        }
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
