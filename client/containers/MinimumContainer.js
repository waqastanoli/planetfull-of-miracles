import React , { Component } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../public/images/logo.png';
export default class MinimumContainer extends Component {
  render() {
    return (
      <div>
          {this.props.children}
      </div>
    )
  }
}