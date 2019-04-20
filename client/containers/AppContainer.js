import React , { Component } from 'react';
import Header from '../layout/Header';
import Footer from '../layout/Footer';

export default class HomeContainer extends Component {
  render() {
    return (
      <div>
        <Header {...this.props}/>
          {this.props.children}
        <Footer />
      </div>
    )
  }
}