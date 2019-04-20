import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Action from '../actions/cartActions';

class Cart extends Component {
  removeItemFromCart = (productID) => {
    const { cartItems, dispatch } = this.props;
    dispatch(Action.removeCartProductAction(productID, cartItems.cartItems));
  }

  handleQuantity = (e, productID) => {
    var class_source = e.target.getAttribute('class');
    const { dispatch, cartItems } = this.props;
    if(class_source=='number-plus' || class_source=='number-minus' || class_source=='quant-cart')
    dispatch(Action.updateCartProductQuantity(productID, parseInt(this.refs['quantity-'+productID].value), cartItems.cartItems));
  }

  handleSubTotal = () => {
    const { cartItems } = this.props;
    let subTotal = 0;
    if(cartItems && cartItems.cartItems && cartItems.cartItems.length > 0) {
      cartItems.cartItems.forEach((item) => {
        subTotal = subTotal + (item.quantity * item.price);
      })
    }
    return `${subTotal}`;
  }
  checkout =()=>{
    const {auth} = this.props;
    if(auth.isAuthenticated){
      this.props.history.push('/product/checkout');
    } else {
      this.props.history.push('/signin');
    }
  }
  componentDidMount() {
    $('.quant-cart').number();
  }
  render() {
    const { cartItems } = this.props;
    
    return (
      <div className="sub-pg-main-container container">
        <div className="row">
          <div className="col-sm-12">
            <table className="shop_table" cellSpacing="0">
              <thead>
                <tr>
                  <th className="shop_table_th-title shop_table_th-title-pro-nm shop_table-cart_th-title-pro-nm">PRODUCT NAME</th>
                  <th className="shop_table_th-title">PRICE</th>
                  <th className="shop_table_th-title">Quantity</th>
                  <th className="shop_table_th-title">Total</th>
                  <th className="shop_table_th-title">&nbsp;</th> 
                </tr>
              </thead>
              <tbody>
                {
                  cartItems && cartItems.cartItems && cartItems.cartItems.length > 0 &&
                  cartItems.cartItems.map((item, index) => {
                    return (
                      <tr className="shop-table_tr" key={index}>
                        <td className="shop-table-td_product-name shop-table-cart-td_product-name">
                          <a href="#"><img src={item.productUrl} style={{ width: '30%' }} /></a>
                          <div className='shop-table_pro-name_wrp'>
                            <a href="#" className='shop-table_pro-name pro-name'>{ item.name }</a>
                            <span className='shop-table_ref_pro pro-ref'>{ item.proRef }</span> 
                          </div>
                          <div className="clearfix"></div>
                        </td>
                        <td className="shop-table-td_product-total" data-title="Price">
                          <span className='shop-table_pri'>${ item.price }</span>
                        </td>
                        <td className="shop-table-td_product-quant" data-title="Quantity"  onClick={(e) => this.handleQuantity(e, item._id)}>
                          <input type="number" value={ item.quantity } ref={'quantity-'+item._id} onChange={(e) => this.handleQuantity(e, item._id)} step="1" min="1" max="1000" className="quant-cart" />
                        </td>
                        <td className="shop-table-td_product-total" data-title="Total">
                          <span className='shop-table_pri'>${ (item.price * item.quantity).toFixed(2) }</span>
                        </td>
                        <td className="shop-table-td_product-remove">
                          <a onClick={ () => this.removeItemFromCart(item._id)}  className="shop-table_remove-item" aria-label="Remove this item"><i className="fas fa-times"></i></a>	
                        </td> 
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>
          </div>
        </div>
        <div className="row">
			 	<div className="col-sm-12 col-md-6"> </div>
			 	<div className="col-sm-12 col-md-6 total-cart_wrp"> 
		 			<h1 className="header-total-cart">Cart Totals</h1>
		 			<div className='desc-total-cart_wrp'>
		 				<div className='desc-total-cart_wrp-rw row'>
		 					<h1 className="title-desc-total-cart col-sm-6">Subtotal</h1>
		 					<span className="shop-table_pri col-sm-6 txt-right">$ {this.handleSubTotal()}</span>
		 				</div>
		 				<div className='desc-total-cart_wrp-rw row'>
		 					<h1 className="title-desc-total-cart col-sm-6">shipping</h1>
		 					<div className="col-sm-6 txt-right">
		 						<form>
								  <input type="radio" name="shipping" defaultValue="freeShipping" id="free" /> <label htmlFor="free">Free Shipping</label><br/>
								  <input type="radio" name="shipping" id="DHL" defaultValue="opt-ship-1" /> <label htmlFor="DHL">DHL</label><br/>
								  <input type="radio" name="shipping" id="FedEx" defaultValue="opt-ship-2" /><label htmlFor="FedEx"> FedEx</label>
								</form>
								<div className="clearfix"></div>
								<a href="#" className='change-add-lk'>Change Address</a>
		 					</div>
		 				</div>
		 				<div className='desc-total-cart_wrp-rw row'>
		 					<h1 className="title-desc-total-cart col-sm-6">SALE</h1>
		 					<span className="shop-table_pri col-sm-6 txt-right">$ 0.00</span>
		 				</div>
		 				<div className='desc-total-cart_wrp-rw row'>
		 					<h1 className="title-desc-total-cart col-sm-6">Total</h1>
		 					<span className="shop-table_pri col-sm-6 txt-right">$ {this.handleSubTotal()}</span>
		 				</div>
            <div className='desc-total-cart_wrp-rw row'>
              <span className="shop-table_pri col-sm-12 txt-right"><button className="col-md-12 btn btn-blue btn-ask-pro-det" onClick={this.checkout.bind(this)}>Proceed to Checkout</button></span>
            </div>
		 			</div>
		 			{/* <a className='pro-check-btn btn btn-blue hvr-sweep-to-right'>Add to cart</a>  */}
			 	</div>
			 </div>
      </div>
    )
  }
}

export default connect(
  state => ({
    cartItems: state.cartItems,
    auth: state.auth
  })
)(withRouter(Cart));
