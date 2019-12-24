import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
export default class TECK extends Component {
  render() {
    return (
      <div className="main logged_in">
        <div className="page-style paddintop15">
          <p>
            <strong>
              <span className="heading_how_it_works">T.E.C.K. C.H.I</span>
            </strong>
          </p>
          <div className="hiw-section">
            <p>
              Using PoM as a springboard, you can transform your unique skills
              into money-making endeavors as we join you to people or groups who
              want what you have to give. Your TECK CHI skills are a valuable
              currency.
              <br />
              <br />
              We capture and expand your golden opportunities, and make them
              accessible to others by having you reach and teach someone or many
              others.
            </p>
          </div>
        </div>
      </div>
    );
  }
}
