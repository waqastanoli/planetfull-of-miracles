import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
export default class Footer extends Component {
  render() {
    return (
      <div>
      <footer>Copyright © 2019 Company S.L. All rights reserved.</footer>
      <div id="myModal" className="modal">
        <div className="modal-content">
          <span className="close">close </span>
          <iframe width="640" height="360" src="https://www.youtube.com/embed/TmerVCmPgA0" frameborder="0" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
      </div>
      </div>
    )
  }
}