import React, { Component } from 'react';
import Alert from 'react-bootstrap/Alert';

export default class AlertMessage extends Component {
  render() {
    return (<Alert variant={this.props.type}>
	  <Alert.Heading>{this.props.heading}</Alert.Heading>
	  <p>
	    {this.props.message}
	  </p>
	</Alert>)
	}
}