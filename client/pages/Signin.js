import React, { Component } from 'react';
import { connect } from 'react-redux';
import { css } from '@emotion/core';
import { FadeLoader } from 'react-spinners';
import Alert from 'react-bootstrap/Alert';
import Action from '../actions/accountActions';
import AlertMessage from '../layout/AlertMessage';
import { NavLink } from 'react-router-dom';
import logo from '../public/jocallio/image/logo.png';
import loginimage from '../public/jocallio/image/loginimage.png';
class Signin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        name: '',
        email:'',
        password: '',
      },
        submitted: false,
      errors:{
        email:'',
        password: '',
      }
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validateInput = this.validateInput.bind(this);
    this.email = React.createRef();
    this.password = React.createRef();
    const { dispatch } = props;
    dispatch(Action.clearErrors());
  }
  validateInput(name, value, type){
    var error='';
    switch(name){
      case 'email':
        error=(value=='')?"Email is required":'';
        if(error=='' && (type=='submit' || type=='blur')){
          var emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
          error = emailValid ? '' : value+' is invalid Email';
        }
      break;
      case 'password':
        error=(value=='')?"Password is required":'';
      break;
    }
    const { errors } = this.state;
    errors[name] = error
    this.setState({errors,errors});
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
      event.preventDefault();
      this.validateInput(this.email.current.name, this.email.current.value, 'blur');
      this.validateInput(this.password.current.name, this.password.current.value, 'blur');
      this.setState({ submitted: true });
      const { user, errors } = this.state;

      const { dispatch } = this.props;
      if (errors.email=='' && errors.password=='') {
          dispatch(Action.loginAction(user));
      }
  }
  render() {
    const { registering , fetching } = this.props;
    const { user, submitted ,errors} = this.state;
    const { account, auth } = this.props;
    const { error } = account;
    return (
      <div>
      <main className="loginScreen clearfix">
   
      {auth.isAuthenticated==false &&
      <div className="leftPanel">
         {auth.isAuthenticated &&
      <AlertMessage type="success" heading="Congratulations, Login successfull" message="You will be redirected shortly." />
    }
            {error!=null &&
      <AlertMessage type="danger" heading="" message={error} />
    }
             
            <div className="logohere">
                <a href="" title="logo"><img width="99"  src={logo} alt="image" /></a>
                <h5 className="techchi">TECK CHI.com</h5>
            </div>
            
            <h2>Login</h2>
            <form name="form" onSubmit={this.handleSubmit}>
                <div className={'form-input' + (submitted && !user.email ? ' has-error' : '')}>
                    <label>
                        <input type="text" required  name="email" value={user.email} onChange={this.handleChange} onBlur={this.handleChange} ref={this.email}/>
                        <span className="placeholder">Email</span>
                          {errors.email!='' &&
                          <div className="help-block"> {errors.email}</div>
                      }
                    </label>
                </div>
                <div className={'form-input last-child' + (submitted && !user.email ? ' has-error' : '')}>
                    <label>
                        <input type="password" required  name="password" value={user.password} onChange={this.handleChange} onBlur={this.handleChange} ref={this.password}/>
                        <span className="placeholder">Password</span>
                        {errors.password!='' &&
                        <div className="help-block"> {errors.password}</div>
                    }
                    </label>
                </div>
                
              
                <button className="buttonLogin">Login</button>
                <div className="Forgot"><a href="#" title="Forgot Password">Forgot Password</a></div>
            </form>
          
  

        </div>

      }
      <div className="rightPanel"><img src={loginimage} alt="login" />
            <div className="textholder">
                <p>TECK CHI is a website that captures your unique talents and gives you results, profit & rewards by following the roadmap.</p>
            </div>
        </div>
        </main>
        <div className="loginHolder">Dont have an account? <NavLink to="/register" className='login-anchor'>Create your account</NavLink> , it takes less than a minute</div>
      </div>
    );
  }
}
export default connect(
  state => ({
    account: state.account,
    auth: state.auth,
  })
)(Signin);


