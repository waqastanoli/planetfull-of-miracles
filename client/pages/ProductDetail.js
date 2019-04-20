import React, { Component } from 'react';
import RelatedProducts from './productDetail/RelatedProducts';
import DescriptionTabs from './productDetail/DescriptionTabs';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ProductGallery from './productDetail/ProductGallery';
import Detail from './productDetail/Detail';
import Actions from '../actions/productsAction';
class ProductDetail extends Component {
  componentWillMount(){
    const { product, dispatch, match, productDetail } = this.props;
    if(!this.props.location.state){
      dispatch(Actions.getProductsDetail(match.params.productID));
    }

  }
  render() {
    const {productDetail}=this.props;
    //console.log(this.props);
    if(this.props.location.state){
      var { state } = this.props.location;
      var { product } = state;
      productDetail.fetched=true;
    } else {   
      var { product } = productDetail;
    }
    //console.log(this.props);
    return (<div>{productDetail.fetched && 
      <div className="sub-pg-main-container container">

        <div className="row">
          <ProductGallery productImages={product.images} />
          <Detail product={product} />
        </div>
        <DescriptionTabs product={product} />
        {/*<RelatedProducts relatedProducts={product.relatedProducts} />*/}
      
      </div>}
      </div>
    )
  }
}
export default connect(
  state => ({
    productDetail:state.productDetail
  })
)(ProductDetail);