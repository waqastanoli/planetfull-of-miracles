import React, { Component } from 'react';
import { connect } from 'react-redux';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
 
class Slider extends Component {
	constructor(props) {
	    super(props);
	}
    render() {
    	const {sliderData} = this.props;
        return (
            <Carousel showStatus={false} infiniteLoop={true}   emulateTouch={true} swipeable={true} showThumbs={false} autoPlay={true}>
            {sliderData.map((slide, index) => {
                  return (<div key={index}>
                    <img src={slide.img} />
                    <p className={slide.class}>{slide.label}</p>
                </div>)
                })}
                
                
            </Carousel>
        );
    }
}
export default Slider;/*connect(
  state => ({
    profile: state.profile
  })
)(Slider);*/