import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';
import Validator from 'validator';

import Actions from '../actions/cartActions';
import checkoutActions from '../actions/checkoutActions';
import PayPalExpressBtn from '../payment/PayPalExpressCheckout';

class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      client: {
        sandbox: 'EBWKjlELKMYqRNQ6sYvFo64FtaRLRR5BdHEESmha49TM',
        production: 'EBWKjlELKMYqRNQ6sYvFo64FtaRLRR5BdHEESmha49TM',
      },
      firstName: '',
        lastname: '',
        company: '',
        country: '',
        address1: '',
        address2: '',
        city: '',
        state: '',
        zipCode: '',
        phone: '',
        email: '',
        note: ''
    }
  }

  handleInput = (type, e) => {
    this.setState({ [type] : e.target.value });
  }

  handleOrder = () => {
    let error = false;
    const { 
      firstName, 
      lastname, 
      company, 
      country, 
      address_1, 
      address_2, 
      city, 
      state, 
      zipCode, 
      phone, 
      email, 
      note 
    } = this.state;

    if (Validator.equals(firstName || '', '')) error = true;
    else if (Validator.equals(lastname || '', '')) error = true;
    else if (Validator.equals(company || '', '')) error = true;
    else if (Validator.equals(country || '', '')) error = true;
    else if (Validator.equals(address_1 || '', '')) error = true;
    else if (Validator.equals(address_2 || '', '')) error = true;
    else if (Validator.equals(city || '', '')) error = true;
    else if (Validator.equals(state || '', '')) error = true;
    else if (Validator.equals(zipCode || '', '')) error = true;
    else if (Validator.equals(phone || '', '')) error = true;
    else if (Validator.equals(email || '', '')) error = true;
    else if (Validator.equals(note || '', '')) error = true;

    if (error) {
      console.log(' *** PLEASE FILL REQUIRED FIELDS *** ');
    }
    const { cartItems, dispatch } = this.props;
    if (cartItems && cartItems.cartItems && cartItems.cartItems.length > 0) {
      const total = this.handlePaymentTotal();
      const order_items = cartItems.cartItems.map(item => item._id);
      dispatch(checkoutActions.checkoutAction({ total, order_items, ...this.state }));
    }
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

  handlePaymentTotal = () => {
    const { cartItems } = this.props;
    let subTotal = 0;
    if(cartItems && cartItems.cartItems && cartItems.cartItems.length > 0) {
      cartItems.cartItems.forEach((item) => {
        subTotal = subTotal + (item.quantity * item.price);
      })
    }
    return subTotal;
  }

  render() {
    const { cartItems } = this.props;
    const onSuccess = (payment) => {
      this.handleOrder();
      alert(' *** ORDER PLACED SUCCESSFULLY !!! ');
    }
    const onCancel = (data) => {
      alert('PROCEDD PAYMENT TO PLACE ORDER');
    }
    const onError = (err) => {
      console.log('ERROR !!!', err);
    }

    let currency = 'USD';
    let total = this.handlePaymentTotal();

    return (
      <div className="sub-pg-main-container container">
        <div className="row">
          <div className="col-sm-12  col-md-6">
            <form className="checkout-form">
              <h1 className='header-check-form'>BILLING DETAILS</h1>
              <div className="form-row">
                <div className="col">
                  <label>First Name <span className='red'>*</span></label>
                  <input type="text" className="form-control" onChange={(e) => this.handleInput('firstName', e)} />
                </div>
                <div className="col">
                  <label>Last Name <span className='red'>*</span></label>
                  <input type="text" className="form-control" onChange={(e) => this.handleInput('lastname', e)} />
                </div>
              </div>
              <div className="form-row">
                <div className="col">
                  <label>Company Name (optional)</label>
                  <input type="text" className="form-control" onChange={(e) => this.handleInput('company', e)} />
                </div> 
              </div>
              <div className="form-row">
                <div className="col">
                  <label>Country <span className='red'>*</span></label>
                  <input type="text" className="form-control" onChange={(e) => this.handleInput('country', e)} />
                </div> 
              </div>
              <div className="form-row">
                <div className="col">
                  <label>Street Address <span className='red'>*</span></label>
                  <input type="text" className="form-control" placeholder="House number and street name" onChange={(e) => this.handleInput('address_1', e)} />
                </div> 
              </div>
              <div className="form-row">
                <div className="col"> 
                  <input type="text" className="form-control" placeholder="Apartment, siute,unit etc. (optional) " onChange={(e) => this.handleInput('address_2', e)} />
                </div> 
              </div>
              <div className="form-row">
                <div className="col">
                  <label>Town / City <span className='red'>*</span></label>
                  <input type="text" className="form-control" onChange={(e) => this.handleInput('city', e)} />
                </div> 
              </div>
              <div className="form-row">
                <div className="col">
                  <label>State / Country <span className='red'>*</span></label>
                  <input type="text" className="form-control" onChange={(e) => this.handleInput('state', e)} />
                </div> 
              </div>
              <div className="form-row">
                <div className="col">
                  <label>Postcode / Zip <span className='red'>*</span></label>
                  <input type="text" className="form-control" onChange={(e) => this.handleInput('zipCode', e)} />
                </div> 
              </div>
              <div className="form-row">
                <div className="col">
                  <label>Phone <span className='red'>*</span></label>
                  <input type="text" className="form-control" onChange={(e) => this.handleInput('phone', e)} />
                </div> 
              </div>
              <div className="form-row">
                <div className="col">
                  <label>Email address <span className='red'>*</span></label>
                  <input type="text" className="form-control" placeholder="email@email.com" onChange={(e) => this.handleInput('email', e)} />
                </div> 
              </div>
              <div className="form-check form-check-ship">
                <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                <label className="form-check-label form-check-label-title" for="exampleCheck1">Ship To a different address?</label>
              </div>
              <div className="form-row">
                <div className="col">
                  <label>Order note (optional) </label>
                  <textarea className='check-ship_ta' placeholder="Notes about your, e.g. special notes for delivery." onChange={(e) => this.handleInput('note', e)}></textarea>
                </div> 
              </div>  
            </form>
          </div>
          <div className="col-sm-12 col-md-6"> 
            <div className=' total-cart_wrp'>
              <h1 className="header-total-cart">YOUR ORDER</h1>
              <div className='desc-total-cart_wrp'>
                <div className='desc-total-cart_wrp-rw row'>
                  <h1 className="title-desc-total-cart col-sm-6">Product</h1>
                  <h1 className="title-desc-total-cart col-sm-6 txt-right">Total</h1> 
                </div>
                {
                  cartItems && cartItems.cartItems && cartItems.cartItems.length > 0 &&
                  cartItems.cartItems.map((item, index) => {
                    return (
                      <div className='desc-total-cart_wrp-rw row' key={index}>
                        <h1 className="title-pro-desc-total-cart col-sm-6">
                          {item.name}
                        </h1>
                        <span className="shop-table_pri col-sm-6 txt-right txt-md-16">$ {`${ item.price * item.quantity }.00`}</span>
                      </div>
                    )
                  })
                }
                <div className='desc-total-cart_wrp-rw row'>
                  <h1 className="title-desc-total-cart col-sm-6">Subtotal</h1>
                  <span className="shop-table_pri col-sm-6 txt-right txt-md-20">$ {this.handleSubTotal()}</span>
                </div>
                <div className='desc-total-cart_wrp-rw row'>
                  <h1 className="title-desc-total-cart col-sm-6">shipping</h1>
                  <div className="col-sm-6 txt-right">
                    <form>
                      <input type="radio" name="shipping" value="freeShipping" /> Free Shipping<br/>
                      <input type="radio" name="shipping" value="opt-ship-1" /> Shipping Option 1<br/>
                      <input type="radio" name="shipping" value="opt-ship-2" /> Shipping Option 2
                    </form>
                    <div className="clearfix"></div> 
                  </div>
                </div>
                <div className='desc-total-cart_wrp-rw row'>
                  <h1 className="title-desc-total-cart title-tot-desc-total-cart col-sm-6">Total</h1>
                  <span className="shop-table_pri col-sm-6 txt-right txt-md-20">$ {this.handleSubTotal()}</span>
                </div>
              </div>
              {/* <a 
                className='pro-check-btn btn btn-blue hvr-sweep-to-right'
                onClick={() => this.handleOrder()}
              >
                Place Order
              </a> */}
              <div
                style-={{ display: 'flex', justifyContent: 'center' }}                
              >
                <PayPalExpressBtn
                  client={this.state.client}
                  currency={currency}
                  total={total}
                  onError={onError}
                  onSuccess={onSuccess}
                  onCancel={onCancel}
                />
              </div>
            </div> 
          </div>
        </div>
      </div>
    )
  }
}

export default connect(
  state => ({
    cartItems: state.cartItems,
  })
)(withRouter(Checkout));
