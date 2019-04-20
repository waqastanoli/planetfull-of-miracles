import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import _ from 'lodash';
import Actions from '../../actions/cartActions';

class Product extends Component {

  handleProductDetail = () => {
    const { history, product } = this.props;
    history.push(`/product/detail/${product._id}/${encodeURI(product.title.replace(/\s+/g, '-').replace('#', '').replace(/\//g, ''))}`, { product });
  }

  addToCart = () => {
    const { product, cartItems, dispatch } = this.props;
    const { _id, name, price, proRef, images } = product;

    dispatch(Actions.addCartProductsAction({ _id, quantity: 1, name, price, proRef, productUrl: images[0] }, cartItems.cartItems, 1));
    alert('*** item added in cart **** ');
  }
  getFraction(n) {
    var s = String(n);
    return s.slice(s.indexOf('.'));
  }
  numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  capitalizeFirstLetter(string) {
    string=string.toLowerCase()
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  divideprice=(price)=>{
    var divided = price.toString().split('.');
    
    var fraction = divided[1];
    var beforedecimal = this.numberWithCommas(divided[0]);

    return (
      <span className='price_home'>
      <span className='before_dec'>{beforedecimal}</span>
      <span className='after_dec'>{fraction}</span>
      </span>
      )
  }

  render() {
    const { product } = this.props;
    return (
      <div className="col-sm-4 product-item-wrp">
        <div className="product-wrp">
          <div className='product-img-wrp' onClick={ () => this.handleProductDetail()}>
            <img src={product.images[0]} /> 
          </div>
          <div className="caption">
            <div className='icons-cap-wrp'> 
              <a href="#" className='caption-pro-links'>
                <i className='fa fa-search'></i>
              </a>
              <a href="#" className='caption-pro-links'>
                <i className='fa fa-link'></i>
              </a>
              <a className='caption-pro-links' onClick={() => this.addToCart()}>
                <i className="fas fa-shopping-cart"></i>
              </a>
            </div>
            <div>
              <a onClick={ () => this.handleProductDetail()} className='btn btn-brd-white btn-pro-form-cap'>Ask for more details</a>
            </div>
          </div>
          <a className='title_anchor' onClick={ () => this.handleProductDetail()}><h1 className='pro-name'>{ this.capitalizeFirstLetter(product.name) }</h1></a>
          <a className='title_anchor' onClick={ () => this.handleProductDetail()}><h2 className='pro-ref'>{ product.proRef }</h2></a>
          <h3 className='pro-price'><span className='currency_small'>$</span>{ this.divideprice(product.price) }</h3>
        </div>
      </div>
    )
  }
}

export default connect(
  state => ({
    cartItems: state.cartItems,
  })
)(withRouter(Product));
