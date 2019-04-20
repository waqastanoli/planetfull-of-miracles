import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
export default class Footer extends Component {
  render() {
    return (
      <footer className="sp-ine-top-section-100">
        <div className='footer-main-wrp'>
          <div className="container">
            <div className="row">
              {/*<div className="col-sm-3">
                              <h1 className="footer-title">About</h1>
                              <a href="#" className='footer-lnk'>Company profile </a>
                              <a href="#" className='footer-lnk'>Trade Services</a>
                              <a href="#" className='footer-lnk'>Our Studio</a>
                              <a href="#" className='footer-lnk'>Showrooms</a>
                            </div>*/}
              <div className="col-sm-3">
                <h1 className="footer-title">Customer services</h1>
                {/*<a href="#" className='footer-lnk'>Delivery & Returns</a>
                                <a href="#" className='footer-lnk'>Contact Us </a>*/}
                <NavLink to='/register' className="footer-lnk" title="Register">Register</NavLink>
                <NavLink to='/signin' className="footer-lnk" title="Login">Login</NavLink>
                
                
						  </div>
              {/*<div className="col-sm-3">
                              <h1 className="footer-title">Technical Support</h1>
                              
                              <a href="#" className='footer-lnk'>Enterprise honor </a>
                              
                              <a href="#" className='footer-lnk'>FAQs</a> 
                            </div>*/}
              {/*<div className="col-sm-3">
                              <h1 className="footer-title">Help center</h1>
                              <a href="#" className='footer-lnk'>Warranty Policy </a>
                              <a href="#" className='footer-lnk'>Return instructions </a> 
                              <a href="#" className='footer-lnk'>Contact us</a>
                            </div>*/}
            </div>
          </div>
        </div>
        <div className="footer-bottom-wrp">
          <div className="container">
            <div className="row"> 
              {/*<div className="col-sm-6">
                              <ul className='footer-list'>
                                <li><a href="#">About Us</a> </li>   
                                <li><a href="#">Blog</a> </li>
                                <li><a href="#">FAQs</a> </li>
                                <li><a href="#">Order</a> </li>
                                <li><a href="#">Tracking</a> </li>
                                <li><a href="#">Contact</a> </li>                             
                              </ul>
                            </div>*/}
              <div className="col-sm-12">
                <div className='sm-wrp'>
                  <p>Connect with us:</p>
                  <a href="#"><i className='fab fa-twitter'></i></a>
                  <a href="#"><i className='fab fa-youtube'></i></a>
                  <a href="#"><i className='fab fa-linkedin'></i></a>
                  <a href="#"><i className='fab fa-facebook'></i></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    )
  }
}