import React, { Component } from 'react';
import { connect } from 'react-redux';
import { css } from '@emotion/core';
import { FadeLoader } from 'react-spinners';

import Actions from '../actions/productsAction';
import Product from './home/Product';
import Pagination from '../layout/Pagination';
import SearchInput from '../layout/SearchInput';

const override = 'display: block;margin: 0 auto;border-color: red;';

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
    }
  }

  componentDidMount() {
    this.setState({ search:'' })
    const { dispatch } = this.props;
    this.state.dispatch = dispatch;
    dispatch(Actions.getProductsAction(this.props.products.page, this.props.products.perpage));
  }
  gotoPage = (childstate) => {
    
    this.state.dispatch(Actions.getProductsAction(childstate.currentPage, childstate.pageLimit, this.state.search));
  }
  search = (val) => {
    this.setState({ search:val })
    //console.log(this.props)
    const { dispatch } = this.props;
    dispatch(Actions.getProductsAction(1, this.props.products.perpage, val));
  }
  searchProduct = (e) => {

    const { dispatch, products } = this.props;
    if(e.key === 'Enter') {
      dispatch(Actions.searchProductAction(products, e.target.value));
    }
  }
  _handleKeyPress =(e)=>{
    const { dispatch, products } = this.props;
    if(e.key === 'Enter') {
      const { dispatch } = this.props;
      dispatch(Actions.getProductsAction(1, this.props.products.perpage, e.target.value));
    }
  }
  render() {
    const { products } = this.props;
    
    this.state.page = this.props.products.page
    
    return (
      <div className="main-container m-top-60"> 
        <main className="site-main"> 
          <div className="container">
            <div className='row'>
              <div className='col-sm-12'>
                  <SearchInput getVal={this.getVal} ref={(ref) => this.ref} search={this.search} dispatch={this.props.dispatch} onKeyUp={(e) => this.searchProduct(e)} placeholder={'Search For a product... '} _handleKeyPress={this._handleKeyPress}/>
                  
              </div>
            </div>
          </div>
          <div className="container">
            <div className="row" style={{height:"1668px"}}>
              <FadeLoader
                css={override}
                sizeUnit={"px"}
                size={150}
                color={'#123abc'}
                loading={products.fetching}
              />
              {
                !products.fetching &&
                products.fetched &&
                products.list.map((product, index) => {
                  return (
                    <Product
                      key={index}
                      product={product}
                    />
                  )
                })
              }
            </div><div className="row d-flex flex-row py-5"><div className="w-100 px-4 py-5 d-flex flex-row flex-wrap align-items-center justify-content-between">
            {
                products.fetched &&
                  <Pagination totalRecords={products.totalProducts} pageLimit={products.perpage}/* pageNeighbours={1}*/ onPageChanged={this.gotoPage} label='Products' />
                
                
              }</div></div>
          </div>
        </main>
      </div>
    )
  }
}

export default connect(
  state => ({
    products: state.products
  })
)(Home);
