import React, { Component } from 'react';

export default class Productgallery extends Component {
  componentDidMount() {
    $('.quant-spi').number();
    $('#pro-desc-gallery').lightSlider({
      gallery:  true,
      item: 1,
      thumbItem: 9,
      slideMargin: 0,
      speed: 500,
      auto: true,
      loop: true,
      onSliderLoad: function() {
        $('#pro-desc-gallery').removeClass('cS-hidden');
      }
    });
  }
  render() {
    const { productImages } = this.props;
    return (
      <div className='col-sm-6 pad-lf-reset'>
        <ul id="pro-desc-gallery" className="gallery list-unstyled cS-hidden">
          {
            productImages && productImages.length > 0 &&
            productImages.map((image, index) => {
              return (
                <li key={index} data-thumb={image}>
                  <img src={image} />
                </li>
              )
            })
          }
        </ul>
      </div>
    )
  }
}