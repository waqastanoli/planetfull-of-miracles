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
import AccountAction from '../actions/accountActions';
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
import coins_icon from '../public/jocallio/image/coins-icon.png';
  
import small_profile_2 from '../public/jocallio/image/small_profile_2.png';
import small_profile_5 from '../public/jocallio/image/small_profile_5.png';
import small_profile_3 from '../public/jocallio/image/small_profile_3.png';
import slider_image_one from '../public/jocallio/image/slider-images/1.jpg';

import slider_image_two from '../public/jocallio/image/slider-images/2.jpg';
import slider_image_three from '../public/jocallio/image/slider-images/3.jpg';
import slider_image_four from '../public/jocallio/image/slider-images/4.jpg';
import slider_image_five from '../public/jocallio/image/slider-images/5.jpg';
import slider_image_six from '../public/jocallio/image/slider-images/6.jpg';
import slider_image_seven from '../public/jocallio/image/slider-images/7.jpg';
import slider_image_eight from '../public/jocallio/image/slider-images/8.jpg';

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
import SweetAlert from 'react-bootstrap-sweetalert';
import StarRatings from 'react-star-ratings';
const override = 'display: block;margin: 0 auto;border-color: red;';

class Home extends Component {

  constructor(props) {
    super(props);

    const {  auth , match, dispatch} =props;
    var logged_in = false;
    dispatch(Actions.resetProfileAction());
    if(auth && match.params.userName==auth.user.username)
    logged_in = auth.isAuthenticated;
    this.state = {
      workshow: false,
      alert: null,
      contractwho:null,
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
        status:"Open",
        rate:null
      },
      actions:{
        proud:'Add',
        id:null,
      },
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
      },
      contracterrors: {
        startDate:'',
        endDate:'',
        status:'',
        who:'',
        rate:''
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
    this.handleContractwho = this.handleContractwho.bind(this); 
    this.sendcontract = this.sendcontract.bind(this); 
    this.showsSuccessAlert = this.showsSuccessAlert.bind(this); 
    this.changeRating = this.changeRating.bind(this); 
    
    this.onshowWorks = this.onshowWorks.bind(this);
    this.workshowOpen = this.workshowOpen.bind(this);

    this.title = React.createRef();
    this.note = React.createRef();
    this.text = React.createRef();

  }
  
  onshowWorks(e){
      const { dispatch } = this.props;
      dispatch(AccountAction.showorks()); 
  }
  workshowOpen() {
    this.setState({ workshow: true });
  }
  showsSuccessAlert=( heading, message)=> {
    const getAlert = () => (
      <SweetAlert 
        success
        title={heading} 
        onConfirm={() => this.hideAlert()}
      >
        {message}
      </SweetAlert>
    );

    this.setState({
      alert: getAlert()
    });
  }

  hideAlert=()=> {
    console.log('Hiding alert...');
    this.setState({
      alert: null
    });
  }
  handleContractwho = (selectedOption) => {
    this.setState(prevState => ({
        contract: {
            ...prevState.contract,
            who: selectedOption
        }
    }))
  }
  changeRating( newRating, name ) {
    /*this.setState({
      rating: newRating
    });*/
    this.setState(prevState => ({
      contract: {
          ...prevState.contract,
          rate: newRating
      }
    }))
  }
  
  componentDidMount() {
    this.setState({ search:'' })
    const { dispatch, match, auth } = this.props;
    this.state.dispatch = dispatch;
     if(auth.new==true){
      this.onshowWorks();
    }
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
    var value = changeEvent.target.value;
    this.setState(prevState => ({
      contract: {
          ...prevState.contract,
          status: value,
          endDate:(value=='Open')?null:prevState.contract.endDate
      }
    }))
  }
  contracthandleShow(type, editproud){
    this.setState({ contractshow: true });
  }
  contractClose() {
    this.setState({ contractshow: false});
    this.setState(prevState => ({
        contract: {
            ...prevState.contract, 
            startDate:null,
            endDate:null,
            status:null,
            who:null,
            status:"Open",
            rate:null
        }
    }))
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
    this.setState(prevState => ({
        topic: {
            ...prevState.topic,
            type: type
        }
    }))
  }
  updatecontracthandle(type){
    this.setState(prevState => ({
        contract: {
            ...prevState.contract,
            type: type
        }
    }))
  }
  topicPagehandle(topic){
    this.props.history.push('/topic/'+topic._id)
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
      this.showsSuccessAlert( "Success", "Proud Saved Successfully");
      
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
      this.showsSuccessAlert( "Success", "Topic Saved Successfully");
     }
  }
  validate_contract(){
    const {actions, topic, contract} = this.state;
    var startDateError='';
    var endDateError='';
    var whoError = '';
    var rateError = '';
    if(contract.startDate==null){
      startDateError = 'Start Date Required';
    }
    if(contract.who==null || contract.who.length==0){
        whoError = 'Required';     
    } 
    if(contract.status=='Completed' && contract.startDate!==null){
      if(contract.endDate==null){
        endDateError = 'End Date Required';
      }
      

    }
    if(contract.status=='Completed' && contract.rate===null){
      rateError = 'Please rate the contract';
    }
    
    this.setState(prevState => ({
          contracterrors: {
              ...prevState.contracterrors,
              who: whoError,
              startDate:startDateError,
              endDate:endDateError,
              rate:rateError
          }
      }),
  this.sendcontract)
    
  }
  sendcontract(){
    const { dispatch, match, auth } = this.props;
    const {actions, topic, contract, contracterrors} = this.state;
    if(contracterrors.rate=='' && contracterrors.who=='' && contracterrors.startDate=='' && contracterrors.endDate==''){
      var obj_contract = contract;
      obj_contract._userId = auth.user.id;
      //obj_contract.startDate =  new Date(obj_contract.startDate)/*.format('Y-m-d')*/;
      dispatch(Actions.updatecontract(obj_contract));
      this.contractClose();
      this.showsSuccessAlert( "Success", "Contract Saved Successfully");
    }
  }
  contracthandleSave(){
      this.validate_contract();  
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
        img:slider_image_eight,
        class:"legend",
        label:"Family"
      },
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
        label:"Family"
      },
      {
        img:slider_image_seven,
        class:"legend",
        label:"Family"
      },

    ]
    const { dispatch, products, auth , match, fetched, profile} = this.props;
    const  {logged_in ,errors, contracterrors, proud, topic, actions, contract } = this.state;
    if(profile.image==null)
    var profile_img=profileplaceholder;
    else
    var profile_img = profile.image;  
    //var profile_img = API_URL.API_URL+'/public/'+profile.id+'/profile/'+profile.image;
    if(profile.cover==null)
    var cover_img = placeholdercover
    else 
    var cover_img = profile.cover;//API_URL.API_URL+'/public/'+profile.id+'/cover/'+profile.cover;

    return (
      <div>
      {profile.not_found && 
        <main className={"main "+((logged_in)?'logged_in':'')}>
          <div className="content"><span>Profile Not Found</span></div>
        </main>
      }
      {profile.fetching && 
            <FadeLoader
                css={override}
                sizeUnit={"px"}
                size={150}
                color={'#123abc'}
                loading={true}
              />
              }
              {this.state.alert}
      {profile.fetched && 
      <main className={"main "+((logged_in)?'logged_in':'')}>
        {logged_in && <div className="yo_pro">
          <h1 style={{textAlign:'center',display:'inline-block',marginTop:'-13px',marginBottom:'0px'}}>Your Profile</h1>
        </div>
      }
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
                    
                    <li className="Current">
                        <div className="left fleft"><span className="sprite icon"></span></div>
                        <div className="right fleft">
                            <div className="num fleft">{profile.openContracts.length}</div>
                            <div className="text fleft">Open
                                <div>Contracts</div>
                            </div>
                        </div>
                    </li>
                    <li className="Completed">
                        <div className="left fleft"><span className="sprite icon"></span></div>
                        <div className="right fleft">
                            <div className="num fleft">{profile.completedContracts.length}</div>
                            <div className="text fleft">Completed
                                <div>Contracts</div>
                            </div>
                        </div>
                    </li>
                    <li className="Inspire">
                        <div className="left fleft"><span className="coin icon"><img src={coins_icon}/></span></div>
                        <div className="right fleft">
                            <div className="num fleft">0</div>
                            <div className="text fleft">Kudos
                                <div>Coins</div>
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
                      if(this.state.modaltype=='profile'){
                        this.showsSuccessAlert( "Success", "Profile Image updated successfully");
                      }
                      //this.setState({ alert: {type:'success',heading:'',message:'Profile Image updated successfully'} });
                      else{
                        this.showsSuccessAlert( "Success", "Cover Image updated successfully");
                        //this.setState({ alert: {type:'success',heading:'',message:'Cover Image updated successfully'} });
                      }
                      setTimeout(function(){
                        //this.setState({alert:false});
                    }.bind(this),5000);
                      this.handleClose()
                      var splited_res = img_res[0].split("/");
                      //console.log(splited_res)
                      if(this.state.modaltype=='profile'){
                        profile.image = img_res[0]//splited_res[splited_res.length-1]
                      }
                      else
                        profile.cover = img_res[0]//splited_res[splited_res.length-1]
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
/>}{/*profile.current_situation==null && <span>Current life situation not added yet.</span>*/}
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
/>}{/*profile.future_vision==null && <span>Future vision not added yet.</span>*/}
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
                 <div id='tab-1' className={'scroll '+(topic.type=='inspire' ? 'tab-list-active' : '')}>
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
                <div id='tab-2' className={'scroll '+(topic.type=='aspire' ? 'tab-list-active' : '')}><ul className="ToptopicList">
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
            <Modal.Title><h2>Add Contract</h2></Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <div className={'form-input' + (errors.note ? ' has-error' : '')}>
              <label>
                <input type="radio" value="Open" checked={contract.status === 'Open'} onChange={this.handleOptionChange}/>
               &nbsp; Open
              </label>
              <label>
                <input type="radio" value="Completed" checked={contract.status === 'Completed'} onChange={this.handleOptionChange}/>
                &nbsp; Completed
              </label>        
            </div>
            <div className={'form-input' + (errors.title ? ' has-error' : '')}>
              <label>
              {contract.status === 'Open' &&
              <SingleDatePicker
  placeholder="Start Date"              
  date={contract.startDate} // momentPropTypes.momentObj or null
  onDateChange={date => this.setState(prevState => ({
    contract: {
        ...prevState.contract,
        startDate: date
    }
}))} // PropTypes.func.isRequired
  focused={this.state.focused} // PropTypes.bool
  onFocusChange={({ focused }) => this.setState({ focused })} // PropTypes.func.isRequired
  id="your_unique_id" // PropTypes.string.isRequired,
/>
            }
              {contract.status === 'Completed' &&
                <DateRangePicker
              
                startDate={contract.startDate} // momentPropTypes.momentObj or null,
                startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
                endDate={contract.endDate} // momentPropTypes.momentObj or null,
                endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
                onDatesChange={({ startDate, endDate }) => 
              this.setState(prevState => ({
                  contract: {
                      ...prevState.contract,
                      startDate: startDate,
                      endDate: endDate
                  }
              }))
              } // PropTypes.func.isRequired,
                focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
              />}
                
                {contracterrors.startDate!='' &&
                          <div className="help-block"> {contracterrors.startDate}</div>
                      }
                {contracterrors.endDate!='' &&
                    <div className="help-block"> {contracterrors.endDate}</div>
                }
              </label>
            </div>
            
            <div className={'form-input' + (errors.note ? ' has-error' : '')}>
              <label>
              <span>Who the contract is with</span>
                <Select options={profile.users} onChange={this.handleContractwho} />

              {contracterrors.who!='' &&
                          <div className="help-block"> {contracterrors.who}</div>
                      }
              </label>        
            </div>
            {contract.status === 'Completed' &&
<div className={'form-input' + (errors.note ? ' has-error' : '')}>
              <label>
              Rate&nbsp;
              
            <StarRatings
          rating={(contract.rate)?contract.rate:0}
          starRatedColor="blue"
          changeRating={this.changeRating}
          numberOfStars={5}
          isAggregateRating={true}
          name='rating'
        />
        {contracterrors.rate!='' &&
                          <div className="help-block"> {contracterrors.rate}</div>
                      }
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
          {/*<div className="selectHolder">
                       Sort by : 
                      <div className="styled-select">
                       <select>
                         <option>Current</option>
                         <option>Current y</option>
                         <option>Current n</option>
                       </select>
                      <span className="fa fa-sort-desc"></span>
                    </div>
                    </div>*/}

            <div className="toggle tabs tabs_default TabSecond" >
                  <ul className="tabs">
                    <li className={'tab' + (contract.type=='me' ? ' active' : '')} onClick={(e) => this.updatecontracthandle('me', e)}><a>Serving Me</a> </li>
                    <li className={'tab' + (contract.type=='others' ? ' active' : '')} onClick={(e) => this.updatecontracthandle('others', e)}><a>Serving Others</a></li>
                    
                  </ul>
                 
                    <div id='tab-3' className={'scroll '+(contract.type=='me' ? 'tab-list-active' : '')}>
                        <table className="contable">
                          <thead>
                            <tr>
                              <th>From</th>
                              <th>To</th>
                              <th>Status</th>
                              
                              <th>Rating</th>
                              <th>Who</th>
                            </tr>
                          </thead>
                          <tbody>
                          {profile.serving_me.map((serving, index) => {
                  if(serving.who.image==null)
    var profile_img=profileplaceholder;
    else
                            var profile_img = serving.who.image//API_URL.API_URL+'/public/'+serving.who._id+'/profile/'+serving.who.image;
                                      
                  return (<tr key={serving._id}>
                              <td><Moment format="YYYY-MM-DD">{serving.from}</Moment></td>
                              <td>{serving.to && <Moment format="YYYY-MM-DD">{serving.to}</Moment>}</td>
                              <td>{serving.status}</td>
                              <td className="rating">{serving.rating && <StarRatings
        rating={serving.rating}
        starDimension="12px"
        starSpacing="2px"
      />}</td>
                              <td>
                                  <div className="profile"><img src={profile_img} alt="image" /></div>
                                 {serving.who.name}
                                  <a href={serving.who.username} className="view" title="view">view</a>

                              </td>
                              
                            </tr>)
                            }).reverse()}
                           
                          </tbody>
                        </table>

                       {/* <div className="viewAll"><a href="viewAlllink">view all</a></div>*/}</div>
                    <div id='tab-4' className={(contract.type=='others' ? 'tab-list-active' : '')}>
                        <table className="contable">
                          <thead>
                            <tr>
                              <th>From</th>
                              <th>To</th>
                              <th>Status</th>
                              <th>Rating</th>
                              <th>Who</th>

                            </tr>
                          </thead>
                          <tbody>
                            {profile.serving_others.map((serving, index) => {
                  if(serving.who.image==null)
    var profile_img=profileplaceholder;
    else
                            var profile_img = serving.who.image//API_URL.API_URL+'/public/'+serving.who._id+'/profile/'+serving.who.image;
                                      
                  return (<tr key={serving._id}>
                              <td><Moment format="YYYY-MM-DD">{serving.from}</Moment></td>
                              <td>{serving.to && <Moment format="YYYY-MM-DD">{serving.to}</Moment>}</td>
                              <td>{serving.status}</td>
                              <td className="rating">{serving.rating && <StarRatings
        rating={serving.rating}
        starDimension="12px"
        starSpacing="2px"
      />}</td>
                              <td>
                                  <div className="profile"><img src={profile_img} alt="image" /></div>
                                 {serving.who.name}
                                  <a href={serving.who.username} className="view" title="view">view</a>

                              </td>
                            </tr>)
                            }).reverse()}
                           
                          </tbody>
                        </table>

                        {/*<div className="viewAll"><a href="viewAlllink">view all</a></div>*/}</div>
                    
                 
                </div>
        </section>
        
        <div className="Contracts shadowbox">
          <h2 style={{textAlign:'center'}}><a target='_new' href='/JohnSmith'>VIEW SAMPLE PROFILE</a></h2>
        </div>
      
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
