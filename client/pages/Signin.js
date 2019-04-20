import React, { Component } from 'react';
import { connect } from 'react-redux';
import { css } from '@emotion/core';
import { FadeLoader } from 'react-spinners';
import Alert from 'react-bootstrap/Alert';
import Action from '../actions/accountActions';
import AlertMessage from '../layout/AlertMessage';
import { NavLink } from 'react-router-dom';
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
          this.props.history.push('/');
      }
  }
  componentWillReceiveProps(nextProps) {
      if(nextProps.auth.isAuthenticated) {
          setTimeout(() => {
             this.props.history.push('/')
        }, 500);
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

      <div className="container">
    {auth.isAuthenticated &&
      <AlertMessage type="success" heading="Congratulations, Login successfull" message="You will be redirected shortly." />
    }
      {auth.isAuthenticated==false &&
      <div className="row justify-content-lg-center justify-content-md-center justify-content-sm-center">
        <div className="col-md-auto col-lg-auto col-sm-auto  a-box-inner  col-md-4 col-lg-4 col-sm-4">
            {error!=null &&
      <AlertMessage type="danger" heading="" message={error} />
    } 
            <h2>Sign in</h2>
            <form name="form" onSubmit={this.handleSubmit}>
                <div className={'form-group' + (submitted && !user.email ? ' has-error' : '')}>
                    <label htmlFor="email">Email</label>
                    <input type="text" className="form-control" name="email" value={user.email} onChange={this.handleChange} onBlur={this.handleChange} ref={this.email}/>
                    {errors.email!='' &&
                        <div className="help-block"> {errors.email}</div>
                    }
                </div>
                <div className={'form-group' + (submitted && !user.password ? ' has-error' : '')}>
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" name="password" value={user.password} onChange={this.handleChange} onBlur={this.handleChange} ref={this.password}/>
                    {errors.password!='' &&
                        <div className="help-block"> {errors.password}</div>
                    }
                </div>
                <div className="form-group">
                    <button className="col-md-12 btn btn-blue btn-ask-pro-det">Sign in</button>
                    {fetching && 
                        <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                    }
                    
                </div>
            </form>
            <div className="a-divider-inner"></div>
            <div className="a-row">
          Don't have an account?
          <NavLink to="/register" className='login-anchor'>Create your account</NavLink>
        </div>
            </div>

        </div>

      }
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


