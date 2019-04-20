import React, { Component } from 'react';
import TPS615 from '../../public/images/products/TPS615.png';

export default class HomeNavBar extends Component {
  render() {
    return (
      <div className="main-header-area container-fluid"> 
        <div className="container">
          <div className="row">
            <div className="col-sm-7 fadeInLeft animated ">

              <h1 className='main-header-h1-bn'>Welcome to whole sale tech store! </h1>
                            {/*<h4 className='header-h4-bn'>
                              Sed in odio pellentesque, laoreet justo vel, malesuada velit. Sed <br/> tempus id metus sit amet finibus. Etiam eu elit enim. 
                            </h4>
                            <a className='btn btn-white' href="#">Read More</a>*/}
            </div>
            <div className="col-sm-5 fadeInRight animated ">
              <img src={TPS615} className="main-img img-responsive" />
            </div>
          </div>	
        </div> 
      </div> 
    )
  }
}