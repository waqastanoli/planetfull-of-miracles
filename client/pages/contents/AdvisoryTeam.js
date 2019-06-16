import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import christine from '../../public/jocallio/image/Advisory/christine-m.png';

import chris from '../../public/jocallio/image/Advisory/chris-lemmon.png';

import justin from '../../public/jocallio/image/Advisory/justin-prust.jpg';

import lorraine from '../../public/jocallio/image/Advisory/lorraine-ling.png';

import jeff from '../../public/jocallio/image/Advisory/jeff-spaulding.png';

import craig from '../../public/jocallio/image/Advisory/craig-curcio.png';

import tim from '../../public/jocallio/image/Advisory/tim-hurja.png';

import allison from '../../public/jocallio/image/Advisory/allison-dollar.png';

import ed_manetta from '../../public/jocallio/image/Advisory/ed-manetta.png';

export default class AdvisoryTeam extends Component {
  render() {
    return (
      <div className="main logged_in">
       <div className="page-style paddintop15">
          <p><strong><span className='heading_how_it_works mg15'>ADVISORY TEAM AND FRIENDS OF POM</span></strong></p>
          <div className="hiw-section">
             <div className="col-sm-12">
                <div className="vc_row wpb_row vc_row-fluid">
                   <div className="wpb_column vc_column_container vc_col-sm-4">
                      <div className="vc_column-inner ">
                         <div className="wpb_wrapper">
                            <div className="wpb_text_column wpb_content_element ">
                               <div className="wpb_wrapper">
                                  <p><strong>C. L. Morci, Founder</strong></p>
                               </div>
                            </div>
                            <div className="wpb_single_image wpb_content_element vc_align_left">
                               <figure className="wpb_wrapper vc_figure">
                                  <div className="vc_single_image-wrapper   vc_box_border_grey"><img width="255" height="300" src={christine} className="vc_single_image-img attachment-full" alt=""/></div>
                               </figure>
                            </div>
                            <div className="wpb_text_column wpb_content_element ">
                               <div className="wpb_wrapper">
                                  <p>Combines the forces of TV and Internet to create opportunity and outcomes. Monetize your skills: Pay it forward.</p>
                               </div>
                            </div>
                         </div>
                      </div>
                   </div>
                   <div className="wpb_column vc_column_container vc_col-sm-4">
                      <div className="vc_column-inner ">
                         <div className="wpb_wrapper">
                            <div className="wpb_text_column wpb_content_element ">
                               <div className="wpb_wrapper">
                                  <p><strong>Christopher Lemmon</strong></p>
                               </div>
                            </div>
                            <div className="wpb_single_image wpb_content_element vc_align_left">
                               <figure className="wpb_wrapper vc_figure">
                                  <div className="vc_single_image-wrapper   vc_box_border_grey"><img width="244" height="299" src={chris} className="vc_single_image-img attachment-full" alt=""/></div>
                               </figure>
                            </div>
                            <div className="wpb_text_column wpb_content_element ">
                               <div className="wpb_wrapper">
                                  <p>Multi-talented actor, author, musician and producer (son of Jack Lemmon)</p>
                               </div>
                            </div>
                         </div>
                      </div>
                   </div>
                   <div className="wpb_column vc_column_container vc_col-sm-4">
                      <div className="vc_column-inner ">
                         <div className="wpb_wrapper">
                            <div className="wpb_text_column wpb_content_element ">
                               <div className="wpb_wrapper">
                                  <p><strong>Justin Prust<br/>
                                     </strong>
                                  </p>
                               </div>
                            </div>
                            <div className="wpb_single_image wpb_content_element vc_align_left">
                               <figure className="wpb_wrapper vc_figure">
                                  <div className="vc_single_image-wrapper   vc_box_border_grey"><img width="244" height="299" src={justin} className="vc_single_image-img attachment-full" alt=""/></div>
                               </figure>
                            </div>
                            <div className="wpb_text_column wpb_content_element ">
                               <div className="wpb_wrapper">
                                  <p>Justin Prust, MBA, CEO of Prust Inc., transforms Fortune 100 companies: implements Robotic Automation (RPA) and trains leaders and teams to motivate and innovate.</p>
                               </div>
                            </div>
                         </div>
                      </div>
                   </div>
                </div>
                <div className="vc_row wpb_row vc_row-fluid">
                   <div className="wpb_column vc_column_container vc_col-sm-4">
                      <div className="vc_column-inner ">
                         <div className="wpb_wrapper">
                            <div className="wpb_text_column wpb_content_element ">
                               <div className="wpb_wrapper">
                                  <p><strong>Lorraine B. Ling, Esq</strong><br/>
                                  </p>
                               </div>
                            </div>
                            <div className="wpb_single_image wpb_content_element vc_align_left">
                               <figure className="wpb_wrapper vc_figure">
                                  <div className="vc_single_image-wrapper   vc_box_border_grey"><img width="244" height="299" src={lorraine} className="vc_single_image-img attachment-full" alt=""/></div>
                               </figure>
                            </div>
                            <div className="wpb_text_column wpb_content_element ">
                               <div className="wpb_wrapper">
                                  <p>Patent Attorney, Corp. VP, M.S. Biology, M.A. English, B.A. Chemistry. Mindfulness certified.</p>
                               </div>
                            </div>
                         </div>
                      </div>
                   </div>
                   <div className="wpb_column vc_column_container vc_col-sm-4">
                      <div className="vc_column-inner ">
                         <div className="wpb_wrapper">
                            <div className="wpb_text_column wpb_content_element ">
                               <div className="wpb_wrapper">
                                  <p><strong>Jeff Spaulding</strong></p>
                               </div>
                            </div>
                            <div className="wpb_single_image wpb_content_element vc_align_left">
                               <figure className="wpb_wrapper vc_figure">
                                  <div className="vc_single_image-wrapper   vc_box_border_grey"><img width="252" height="298" src={jeff} className="vc_single_image-img attachment-full" alt=""/></div>
                               </figure>
                            </div>
                            <div className="wpb_text_column wpb_content_element ">
                               <div className="wpb_wrapper">
                                  <p>(MLB) TV & Film Director ('Babe Ruth', 'Derek Jeter', etc.), Exec Producer, consultant</p>
                               </div>
                            </div>
                         </div>
                      </div>
                   </div>
                   <div className="wpb_column vc_column_container vc_col-sm-4">
                      <div className="vc_column-inner ">
                         <div className="wpb_wrapper">
                            <div className="wpb_text_column wpb_content_element ">
                               <div className="wpb_wrapper">
                                  <p><strong>Craig S. Curcio, PHD<br/>
                                     </strong>
                                  </p>
                               </div>
                            </div>
                            <div className="wpb_single_image wpb_content_element vc_align_left">
                               <figure className="wpb_wrapper vc_figure">
                                  <div className="vc_single_image-wrapper   vc_box_border_grey"><img width="231" height="300" src={craig} className="vc_single_image-img attachment-full" alt=""/></div>
                               </figure>
                            </div>
                            <div className="wpb_text_column wpb_content_element ">
                               <div className="wpb_wrapper">
                                  <p>30 years Executive in Finance &amp; Business Development; business consultant &amp; entrepreneurial coach</p>
                               </div>
                            </div>
                         </div>
                      </div>
                   </div>
                </div>
                <div className="vc_row wpb_row vc_row-fluid" style={{float:'left'}}>
                   <div className="wpb_column vc_column_container vc_col-sm-4">
                      <div className="vc_column-inner ">
                         <div className="wpb_wrapper">
                            <div className="wpb_text_column wpb_content_element ">
                               <div className="wpb_wrapper">
                                  <p><strong>Timothy Hurja</strong></p>
                               </div>
                            </div>
                            <div className="wpb_single_image wpb_content_element vc_align_left">
                               <figure className="wpb_wrapper vc_figure">
                                  <div className="vc_single_image-wrapper   vc_box_border_grey"><img width="257" height="297" src={tim} className="vc_single_image-img attachment-full" alt=""/></div>
                               </figure>
                            </div>
                            <div className="wpb_text_column wpb_content_element ">
                               <div className="wpb_wrapper">
                                  <p>PGA Pro. Professional golf instructor to Tony Robbins. Results specialist and speaker TRI</p>
                               </div>
                            </div>
                         </div>
                      </div>
                   </div>
                   <div className="wpb_column vc_column_container vc_col-sm-4">
                      <div className="vc_column-inner ">
                         <div className="wpb_wrapper">
                            <div className="wpb_text_column wpb_content_element ">
                               <div className="wpb_wrapper">
                                  <p><strong>Allison Dollar</strong></p>
                               </div>
                            </div>
                            <div className="wpb_single_image wpb_content_element vc_align_left">
                               <figure className="wpb_wrapper vc_figure">
                                  <div className="vc_single_image-wrapper   vc_box_border_grey"><img width="251" height="298" src={allison} className="vc_single_image-img attachment-full" alt=""/></div>
                               </figure>
                            </div>
                            <div className="wpb_text_column wpb_content_element ">
                               <div className="wpb_wrapper">
                                  <p>CEO iTV Alliance of Silicon Valley. foremost authority in internet and TV interaction</p>
                               </div>
                            </div>
                         </div>
                      </div>
                   </div>
                   <div className="wpb_column vc_column_container vc_col-sm-4">
                      <div className="vc_column-inner ">
                         <div className="wpb_wrapper">
                            <div className="wpb_text_column wpb_content_element ">
                               <div className="wpb_wrapper">
                                  <p><strong>Ed Manetta<br/>
                                     </strong>
                                  </p>
                               </div>
                            </div>
                            <div className="wpb_single_image wpb_content_element vc_align_left">
                               <figure className="wpb_wrapper vc_figure">
                                  <div className="vc_single_image-wrapper   vc_box_border_grey"><img width="237" height="300" src={ed_manetta} className="vc_single_image-img attachment-full" alt=""/></div>
                               </figure>
                            </div>
                            <div className="wpb_text_column wpb_content_element ">
                               <div className="wpb_wrapper">
                                  <p>Director of Sports of the Barclay Bank Sports (Staples Arena) Center and Nassau Coliseum, of the East Coast; Executive Producer (Ret.)</p>
                               </div>
                            </div>
                         </div>
                      </div>
                   </div>
                </div>
             </div>
          </div>
       </div>
    </div>
    )
  }
}
