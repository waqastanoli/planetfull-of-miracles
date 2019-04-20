import React , { Component } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../public/images/logo.png';
export default class MinimumContainer extends Component {
  render() {
    return (
      <div>
      <div className="container">
      <div className="row justify-content-lg-center justify-content-md-center justify-content-sm-center">
      <NavLink to='/' className="navbar-brand" ><img className='logo_image' src={logo} /></NavLink>
      </div>
      </div>
          {this.props.children}
      </div>
    )
  }
}