import React, { Component } from 'react';

export default class RelatedProducts extends Component {
  componentDidMount() {
    $('.related-product-carousel').owlCarousel({
      loop:true,
      margin:50,
      nav:true,
      dots: false,
      responsive:{
        0: {
          items: 1
        },
        600: {
          items: 3
        },
        1000: {
          items: 4
        }
      }
		});
  }
  render() {

    const { relatedProducts } = this.props;
    return (
      <div className="row">
        <div className="col-sm-12">
          <h1 className="title-related-pro-det">Related Products</h1>
          <div className="related-product-carousel owl-theme">
            {
              relatedProducts && relatedProducts.length > 0 &&
              relatedProducts.map((product, index) => {
                return (
                  <div className="item" key={index}>
                    <img src={product.img} />
                    <h4 className="related-pro-title-car">{product.name}</h4>
                    <h6 className="related-pro-ref-car">{product.proRef}</h6>
                  </div> 
                )
              })
            }
          </div>
        </div>
      </div>
    )
  }
}