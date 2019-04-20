import React, { Component } from 'react';

export default class DescriptionTabs extends Component {
  render() {
    const {description} = this.props.product;
    return (
      <div className="row">
        <div className="col-sm-12">
          <ul className="nav nav-tabs nav-tabs-rel" id="myTab" role="tablist">
            <li className="nav-item">
              <a className="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Description</a>
            </li>
            {/*<li className="nav-item">
                          <a className="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Customer Review</a>
                        </li>*/}
            {/*<li className="nav-item">
                          <a className="nav-link" id="contact-tab" data-toggle="tab" href="#contact" role="tab" aria-controls="contact" aria-selected="false">Product Tags</a>
                        </li>*/}
          </ul>
          <div className="tab-content" id="myTabContent">
            <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
              {description}
            </div>
            <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
              Maecenas eget venenatis leo. Nulla lobortis bibendum arcu, eget finibus lectus eleifend quis. Quisque pulvinar dapibus massa, ac accumsan justo feugiat sit amet. Nunc nec enim commodo, finibus diam non, hendrerit ligula. Integer porttitor sapien sit amet vehicula tristique. Fusce semper elit ut ipsum volutpat, id iaculis augue convallis. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed tempor augue sit amet libero condimentum commodo. Nullam laoreet feugiat arcu vel sagittis. In volutpat velit elit, et varius mi ullamcorper vitae. Suspendisse suscipit vestibulum leo quis eleifend. 
            </div>
            <div className="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">
              Maecenas eget venenatis leo. Nulla lobortis bibendum arcu, eget finibus lectus eleifend quis. Quisque pulvinar dapibus massa, ac accumsan justo feugiat sit amet. Nunc nec enim commodo, finibus diam non, hendrerit ligula. Integer porttitor sapien sit amet vehicula tristique. Fusce semper elit ut ipsum volutpat, id iaculis augue convallis. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed tempor augue sit amet libero condimentum commodo. Nullam laoreet feugiat arcu vel sagittis. In volutpat velit elit, et varius mi ullamcorper vitae. Suspendisse suscipit vestibulum leo quis eleifend. 
            </div>
          </div>
        </div>
      </div>
    )
  }
}