import React, { Component } from 'react';
import { connect } from 'react-redux';
import Action from '../../actions/cartActions';
import { withRouter } from 'react-router-dom';

class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: 1
    }
  }

  handleQuantity = (e) => {
    var class_source = e.target.getAttribute('class');
    const { dispatch, cartItems } = this.props;
    if(class_source=='number-plus' || class_source=='number-minus' || class_source=='quant-cart')
    this.state.quantity = parseInt(this.refs.quantity_input.value);
  }

  handleCart = () => {
    const { dispatch, product, cartItems } = this.props;
    const { quantity } = this.state;
    const { _id, name, price, proRef } = product;
    dispatch(Action.addCartProductsAction({ _id, quantity, name, price, proRef }, cartItems.cartItems, quantity));
  }
  capitalizeFirstLetter(string) {
    string=string.toLowerCase()
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  componentDidMount() {
    $('.quant-cart').number();
  }
  render() {
    const { product } = this.props;
    return (
      <div className='col-sm-6'>
        <h1 className="title-pro-details">{ this.capitalizeFirstLetter(product.name) }</h1>
        <h2 className="ref-pro-details">{ product.proRef }</h2>
        <div className="rating-pro-det">
          <i className="fa fa-star"></i>
          <i className="fa fa-star"></i>
          <i className="fa fa-star"></i>
          <i className="fa fa-star"></i>
          <i className="fa fa-star"></i>
          { product.averageRating } Rating(s) | Add Your Rating
        </div>
        <h5 className="ref-price-details a-size-medium a-color-price">${ product.price }</h5>
        <p className="pro-details-desc-p">
          { product.description }
        </p>
        {/*<a href="#" className='btn btn-brd-blue btn-pro-det'>Ask for more details</a>*/}
        <hr className="sep-hr" /> 
        <form className="">
          <span>Quantity:</span>
          <div className="quantity_container_dt" onClick={(e) => this.handleQuantity(e)}>
          <input step="1" min="1" type="number" className="quant-cart" ref="quantity_input" name="" placeholder="1" onChange={(e) => this.handleQuantity(e)} defaultValue={1}  />
          </div>
        </form>
        <div className="buttons-pro-det">
          <a className='btn btn-blue btn-ask-pro-det' onClick={() => this.handleCart()}>Add to cart</a>
          {/*<a href="#" className='btn btn-icon'><i className="far fa-heart"></i></a>*/}
        </div>
      </div>
    )
  }
}

export default connect(
  state => ({
    cartItems: state.cartItems,
  })
)(withRouter(Detail));
