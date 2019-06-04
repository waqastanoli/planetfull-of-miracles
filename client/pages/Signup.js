import React, { Component } from 'react';
import { connect } from 'react-redux';
import { css } from '@emotion/core';
import { FadeLoader } from 'react-spinners';
import Alert from 'react-bootstrap/Alert';
import Modal from 'react-bootstrap/Modal';
import Action from '../actions/accountActions';
import AlertMessage from '../layout/AlertMessage';
import { NavLink } from 'react-router-dom';
import logo from '../public/jocallio/image/logo.png';
import loginimage from '../public/jocallio/image/loginimage.png';
class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
       smShow: false,
      lgShow: false,
      user: {
        name: '',
        email:'',
        verifyemail:'',
        password: '',
        confirmpassword: '',
        mobile:'',
      },
        submitted: false,
      errors:{
        name: '',
        email:'',
        verifyemail:'',
        password: '',
        confirmpassword: '',
        mobile:'',
        t_c:'',
      }
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validateInput = this.validateInput.bind(this);
    this.name = React.createRef();
    this.email = React.createRef();
    this.verifyemail = React.createRef();
    this.password = React.createRef();
    this.confirmpassword = React.createRef();
    this.t_c = React.createRef();
    this.mobile = React.createRef();
    const { dispatch } = props;
    dispatch(Action.clearErrors());
  }
  validateInput(name, value, type){
    console.log(name);
    var error='';
    switch(name){
      case 'name':
        error=(value=='')?"Name is required":'';
      break;
      case 'email':
        error=(value=='')?"Email is required":'';
        if(error=='' && (type=='submit' || type=='blur')){
          var emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
          error = emailValid ? '' : value+' is invalid Email';
        }
      break;
      case 'verifyemail':
        error=(value=='')?"Verify Email is required":'';
        if(error=='' && (type=='submit' || type=='blur')){
          var emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
          error = emailValid ? '' : value+' is invalid Email';
          if(error==''){
           if (this.verifyemail.current.value !== this.email.current.value) {
                 error="Emails don't match";
            }
          }
        }
      break;
      case 'password':
        error=(value=='')?"Password is required":'';
      break;
      case 'confirmpassword':
        error=(value=='')?"Confirm Password is required":'';
        if(error==''){
           if (this.password.current.value !== this.confirmpassword.current.value) {
              error="Passwords don't match";
          }
      }
      break;
      case 't_c':
        error=(this.t_c.current.checked)?'':"Accept Terms and conditions to register";
      break;

    }
    const { errors } = this.state;
    errors[name] = error
    this.setState({errors,errors});
  }
  handleChange(event) {
    
      const { name, value } = event.target;
      this.validateInput(name, value, event.type);
      const { user } = this.state;
      this.setState({
          user: {
              ...user,
              [name]: value
          }
      });
  }

  handleSubmit(event) {
     var {cartItems}=this.props.cartItems
      event.preventDefault();
      this.validateInput(this.name.current.name, this.name.current.value, 'blur');
      this.validateInput(this.email.current.name, this.email.current.value, 'blur');
      this.validateInput(this.verifyemail.current.name, this.verifyemail.current.value, 'blur');
      this.validateInput(this.password.current.name, this.password.current.value, 'blur');
      this.validateInput(this.confirmpassword.current.name, this.confirmpassword.current.value, 'blur');
      this.validateInput(this.mobile.current.name, this.mobile.current.value, 'blur');
      this.setState({ submitted: true });
      const { user, errors } = this.state;

      const { dispatch } = this.props;
      
        if (errors.name=='' && errors.email=='' && errors.verifyemail=='' && errors.password=='' && errors.confirmpassword=='') {
            if(this.t_c.current.checked){
              dispatch(Action.registerAction(user, cartItems));
              } else {
            this.validateInput(this.t_c.current.name, this.t_c.current.value, 'blur');
          }
        } 
  }
  componentDidMount() {
      if(this.props.auth.isAuthenticated) {
          this.props.history.push('/'+this.props.auth.user.username);
      }
  }
  componentWillReceiveProps(nextProps) {
      if(nextProps.auth.isAuthenticated) {

             this.props.history.push('/'+nextProps.auth.user.username)

      }
      if(nextProps.errors) {
        this.setState({
            errors: nextProps.errors
        });
      }
  }
  render() {
    const { registering , fetching } = this.props;
    const { user, submitted ,errors} = this.state;
    const { account , auth} = this.props;
    const { error } = account;
    let smClose = () => this.setState({ smShow: false });
    let lgClose = () => this.setState({ lgShow: false });
    return (

      <div>
     <main className="loginScreen clearfix">
    {auth.isAuthenticated &&
      <AlertMessage type="success" heading="Congratulations, Account Created Successfully" message="You will be logged in Automatically." />
    }
      {auth.isAuthenticated==false &&
      <div className="leftPanel">
        <div className="col-md-auto col-lg-auto col-sm-auto  a-box-inner  col-md-4 col-lg-4 col-sm-4">
            {error!=null &&
      <AlertMessage type="danger" heading="" message={error} />
    } 
    <div className="logohere">
                <a href="" title="logo"><img width="99"  src={logo} alt="image" /></a>
              <h5 className="techchi">TECK CHI.com</h5>
            </div>
            <h2>Registration</h2>
            <form name="form" onSubmit={this.handleSubmit}>
                <div className={'form-input' + (submitted && !user.name ? ' has-error' : '')}>
                    <label>
                    <input required type="text" className="form-control" name="name" value={user.name} onBlur={this.handleChange} onChange={this.handleChange} ref={this.name} />
                    <span className="placeholder">Name</span>
                    {errors.name!='' &&
                        <div className="help-block"> {errors.name}</div>
                    }</label>
                </div>
                <div className={'form-input' + (submitted && !user.email ? ' has-error' : '')}>
                    <label>
                    <input required type="text" className="form-control" name="email" value={user.email} onChange={this.handleChange} onBlur={this.handleChange} ref={this.email}/>
                    <span className="placeholder">Email</span>
                    {errors.email!='' &&
                        <div className="help-block"> {errors.email}</div>
                    }</label>
                </div>
                <div className={'form-input' + (submitted && !user.verifyemail ? ' has-error' : '')}>
                    <label>
                    <input required type="text" className="form-control" name="verifyemail" value={user.verifyemail} onChange={this.handleChange} onBlur={this.handleChange} ref={this.verifyemail}/>
                    <span className="placeholder">Verify Email</span>
                    {errors.verifyemail!='' &&
                        <div className="help-block"> {errors.verifyemail}</div>
                    }
                    </label>
                </div>
                <div className={'form-input' + (submitted && !user.password ? ' has-error' : '')}>
                    <label>
                    <input required type="password" className="form-control" name="password" value={user.password} onChange={this.handleChange} onBlur={this.handleChange} ref={this.password}/>
                    <span className="placeholder">Password</span>
                    {errors.password!='' &&
                        <div className="help-block"> {errors.password}</div>
                    }
                    </label>
                </div>
                <div className={'form-input' + (submitted && !user.confirmpassword ? ' has-error' : '')}>
                    <label>
                    <input required type="password" className="form-control" name="confirmpassword" value={user.confirmpassword} onChange={this.handleChange} onBlur={this.handleChange} ref={this.confirmpassword}/>
                    <span className="placeholder">Confirm Password</span>
                    {errors.confirmpassword!='' &&
                        <div className="help-block"> {errors.confirmpassword}</div>
                    }
                    </label>
                </div>

                <div className={'form-input' + (submitted && !user.mobile ? ' has-error' : '')}>
                    <label>
                    <input type="text" className="form-control" name="mobile" value={user.mobile} onChange={this.handleChange} onBlur={this.handleChange} ref={this.mobile}/>
                    <span className="placeholder">Mobile No.<i>(optional)</i></span>
                    {errors.mobile!='' &&
                        <div className="help-block"> {errors.mobile}</div>
                    }
                    </label>
                </div>
                <label className="pure-material-checkbox">
                    <input type="checkbox" onClick={() => this.validateInput(this.t_c.current.name, this.t_c.current.value, "blur")} name='t_c' id='t_c' value="1"  ref={this.t_c}/>
                    <span>I Accept  <a  onClick={() => this.setState({ lgShow: true })}>terms and conditions & privacy policy</a></span>
                    {errors.t_c!='' &&
                        <div className="help-block-terms"> {errors.t_c}</div>
                    }
                </label>
                <button className="buttonLogin">Register</button>
                <Modal size="lg" show={this.state.lgShow} onHide={lgClose} aria-labelledby="example-modal-sizes-title-lg"
        >
          <Modal.Header closeButton>
            <Modal.Title id="example-modal-sizes-title-lg">
              Terms and Conditions & privacy policy 
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>Terms and Conditions & privacy policy...</Modal.Body>
        </Modal>

              
            </form>
            
           

            </div>

        </div>

      }
<div className="rightPanel"><img src={loginimage} alt="login"/>
            <div className="textholder">
                <p>TECK CHI is a website that captures your unique talents and gives you results, profit & rewards by following the roadmap.</p>
            </div>
        </div>
      </main>
      <div className="loginHolder">Already have an account? <NavLink to="/signin" className='login-anchor'>Login to your account.</NavLink></div>
        </div>
      
    );
  }
}
export default connect(
  state => ({
    account: state.account,
    auth: state.auth,
    cartItems: state.cartItems,
  })
)(Signup);


