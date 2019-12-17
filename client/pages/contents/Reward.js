import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
export default class Reward extends Component {
  render() {
    return (
      <div className="main logged_in">
        <div className="page-style paddintop15">
          <p>
            <strong>
              <span className="heading_how_it_works">
                REWARDS and RECOGNITION
              </span>
            </strong>
          </p>
          <div className="hiw-section">
            <p>
              We highlight those who excel or help to solve Pressing Issues of
              Humanity, with valuable rewards and recognition including TV
              exposure on our sister show. Segment 3 is solely dedicated to the
              input and outcome of the Internet success stories. The TECK CHI
              website can also be a stand-alone and/or there will be a rewards
              and recognition page.
            </p>
          </div>
        </div>
      </div>
    );
  }
}
