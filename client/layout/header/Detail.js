import React, { Component } from 'react';

export default class Detail extends Component {
  lowerCaseAllWordsExceptFirstLetters(string) {
    return string.replace(/\w\S*/g, function (word) {
        return word.charAt(0) + word.slice(1).toLowerCase();
    });
  }
  capitalizeFirstLetter(string) {
    string=string.toLowerCase()
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  render() {
    const {params} = this.props.match;
    //var productname = params.productName.replace(/-/g, ' ').toLowerCase().replace(/(^| )(\w)/g, s => s.toUpperCase()).substr(0, 36) + '...'
    var productname = this.capitalizeFirstLetter(params.productName.replace(/-/g, ' '));
    return (
      <div className="sub-pg-main-header-area container-fluid"> 
        <div className="container">
        <div className="row">
          <div className="col-sm-12 fadeInLeft animated ">
            <div className="pg-loc">Home / Category / {productname}</div>
            {/* <h1 className='sub-pg-header-h1'>{productname} </h1>*/}
          </div> 
        </div>	
        </div> 
			</div>
    )
  }
}