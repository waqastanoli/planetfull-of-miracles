import React, { Component } from 'react';
import { connect } from 'react-redux';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import small_profile from '../public/jocallio/image/FakeProfileImages/people-emotion-and-facial-expression-concept-face-of-happy-smiling-young-man_hkvtvlv3_thumbnail-full05.png';
import small_profile_1 from '../public/jocallio/image/FakeProfileImages/041614-b-real-relationships.png';
import small_profile_4 from '../public/jocallio/image/FakeProfileImages/maxresdefault.jpg';
import small_profile_2 from '../public/jocallio/image/small_profile_2.png';
import small_profile_5 from '../public/jocallio/image/small_profile_5.png';
import small_profile_3 from '../public/jocallio/image/small_profile_3.png'; 
class ContentSlider extends Component {
	constructor(props) {
	    super(props);
	}
    render() {
    	const {sliderData} = this.props;
        return (
            <Carousel
  showThumbs={false}
  showStatus={false}
  infiniteLoop={true}
   emulateTouch={true}
  useKeyboardArrows
  className="presentation-mode" autoPlay={true} showIndicators={true} showArrows={false}
>
<div className="my-slide primary">
<div className="smallP">
                                            <div className="holder"><a href="#" title="image"><img src={small_profile} alt="image"/></a></div>
                                        </div>  
                                        <div className="smallP">
                                            <div className="holder"><a href="#" title="image"><img src={small_profile_4} alt="image"/></a></div>
                                        </div>
                                        <div className="smallP">
                                            <div className="holder"><a href="#" title="image"><img src={small_profile_5} alt="image"/></a></div>
                                        </div>
                                        <div className="smallP">
                                            <div className="holder"><a href="#" title="image"><img src={small_profile_1} alt="image"/></a></div>
                                        </div>
                                        <div className="smallP">
                                            <div className="holder"><a href="#" title="image"><img src={small_profile_2} alt="image"/></a></div>
                                        </div>
                                        <div className="smallP">
                                            <div className="holder"><a href="#" title="image"><img src={small_profile_1} alt="image"/></a></div>
                                        </div>
                                        <div className="smallP">
                                            <div className="holder"><a href="#" title="image"><img src={small_profile_3} alt="image"/></a></div>
                                        </div>
                                        <div className="smallP">
                                            <div className="holder"><a href="#" title="image"><img src={small_profile_4} alt="image"/></a></div>
                                        </div>
                                        <div className="smallP">
                                            <div className="holder"><a href="#" title="image"><img src={small_profile_5} alt="image"/></a></div>
                                        </div>
</div>
<div className="my-slide secondary">
<div className="smallP">
                                            <div className="holder"><a href="#" title="image"><img src={small_profile_5} alt="image"/></a></div>
                                        </div>  
                                        <div className="smallP">
                                            <div className="holder"><a href="#" title="image"><img src={small_profile_1} alt="image"/></a></div>
                                        </div>
                                        <div className="smallP">
                                            <div className="holder"><a href="#" title="image"><img src={small_profile_2} alt="image"/></a></div>
                                        </div>
                                        <div className="smallP">
                                            <div className="holder"><a href="#" title="image"><img src={small_profile_3} alt="image"/></a></div>
                                        </div>
                                        <div className="smallP">
                                            <div className="holder"><a href="#" title="image"><img src={small_profile_4} alt="image"/></a></div>
                                        </div>
                                        <div className="smallP">
                                            <div className="holder"><a href="#" title="image"><img src={small_profile_5} alt="image"/></a></div>
                                        </div>
                                        <div className="smallP">
                                            <div className="holder"><a href="#" title="image"><img src={small_profile_1} alt="image"/></a></div>
                                        </div>
                                        <div className="smallP">
                                            <div className="holder"><a href="#" title="image"><img src={small_profile_2} alt="image"/></a></div>
                                        </div>
                                        <div className="smallP">
                                            <div className="holder"><a href="#" title="image"><img src={small_profile_3} alt="image"/></a></div>
                                        </div>
</div>
<div className="my-slide content">
<div className="smallP">
                                            <div className="holder"><a href="#" title="image"><img src={small_profile} alt="image"/></a></div>
                                        </div>  
                                        <div className="smallP">
                                            <div className="holder"><a href="#" title="image"><img src={small_profile_4} alt="image"/></a></div>
                                        </div>
                                        <div className="smallP">
                                            <div className="holder"><a href="#" title="image"><img src={small_profile_5} alt="image"/></a></div>
                                        </div>
                                        <div className="smallP">
                                            <div className="holder"><a href="#" title="image"><img src={small_profile_1} alt="image"/></a></div>
                                        </div>
                                        <div className="smallP">
                                            <div className="holder"><a href="#" title="image"><img src={small_profile_2} alt="image"/></a></div>
                                        </div>
                                        <div className="smallP">
                                            <div className="holder"><a href="#" title="image"><img src={small_profile_1} alt="image"/></a></div>
                                        </div>
                                        <div className="smallP">
                                            <div className="holder"><a href="#" title="image"><img src={small_profile_3} alt="image"/></a></div>
                                        </div>
                                        <div className="smallP">
                                            <div className="holder"><a href="#" title="image"><img src={small_profile_4} alt="image"/></a></div>
                                        </div>
                                        <div className="smallP">
                                            <div className="holder"><a href="#" title="image"><img src={small_profile_5} alt="image"/></a></div>
                                        </div>
</div>

</Carousel>
        );
    }
}
export default connect(
  state => ({
    profile: state.profile
  })
)(ContentSlider);