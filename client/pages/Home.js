import React, { Component } from 'react';
import { connect } from 'react-redux';
import { css } from '@emotion/core';
import { FadeLoader } from 'react-spinners';

//import Actions from '../actions/productsAction';
import Actions from '../actions/profileActions';
import Product from './home/Product';
import Pagination from '../layout/Pagination';
import SearchInput from '../layout/SearchInput';
import placeholdercover from '../public/jocallio/image/placeholdercover.png';

import profileplaceholder from '../public/jocallio/image/profileplaceholder.png';
import resource_2 from '../public/jocallio/image/resource_2.png';
import resource_1 from '../public/jocallio/image/resource_1.png';
import resource_3 from '../public/jocallio/image/resource_3.png';
import resource_4 from '../public/jocallio/image/resource_4.png';
import top_profile from '../public/jocallio/image/top_profile.png';
import small_profile from '../public/jocallio/image/small_profile.png';
import small_profile_1 from '../public/jocallio/image/small_profile_1.png';
import small_profile_4 from '../public/jocallio/image/small_profile_4.png';
import small_profile_2 from '../public/jocallio/image/small_profile_2.png';
import small_profile_5 from '../public/jocallio/image/small_profile_5.png';
import small_profile_3 from '../public/jocallio/image/small_profile_3.png';
import slider_image_one from '../public/jocallio/image/slider_image_one.png';

import slider_image_two from '../public/jocallio/image/slider_image_two.png';

import small_profileL from '../public/jocallio/image/small_profileL.png';
import ImagesUploader from 'react-images-uploader';
import 'react-images-uploader/styles.css';
import 'react-images-uploader/font.css';

//import Popup from "reactjs-popup";
import Popup from './Popup';
import AlertMessage from '../layout/AlertMessage';
import {Modal, Button, Alert} from 'react-bootstrap';
import API_URL from '../config/API_URL';
import EdiText from 'react-editext'
const override = 'display: block;margin: 0 auto;border-color: red;';

class Home extends Component {

  constructor(props) {
    super(props);

    const {  auth , match} =props;
    var logged_in = false;
    
    if(auth && match.params.userName==auth.user.name)
    logged_in = auth.isAuthenticated;
    this.state = { modaltype:'',alert:false ,show: false, logged_in: logged_in }
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  componentDidMount() {
    this.setState({ search:'' })
    const { dispatch, match } = this.props;
    this.state.dispatch = dispatch;

    dispatch(Actions.getProfileAction(match.params.userName));
  }
  onSave = (type, val) => {
    const { products, auth , match, fetched, profile, dispatch} = this.props;
    dispatch(Actions.updateSection(profile.id, type, val));

  }
  search = (val) => {
    this.setState({ search:val })
    //console.log(this.props)
    const { dispatch } = this.props;
    //dispatch(Actions.getProductsAction(1, this.props.products.perpage, val));
  }
  searchProduct = (e) => {

    const { dispatch, products } = this.props;
    if(e.key === 'Enter') {
      //dispatch(Actions.searchProductAction(products, e.target.value));
    }
  }
  _handleKeyPress =(e)=>{
    const { dispatch, products } = this.props;
    if(e.key === 'Enter') {
      const { dispatch } = this.props;
      //dispatch(Actions.getProductsAction(1, this.props.products.perpage, e.target.value));
    }
  }
  handleClose() {
    this.setState({ show: false });
  }

  handleShow(type) {
    const { auth } = this.props;

     var logged_in = this.state.logged_in;
     if(logged_in){
      
      this.setState({ modaltype:type, show: true });

    }
  }
  render() {
    const { dispatch, products, auth , match, fetched, profile} = this.props;
    const  logged_in = this.state.logged_in;
    if(profile.image==null)
    var profile_img=profileplaceholder;
    else
    var profile_img = API_URL.API_URL+'/public/'+profile.id+'/profile/'+profile.image;
    if(profile.cover==null)
    var cover_img = placeholdercover
    else 
    var cover_img = API_URL.API_URL+'/public/'+profile.id+'/cover/'+profile.cover;

    return (

      <main className={"main "+((logged_in)?'logged_in':'')}>
        
        <div className="topbanner">
            <div className="imagearea">
                <img src={cover_img} alt="image" />
                <div className="profileS">
                    <div className="imageHolder"  onClick={(e) => this.handleShow('profile', e)}>
                        <img src={profile_img} alt="image"/>
                        <div className="profile-text-block"> 
    <p>Update</p>
  </div>
                        <div className="iconholder"><span className="sprite"></span></div>
                    </div>

                    <div className="name">{profile.name}</div>
                    {logged_in && 
                    <div className="editcover">
                        <a   onClick={(e) => this.handleShow('cover', e)} title="Edit Cover"> <span className="sprite icon"></span> Edit Cover</a>
                    </div>
                    }
                </div>
            </div>
            <div className="content">
                <ul className="clearfix">
                    <li className="Inspire">
                        <div className="left fleft"><span className="sprite icon"></span></div>
                        <div className="right fleft">
                            <div className="num fleft">89</div>
                            <div className="text fleft">Inspire
                                <div>Topics</div>
                            </div>
                        </div>
                    </li>
                    <li className="Aspire">
                        <div className="left fleft"><span className="sprite icon"></span></div>
                        <div className="right fleft">
                            <div className="num fleft">20</div>
                            <div className="text fleft">Aspire
                                <div>Topics</div>
                            </div>
                        </div>
                    </li>
                    <li className="Current">
                        <div className="left fleft"><span className="sprite icon"></span></div>
                        <div className="right fleft">
                            <div className="num fleft">16</div>
                            <div className="text fleft">Current
                                <div>Contracts</div>
                            </div>
                        </div>
                    </li>
                    <li className="Completed">
                        <div className="left fleft"><span className="sprite icon"></span></div>
                        <div className="right fleft">
                            <div className="num fleft">289</div>
                            <div className="text fleft">Completed
                                <div>Contracts</div>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        
                

        <Modal show={this.state.show} onHide={this.handleClose} className="profile_image_popup">
          <span className="close" onClick={this.handleClose}>close </span>
          <Modal.Header>
            <Modal.Title>Upload a Photo</Modal.Title>
          </Modal.Header>
          <Modal.Body><ImagesUploader
                url={API_URL.API_URL+"/api/v1/users/pic/"+auth.user.id+'/'+this.state.modaltype}
                optimisticPreviews
                onLoadEnd={(err, img_res) => {
                    if (err) {
                        console.error(err);
                    }
                    if(img_res.length){
                      if(this.state.modaltype=='profile')
                      this.setState({ alert: {type:'success',heading:'',message:'Profile Image updated successfully'} });
                      else
                        this.setState({ alert: {type:'success',heading:'',message:'Cover Image updated successfully'} });
                      setTimeout(function(){
                        this.setState({alert:false});
                    }.bind(this),5000);
                      this.handleClose()
                      var splited_res = img_res[0].split("/");
                      //console.log(splited_res)
                      if(this.state.modaltype=='profile')
                        profile.image = splited_res[splited_res.length-1]
                      else
                        profile.cover = splited_res[splited_res.length-1]
                    }
                }}
                label=""
                multiple={false}
                /></Modal.Body>
          
        </Modal>
        { this.state.alert && <AlertMessage type={this.state.alert.type} heading={this.state.alert.heading} message={this.state.alert.message} />}
        <div className="clearfix holder">
            <div className="shadowbox SliderHolder">
                <div className="topslider">
                  <ul id="oneslider">
                    <li><a href="#" title=""><img src={slider_image_one} alt="slider_image_one"/></a></li>
                    <li><a href="#" title=""><img src={slider_image_two} alt="slider_image_one"/></a></li>
                    <li><a href="#" title=""><img src={slider_image_one} alt="slider_image_one"/></a></li>
                    <li><a href="#" title=""><img src={slider_image_two} alt="slider_image_one"/></a></li>
                    <li><a href="#" title=""><img src={slider_image_one} alt="slider_image_one"/></a></li>
                    <li><a href="#" title=""><img src={slider_image_two} alt="slider_image_one"/></a></li>

                  </ul>
                </div>
                <div className="Bottomslider">
                  <h3>Photos (126)</h3>
                  <ul id="thumbSlider">
                    <li>
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
                    </li>
                     <li>
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
                    </li>
                     <li>
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
                    </li>
                  </ul>
                </div>



            </div>
            <div className="shadowbox CurrentLife">
              <h2>My Current Life </h2>
              <div className="scroll holder">
              {!logged_in &&
                profile.current_situation
              }
              {profile.name && logged_in && <EdiText
  type='textarea'
  inputProps={{
    className: 'textarea',
    placeholder: 'Add your current situation here',
    style: {
      outline: 'none',
      minWidth: 'auto'
    },
    rows: 10
  }}

  value={profile.current_situation}
   onSave={(e) => this.onSave('current', e)}
/>}
                     </div>


            </div>
            <div className="shadowbox FutureVision"><h2>My Future Vision</h2>

              <div className="scroll holder">
              {!logged_in &&
                profile.future_vision
              }
                {profile.name && logged_in && <EdiText
  type='textarea'
  inputProps={{
    className: 'textarea',
    placeholder: 'Add your Future Vision here',
    style: {
      outline: 'none',
      minWidth: 'auto'
    },
    rows: 10
  }}

  value={profile.future_vision}
   onSave={(e) => this.onSave('future', e)}
/>}
              </div>
            </div>
        </div>



        <div className="clearfix">
        
        <section className="shadowbox Toptopic">
          <h2>My Top Topics </h2>
            <div className="toggle tabs tabs_default TabFirst" >
                  <ul className='tabs'>
                    <li className="tab"><a href="#tab-1">Inspire</a></li>
                    <li className="tab"><a href="#tab-2">Aspire</a></li>
                 </ul>
                 <div id='tab-1'>
                  <ul className="ToptopicList">
                    <li className="clearfix">
                      <div className="left"><a href="#" title="Tousled Food">Tousled Food</a></div>
                      <div className="right"><span className="numhold">14</span> people aspiring for this topic <a href="#" className="view" title="view">view</a></div>
                    </li>
                    <li className="clearfix">
                      <div className="left"><a href="#" title="Truck Polaroid">Truck Polaroid</a></div>
                      <div className="right"><span className="numhold">8</span> people aspiring for this topic <a href="#" className="view" title="view">view</a></div>
                    </li>
                    <li className="clearfix">
                      <div className="left"><a href="#" title="Tousled Food">Tousled Food</a></div>
                      <div className="right"><span className="numhold">11</span> people aspiring for this topic <a href="#" className="view" title="view">view</a></div>
                    </li>
                    <li className="clearfix">
                      <div className="left"><a href="#" title="Tousled Food">Tousled Food</a></div>
                      <div className="right"><span className="numhold">29</span> people aspiring for this topic <a href="#" className="view" title="view">view</a></div>
                    </li>
                    <li className="clearfix">
                      <div className="left"><a href="#" title="Tousled Food">Tousled Food</a></div>
                      <div className="right"><span className="numhold">56</span> people aspiring for this topic <a href="#" className="view" title="view">view</a></div>
                    </li>
                    <li className="clearfix">
                      <div className="left"><a href="#" title="Tousled Food">Tousled Food</a></div>
                      <div className="right"><span className="numhold">9</span> people aspiring for this topic <a href="#" className="view" title="view">view</a></div>
                    </li>
                  </ul>  
                </div>
                <div id='tab-2'><ul className="ToptopicList">
                    <li className="clearfix">
                      <div className="left"><a href="#" title="Tousled Food">Tousled Food</a></div>
                      <div className="right"><span className="numhold">11</span> people aspiring for this topic <a href="#" className="view" title="view">view</a></div>
                    </li>
                    <li className="clearfix">
                      <div className="left"><a href="#" title="Truck Polaroid">Truck Polaroid</a></div>
                      <div className="right"><span className="numhold">13</span> people aspiring for this topic <a href="#" className="view" title="view">view</a></div>
                    </li>
                    <li className="clearfix">
                      <div className="left"><a href="#" title="Tousled Food">Tousled Food</a></div>
                      <div className="right"><span className="numhold">15</span> people aspiring for this topic <a href="#" className="view" title="view">view</a></div>
                    </li>
                    <li className="clearfix">
                      <div className="left"><a href="#" title="Tousled Food">Tousled Food</a></div>
                      <div className="right"><span className="numhold">56</span> people aspiring for this topic <a href="#" className="view" title="view">view</a></div>
                    </li>
                    <li className="clearfix">
                      <div className="left"><a href="#" title="Tousled Food">Tousled Food</a></div>
                      <div className="right"><span className="numhold">57</span> people aspiring for this topic <a href="#" className="view" title="view">view</a></div>
                    </li>
                    <li className="clearfix">
                      <div className="left"><a href="#" title="Tousled Food">Tousled Food</a></div>
                      <div className="right"><span className="numhold">9</span> people aspiring for this topic <a href="#" className="view" title="view">view</a></div>
                    </li>
                  </ul></div>
              </div></section>
        <section className="shadowbox Proud">
          <h2>P.R.O.U.D Chart</h2>
            <div className="sideBtn">
              <div className="addButton"><a href="#" title="ADD"><span data-icon="plus"></span>ADD</a></div>
              <div className="addButton"><a href="#" title="EDIT">EDIT</a></div>
            </div>


          <ul className="scroll">
            <li>
              <div className="date"><span className="sprite icon"></span>10 August, 20:00</div>
              <h3><a href="#" title="Consequuntur Magni ">Consequuntur Magni </a></h3>
              <p>Sed ut perspiciatis unde omnis iste natus error sit volupt ut perspiciatis unde omnis iste natus error sit voluptatem</p>
            </li>
            <li>
              <div className="date"><span className="sprite icon"></span>10 August, 20:00</div>
              <h3><a href="#" title="Consequuntur Magni ">Consequuntur Magni </a></h3>
              <p>Sed ut perspiciatis unde omnis iste natus error sit volupt ut perspiciatis unde omnis iste natus error sit voluptatem</p>
            </li>
            <li>
              <div className="date"><span className="sprite icon"></span>10 August, 20:00</div>
              <h3><a href="#" title="Consequuntur Magni ">Consequuntur Magni </a></h3>
              <p>Sed ut perspiciatis unde omnis iste natus error sit volupt ut perspiciatis unde omnis iste natus error sit voluptatem</p>
            </li>
            <li>
              <div className="date"><span className="sprite icon"></span>10 August, 20:00</div>
              <h3><a href="#" title="Consequuntur Magni ">Consequuntur Magni </a></h3>
              <p>Sed ut perspiciatis unde omnis iste natus error sit volupt ut perspiciatis unde omnis iste natus error sit voluptatem</p>
            </li>
            <li>
              <div className="date"><span className="sprite icon"></span>10 August, 20:00</div>
              <h3><a href="#" title="Consequuntur Magni ">Consequuntur Magni </a></h3>
              <p>Sed ut perspiciatis unde omnis iste natus error sit volupt ut perspiciatis unde omnis iste natus error sit voluptatem</p>
            </li>
            <li>
              <div className="date"><span className="sprite icon"></span>10 August, 20:00</div>
              <h3><a href="#" title="Consequuntur Magni ">Consequuntur Magni </a></h3>
              <p>Sed ut perspiciatis unde omnis iste natus error sit volupt ut perspiciatis unde omnis iste natus error sit voluptatem</p>
            </li>
          </ul>


        </section>      
        </div>
        

        
        <section className="Contracts shadowbox">
          <h2>My Contracts</h2>
          <div className="selectHolder">
             Sort by : 
            <div className="styled-select">
             <select>
               <option selected="">Current</option>
               <option>Current y</option>
               <option>Current n</option>
             </select>
            <span className="fa fa-sort-desc"></span>
          </div>
          </div>

            <div className="toggle tabs tabs_default TabSecond" >
                  <ul className="tabs">
                    <li className="tab active"><a href="#tab-3">Serving Me</a> </li>
                    <li className="tab"><a href="#tab-4">Serving Others</a></li>
                    
                  </ul>
                 
                    <div id='tab-3'>
                        <table>
                          <thead>
                            <tr>
                              <th>topic name</th>
                              <th>Date from - To</th>
                              <th>description</th>
                              <th>servied By</th>

                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td> Ut enim ad minima veniam</td>
                              <td>17 August,  - 19 August</td>
                              <td>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque </td>
                              <td>
                                  <div className="profile"><img src={small_profile} alt="image" /></div>
                                 Paulo Dybala
                                  <a href="#" className="view" title="view">view</a>

                              </td>
                            </tr>
                           <tr>
                              <td>Excepteur sint occaecat </td>
                              <td>10 August,  - 15 August</td>
                              <td>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque </td>
                              <td>
                                  <div className="profile"><img src={small_profile} alt="image"/></div>
                                 Luka Modric
                                  <a href="#" className="view" title="view">view</a>

                              </td>
                            </tr><tr>
                              <td>Excepteur sint occaecat </td>
                              <td>10 August,  - 15 August</td>
                              <td>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque </td>
                              <td>
                                  <div className="profile"><img src={small_profile_5} alt="image"/></div>
                                 Luka Modric
                                  <a href="#" className="view" title="view">view</a>

                              </td>
                            </tr><tr>
                              <td>Excepteur sint occaecat </td>
                              <td>10 August,  - 15 August</td>
                              <td>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque </td>
                              <td>
                                  <div className="profile"><img src={small_profile_2} alt="image"/></div>
                                 Luka Modric
                                  <a href="#" className="view" title="view">view</a>

                              </td>
                            </tr><tr>
                              <td>Excepteur sint occaecat </td>
                              <td>10 August,  - 15 August</td>
                              <td>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque </td>
                              <td>
                                  <div className="profile"><img src={small_profile} alt="image"/></div>
                                 Luka Modric
                                  <a href="#" className="view" title="view">view</a>

                              </td>
                            </tr>
                          </tbody>
                        </table>

                        <div className="viewAll"><a href="viewAlllink">view all</a></div></div>
                    <div id='tab-4'>
                        <table>
                          <thead>
                            <tr>
                              <th>topic name</th>
                              <th>Date from - To</th>
                              <th>description</th>
                              <th>servied By</th>

                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>Excepteur sint occaecat </td>
                              <td>10 August,  - 15 August</td>
                              <td>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque </td>
                              <td>
                                  <div className="profile"><img src={small_profile} alt="image"/></div>
                                 Luka Modric
                                  <a href="#" className="view" title="view">view</a>

                              </td>
                            </tr>
                           <tr>
                              <td>Excepteur sint occaecat </td>
                              <td>10 August,  - 15 August</td>
                              <td>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque </td>
                              <td>
                                  <div className="profile"><img src={small_profile} alt="image"/></div>
                                 Luka Modric
                                  <a href="#" className="view" title="view">view</a>

                              </td>
                            </tr><tr>
                              <td>Excepteur sint occaecat </td>
                              <td>10 August,  - 15 August</td>
                              <td>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque </td>
                              <td>
                                  <div className="profile"><img src={small_profile} alt="image"/></div>
                                 Luka Modric
                                  <a href="#" className="view" title="view">view</a>

                              </td>
                            </tr><tr>
                              <td>Excepteur sint occaecat </td>
                              <td>10 August,  - 15 August</td>
                              <td>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque </td>
                              <td>
                                  <div className="profile"><img src={small_profile} alt="image"/></div>
                                 Luka Modric
                                  <a href="#" className="view" title="view">view</a>

                              </td>
                            </tr><tr>
                              <td>Excepteur sint occaecat </td>
                              <td>10 August,  - 15 August</td>
                              <td>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque </td>
                              <td>
                                  <div className="profile"><img src={small_profile} alt="image"/></div>
                                 Luka Modric
                                  <a href="#" className="view" title="view">view</a>

                              </td>
                            </tr>
                          </tbody>
                        </table>

                        <div className="viewAll"><a href="viewAlllink">view all</a></div></div>
                    
                 
                </div>
        </section>
        
        <section className="resources">
          <h2>Resources</h2>
          <ul>
            <li>
              <div className="imagearea"><img src={resource_1}  alt="image"/></div>
              <div className="overlay">
                  <div className="iconholder">
                    <span className="PEPicon sprite"></span>
                  </div>
                  PEP
              </div>
            </li>
            <li>  
              <div className="imagearea"><img src={resource_2} alt="image"/></div>
              <div className="overlay">
                  <div className="iconholder">
                    <span className="Advisorsicon sprite"></span>
                  </div>
                  Advisors
              </div>
            </li>
            <li>
              <div className="imagearea"><img src={resource_3} alt="image" /></div>
              <div className="overlay">
                  <div className="iconholder Humanity">
                    <span className="Humanityicon sprite"></span>
                  </div>
                  Issues of Humanity
              </div>
            </li>
            <li>
              <div className="imagearea"><img src={resource_4} alt="image" /></div>
              <div className="overlay ">
                  <div className="iconholder Rewards">
                    <span className="Rewardsicon sprite"></span>
                  </div>
                  Rewards
              </div>
            </li>
          </ul>
        </section>
    </main>
    )
  }
}

export default connect(
  state => ({
    profile: state.profile,
    auth:state.auth
  })
)(Home);
