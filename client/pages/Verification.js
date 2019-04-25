import React, { Component } from 'react';
import { connect } from 'react-redux';
import { css } from '@emotion/core';
import { FadeLoader } from 'react-spinners';
import Alert from 'react-bootstrap/Alert';
import Action from '../actions/accountActions';
import AlertMessage from '../layout/AlertMessage';
import { NavLink } from 'react-router-dom';
const override = 'display: block;margin: 0 auto;border-color: red;';
class Verification extends Component {
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
      let search = window.location.search;
      let params = new URLSearchParams(search);

      let token = params.get('token');
      let email = params.get('email');
      const { dispatch } = this.props;
      if (token && email) {
          dispatch(Action.verifyAction(token, email));
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
        <div className="col-md-auto col-lg-auto col-sm-auto col-md-4 col-lg-4 col-sm-4">
            {error!=null &&
      <AlertMessage type="danger" heading="" message={error} />
    } 
            
            {error==null && 
            <FadeLoader
                css={override}
                sizeUnit={"px"}
                size={150}
                color={'#123abc'}
                loading={true}
              />
              }
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
)(Verification);


