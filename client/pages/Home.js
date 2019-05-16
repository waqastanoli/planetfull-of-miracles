import React, { Component } from 'react';
import { connect } from 'react-redux';
import { css } from '@emotion/core';
import { FadeLoader } from 'react-spinners';
import { DateRangePicker, SingleDatePicker, DayPickerRangeController } from 'react-dates';
import Rating from 'react-rating';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
//import Actions from '../actions/productsAction';
import Actions from '../actions/profileActions';
import Product from './home/Product';
import Pagination from '../layout/Pagination';
import SearchInput from '../layout/SearchInput';
import placeholdercover from '../public/jocallio/image/placeholdercover.jpg';

import profileplaceholder from '../public/jocallio/image/small_profileL.png';
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
import slider_image_one from '../public/jocallio/image/FakeProfileImages/Brooks-Blog-14-1024x683.jpg';

import slider_image_two from '../public/jocallio/image/FakeProfileImages/170717100550_1_900x600.jpg';
import slider_image_three from '../public/jocallio/image/FakeProfileImages/The-Happiness-Doctor-is-In-452575741.jpg';
import slider_image_four from '../public/jocallio/image/FakeProfileImages/living-independantly-feat.jpg';
import slider_image_five from '../public/jocallio/image/FakeProfileImages/20180627194538-GettyImages-828514788.jpeg';
import slider_image_six from '../public/jocallio/image/FakeProfileImages/baby.6.jpg';
import small_profileL from '../public/jocallio/image/small_profileL.png';
import ImagesUploader from 'react-images-uploader';
import 'react-images-uploader/styles.css';
import 'react-images-uploader/font.css';

//import Popup from "reactjs-popup";
import Popup from './Popup';
import Slider from './Slider';
import ContentSlider from './ContentSlider';
import AlertMessage from '../layout/AlertMessage';
import {Modal, Button, Alert} from 'react-bootstrap';
import API_URL from '../config/API_URL';
import EdiText from 'react-editext';
import Moment from 'react-moment';
import Select from 'react-select';
const override = 'display: block;margin: 0 auto;border-color: red;';

class Home extends Component {

  constructor(props) {
    super(props);

    const {  auth , match, dispatch} =props;
    var logged_in = false;
    dispatch(Actions.resetProfileAction());
    if(auth && match.params.userName==auth.user.name)
    logged_in = auth.isAuthenticated;
    this.state = {
      selectedOption:"Open",
      proud: {
        title: '',
        note:'',
      },
      topic: {
        text: '',
        type:'inspire'
      },
      contract: {
        type:'me',
        startDate:null,
        endDate:null,
        status:null,
        who:null,
        rate:null
      },
      actions:{
        proud:'Add',
        id:null,
      },
      startDate:null,
      endDate:null,
      proudshow: false, 
      topicshow: false,
      contractshow: false,
      modaltype:'',
      alert:false ,
      show: false, 
      logged_in: logged_in,
      errors:{
        title:'',
        note: '',
      }
    }
    this.handleShow = this.handleShow.bind(this);
    this.proudhandleShow = this.proudhandleShow.bind(this);
    this.topichandleShow = this.topichandleShow.bind(this);
    this.updatetopichandle = this.updatetopichandle.bind(this);
    this.topichandleClose = this.topichandleClose.bind(this);
    this.handleOptionChange = this.handleOptionChange.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.proudhandleClose = this.proudhandleClose.bind(this);
    this.proudhandleSave = this.proudhandleSave.bind(this);
    this.topichandleSave = this.topichandleSave.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.topicPagehandle = this.topicPagehandle.bind(this);
    this.contracthandleShow = this.contracthandleShow.bind(this);
    this.contractClose = this.contractClose.bind(this);
    this.updatecontracthandle = this.updatecontracthandle.bind(this);
    this.contracthandleSave = this.contracthandleSave.bind(this);
    this.updateRating = this.updateRating.bind(this);
    
    this.title = React.createRef();
    this.note = React.createRef();
    this.text = React.createRef();

  }

  componentDidMount() {
    $( window ).on("load", function() {
    if (typeof loadsliderscripts === 'function')
      loadsliderscripts()

  });
    if (typeof loadsliderscripts === 'function')
    loadsliderscripts()
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
  handleOptionChange (changeEvent) {
  this.setState({
    selectedOption: changeEvent.target.value
  });
}
  contracthandleShow(type, editproud){
    this.setState({ contractshow: true });
  }
  contractClose() {
    this.setState({ contractshow: false });
  }
  proudhandleShow(type, editproud){
    const { proud, actions } = this.state;
    if(type=='edit'){  
      this.setState({
          actions:{proud:'Edit',id:editproud._id},
          proud: editproud
      });
    } else {
      this.setState({
          actions:{proud:'Add',id:null},
          proud: {
          title: '',
          note:''
        }
      });
    }
    this.setState({ proudshow: true });
  }
  updatetopichandle(type){

    const { topic } = this.state;
    topic.type = type;
    this.setState({ topic: topic });
  }
  updatecontracthandle(type){
    console.log(type);
    const { contract } = this.state;
    contract.type = type;
    this.setState({ contract: contract });
  }
  topicPagehandle(topic){
    //console.log(topic);
    this.props.history.push('/topic/'+topic._id)
    /*const { topic } = this.state;
    topic.type = type;
    this.setState({ topic: topic });*/
  }
  topichandleShow(type, edittopic){

    const { proud, actions, topic } = this.state;

    if(type=='edit'){
      actions.topic= 'Edit';
      actions.id= edittopic._id; 
      this.setState({
          actions:actions,
          topic: edittopic
      });
    } else {
      actions.topic= 'Add';
      actions.id= null;
      this.setState({
          actions:actions,
          topic: {
          text: '',
          type:topic.type
        }
      });
    }

    this.setState({ topicshow: true });
  }
  topichandleClose(){
    this.setState({ topicshow: false });
  }
  proudhandleClose(){
    this.setState({ proudshow: false });
  }
  proudhandleSave(){
    const { dispatch, match, profile } = this.props;
    const {actions} = this.state;
    this.validateInput(this.title.current.name, this.title.current.value, 'blur');
    this.validateInput(this.note.current.name, this.note.current.value, 'blur');
    const { errors } = this.state;
     if (errors.note=='' && errors.title=='') {
      dispatch(Actions.updateproud(profile.id,this.note.current.value,this.title.current.value,actions.id));
      this.proudhandleClose();
     }
  }
  topichandleSave(){
    const { dispatch, match, profile } = this.props;
    const {actions, topic} = this.state;
    this.validateInput(this.text.current.name, this.text.current.value, 'blur');
    const { errors } = this.state;
     if (errors.text=='') {
      dispatch(Actions.updatetopic(profile.id,this.text.current.value,topic.type, actions.id));
      this.topichandleClose();
     }
  }
  validate_contract(data){

  }
  contracthandleSave(){
    const { dispatch, match, contract } = this.props;
    const {actions, topic, startDate, endDate, selectedOption} = this.state;
    console.log(startDate);
    //console.log(startDate.format("YYYY-MM-DD"));
    console.log(contract.rate)
    /*contract: {
        type:'me',
        contractType:,
        startDate:startDate,
        endDate:endDate,
        status:selectedOption,
        who:null,
        rate:null
      }*/
    /*this.validateInput(this.text.current.name, this.text.current.value, 'blur');
    const { errors } = this.state;
     if (errors.text=='') {
      dispatch(Actions.updatetopic(profile.id,this.text.current.value,topic.type, actions.id));
      this.topichandleClose();
     }*/
  }
  handleChange(event) {
      const { name, value } = event.target;
      this.validateInput(name, value, event.type);
      const { proud, topic } = this.state;
      this.setState({
          proud: {
              ...proud,
              [name]: value
          },
          topic: {
              ...topic,
              [name]: value
          }
      });
  }
  validateInput(name, value, type){
    var error='';
    switch(name){
      case 'title':
        error=(value=='')?"Title is required":'';
      break;
      case 'note':
        error=(value=='')?"Note is required":'';
      break;
      case 'text':
        error=(value=='')?"text is required":'';
      break;
    }
    
    const { errors } = this.state;
    errors[name] = error
    this.setState({errors,errors});
  }
  handleShow(type) {
    const { auth } = this.props;

     var logged_in = this.state.logged_in;
     if(logged_in){
      
      this.setState({ modaltype:type, show: true });

    }
  }
  updateRating(rate) {
    this.setState(prevState => ({
      contract: {
          ...prevState.contract,
          rate: rate
      }
   }))
  }
  render() {
    const sliderimages = [
      {
        img:slider_image_one,
        class:"legend",
        label:"Family"
      },
      {
        img:slider_image_two,
        class:"legend",
        label:"Friends"
      },
      {
        img:slider_image_three,
        class:"legend",
        label:"Friends"
      },
      {
        img:slider_image_four,
        class:"legend",
        label:"Fun"
      },
      {
        img:slider_image_five,
        class:"legend",
        label:"Family"
      },
      {
        img:slider_image_six,
        class:"legend",
        label:"Cute"
      },
    ]
    const { dispatch, products, auth , match, fetched, profile} = this.props;
    const  {logged_in ,errors, proud, topic, actions, contract } = this.state;
    if(profile.image==null)
    var profile_img=profileplaceholder;
    else
    var profile_img = API_URL.API_URL+'/public/'+profile.id+'/profile/'+profile.image;
    if(profile.cover==null)
    var cover_img = placeholdercover
    else 
    var cover_img = API_URL.API_URL+'/public/'+profile.id+'/cover/'+profile.cover;

    return (
      <div>
      {profile.fetching && 
            <FadeLoader
                css={override}
                sizeUnit={"px"}
                size={150}
                color={'#123abc'}
                loading={true}
              />
              }
      {profile.fetched && 
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
                            <div className="num fleft">{profile.inspire.length}</div>
                            <div className="text fleft">Inspire
                                <div>Topics</div>
                            </div>
                        </div>
                    </li>
                    <li className="Aspire">
                        <div className="left fleft"><span className="sprite icon"></span></div>
                        <div className="right fleft">
                            <div className="num fleft">{profile.aspire.length}</div>
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
                      if(this.state.modaltype=='profile'){
                        profile.image = splited_res[splited_res.length-1]
                      }
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
            <Slider sliderData={sliderimages}/>
                {/*<div className="topslider">
                                  <ul id="oneslider">
                                    <li><a href="#" title=""><img src={slider_image_one} alt="slider_image_one"/></a></li>
                                    <li><a href="#" title=""><img src={slider_image_two} alt="slider_image_one"/></a></li>
                                    <li><a href="#" title=""><img src={slider_image_one} alt="slider_image_one"/></a></li>
                                    <li><a href="#" title=""><img src={slider_image_two} alt="slider_image_one"/></a></li>
                                    <li><a href="#" title=""><img src={slider_image_one} alt="slider_image_one"/></a></li>
                                    <li><a href="#" title=""><img src={slider_image_two} alt="slider_image_one"/></a></li>
                
                                  </ul>
                                </div>*/}
                <div className="Bottomslider">
                  <h3>Photos (126)</h3>
                  <ContentSlider />
                  {/*<ul id="thumbSlider">
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
                                    </ul>*/}
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

  value={(profile.current_situation)?profile.current_situation:''}
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

  value={(profile.future_vision)?profile.future_vision:''}
   onSave={(e) => this.onSave('future', e)}
/>}
              </div>
            </div>
        </div>



        <div className="clearfix">
        <Modal show={this.state.topicshow} className="proud_modal" onHide={this.topichandleClose}>
          <span className="close" onClick={this.topichandleClose}>close </span>
          <Modal.Header>
            <Modal.Title><h2>{actions.topic} {topic.type} Topic</h2></Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className={'form-input' + (errors.text ? ' has-error' : '')}>
              <label>
                <input value={topic.text} onChange={this.handleChange} onBlur={this.handleChange} name="text" ref={this.text} type="text" required name="text"/>
                <span className="placeholder">Text</span>
                {errors.text!='' &&
                          <div className="help-block"> {errors.text}</div>
                      }
              </label>
            </div>
          </Modal.Body>
          <Modal.Footer>
    <Button variant="secondary" onClick={this.topichandleClose}>Close</Button>&nbsp;&nbsp;
    <Button variant="primary" onClick={this.topichandleSave}>Save</Button>
  </Modal.Footer>
        </Modal>
        <section className="shadowbox Toptopic">
          <h2>My Top Topics </h2>
          {logged_in && 
            <div className="sideBtn">
              <div className="addButton"><a title="ADD" onClick={(e) => this.topichandleShow('add', e)}><span data-icon="plus"></span>ADD</a></div>
            </div>}
            <div className="toggle tabs tabs_default TabFirst" >
                  <ul className='tabs'>

                    <li className={'tab' + (topic.type=='inspire' ? ' active' : '')} onClick={(e) => this.updatetopichandle('inspire', e)}><a >Inspire</a></li>
                    <li className={'tab' + (topic.type=='aspire' ? ' active' : '')} onClick={(e) => this.updatetopichandle('aspire', e)}><a>Aspire</a></li>
                 </ul>
                 <div id='tab-1' className={(topic.type=='inspire' ? 'tab-list-active' : '')}>
                  <ul className="ToptopicList">
                    {profile.inspire.map((inspire, index) => {
                  return (<li key={inspire._id} className="clearfix">
                      <div className="left"><a href="#" title="{inspire.text}">{inspire.text}</a></div>
                      <div className="right">
                      
                      <span className="numhold">{inspire._userIds.length}</span> people inspiring for this topic <a  onClick={(e) => this.topicPagehandle(inspire, e)} className="view" title="view">view</a>
                      </div>
                    </li>)
                }).reverse()}
                  </ul>  
                </div>
                <div id='tab-2' className={(topic.type=='aspire' ? 'tab-list-active' : '')}><ul className="ToptopicList">
                    {profile.aspire.map((inspire, index) => {
                  return (<li  key={inspire._id} className="clearfix">
                      <div className="left"><a href="#" title="{inspire.text}">{inspire.text}</a></div>
                      <div className="right"><span className="numhold">{inspire._userIds.length}</span> people aspiring for this topic <a  className="view" title="view" onClick={(e) => this.topicPagehandle(inspire, e)}>view</a></div>
                    </li>)
                }).reverse()}
                  </ul></div>
              </div></section>
        <Modal show={this.state.proudshow} className="proud_modal" onHide={this.proudhandleClose}>
          <span className="close" onClick={this.proudhandleClose}>close </span>
          <Modal.Header>
            <Modal.Title><h2>{actions.proud} Proud</h2></Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className={'form-input' + (errors.title ? ' has-error' : '')}>
              <label>
                <input value={proud.title} onChange={this.handleChange} onBlur={this.handleChange} name="title" ref={this.title} type="text" required name="title"/>
                <span className="placeholder">Title</span>
                {errors.title!='' &&
                          <div className="help-block"> {errors.title}</div>
                      }
              </label>
            </div>
            <div className={'form-input' + (errors.note ? ' has-error' : '')}>
              <label>
                <textarea  onChange={this.handleChange} onBlur={this.handleChange} name="note" ref={this.note} rows="6" cols="50" required placeholder="Note" value={proud.note}/>
              {errors.note!='' &&
                          <div style={{    top: "120px"}} className="help-block"> {errors.note}</div>
                      }
              </label>        
            </div>
          </Modal.Body>
          <Modal.Footer>
    <Button variant="secondary" onClick={this.proudhandleClose}>Close</Button>&nbsp;&nbsp;
    <Button variant="primary" onClick={this.proudhandleSave}>Save</Button>
  </Modal.Footer>
        </Modal>      
        <section className="shadowbox Proud">
          <h2>P.R.O.U.D Chart</h2>
          {logged_in && 
            <div className="sideBtn">
              <div className="addButton"><a title="ADD" onClick={(e) => this.proudhandleShow('add', e)}><span data-icon="plus"></span>ADD</a></div>
            </div>}


          <ul className="scroll">
          {
                
                profile.proud_chart.map((proud, index) => {
                  return (
             <li key={proud._id}>       
              <div className="date"><span className="sprite icon"></span><Moment format="D MMMM, HH:mm">{proud.createdAt}</Moment> </div>
              <h3><a href="#" title={proud.title}>{proud.title}</a></h3>
              <p>{proud.note}</p>
              <span className="proud_actions">
                {logged_in && <a onClick={(e) => this.proudhandleShow('edit',proud, e)} title="EDIT">EDIT</a>}
              </span>
            </li>
                  )
                }).reverse()
              }
            
          </ul>


        </section>      
        </div>
        

        <Modal show={this.state.contractshow} className="proud_modal contractform" onHide={this.contractClose}>
          <span className="close" onClick={this.contractClose}>close </span>
          <Modal.Header>
            <Modal.Title><h2>{actions.proud} Contract</h2></Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <div className={'form-input' + (errors.note ? ' has-error' : '')}>
              <label>
                <input type="radio" value="Open" checked={this.state.selectedOption === 'Open'} onChange={this.handleOptionChange}/>
               &nbsp; Open
              </label>
              <label>
                <input type="radio" value="Completed" checked={this.state.selectedOption === 'Completed'} onChange={this.handleOptionChange}/>
                &nbsp; Completed
              </label>        
            </div>
            <div className={'form-input' + (errors.title ? ' has-error' : '')}>
              <label>
              {this.state.selectedOption === 'Open' &&
              <SingleDatePicker
  placeholder="Start Date"              
  date={this.state.startDate} // momentPropTypes.momentObj or null
  onDateChange={date => this.setState({ startDate:date })} // PropTypes.func.isRequired
  focused={this.state.focused} // PropTypes.bool
  onFocusChange={({ focused }) => this.setState({ focused })} // PropTypes.func.isRequired
  id="your_unique_id" // PropTypes.string.isRequired,
/>
            }
              {this.state.selectedOption === 'Completed' &&
                <DateRangePicker
              
  startDate={this.state.startDate} // momentPropTypes.momentObj or null,
  startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
  endDate={this.state.endDate} // momentPropTypes.momentObj or null,
  endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
  onDatesChange={({ startDate, endDate }) => this.setState({ startDate, endDate })} // PropTypes.func.isRequired,
  focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
  onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
/>}
                
                {errors.title!='' &&
                          <div className="help-block"> {errors.title}</div>
                      }
              </label>
            </div>
            
            <div className={'form-input' + (errors.note ? ' has-error' : '')}>
              <label>
              <span>Who the contract is with</span>
                <Select options={profile.users} />

              {errors.note!='' &&
                          <div style={{    top: "120px"}} className="help-block"> {errors.note}</div>
                      }
              </label>        
            </div>
            {this.state.selectedOption === 'Completed' &&
<div className={'form-input' + (errors.note ? ' has-error' : '')}>
              <label>
              Rate&nbsp;
            <Rating
  emptySymbol="fa fa-star-o fa-2x"
  fullSymbol="fa fa-star fa-2x"
  fractions={2}
  initialRate={0}
  placeholderRate="Rate"
  onChange={(rate) => (rate)}
/>
</label>        
            </div>}
          </Modal.Body>
          <Modal.Footer>
    <Button variant="secondary" onClick={this.contractClose}>Close</Button>&nbsp;&nbsp;
    <Button variant="primary" onClick={this.contracthandleSave}>Save</Button>
  </Modal.Footer>
        </Modal>
        <section className="Contracts shadowbox">
          <h2>My Contracts</h2>
          {logged_in && 
            <div className="sideBtn">
              <div className="addButton"><a title="ADD" onClick={(e) => this.contracthandleShow('add', e)}><span data-icon="plus"></span>ADD</a></div>
            </div>}
          <div className="selectHolder">
             Sort by : 
            <div className="styled-select">
             <select>
               <option>Current</option>
               <option>Current y</option>
               <option>Current n</option>
             </select>
            <span className="fa fa-sort-desc"></span>
          </div>
          </div>

            <div className="toggle tabs tabs_default TabSecond" >
                  <ul className="tabs">
                    <li className={'tab' + (contract.type=='me' ? ' active' : '')} onClick={(e) => this.updatecontracthandle('me', e)}><a>Serving Me</a> </li>
                    <li className={'tab' + (contract.type=='others' ? ' active' : '')} onClick={(e) => this.updatecontracthandle('others', e)}><a>Serving Others</a></li>
                    
                  </ul>
                 
                    <div id='tab-3' className={(contract.type=='me' ? 'tab-list-active' : '')}>
                        <table>
                          <thead>
                            <tr>
                              <th>metopic name</th>
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
                    <div id='tab-4' className={(contract.type=='others' ? 'tab-list-active' : '')}>
                        <table>
                          <thead>
                            <tr>
                              <th>1topic name</th>
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
    </main>}</div>
    )
  }
}

export default connect(
  state => ({
    profile: state.profile,
    auth:state.auth
  })
)(Home);
