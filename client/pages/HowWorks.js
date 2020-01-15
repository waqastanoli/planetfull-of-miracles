import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Action from "../actions/cartActions";
import example_profile from "../public/jocallio/image/example_profile.jpg";
import resume_sm from "../public/jocallio/image/HowItWorks/resume-sm-300x194.jpg";
import dream_sm from "../public/jocallio/image/HowItWorks/dream-sm-300x231.jpg";
import family_sm from "../public/jocallio/image/HowItWorks/family_sm-300x180.jpg";
import sky_dive_circle_teamwork from "../public/jocallio/image/HowItWorks/sky_dive_circle_teamwork-300x195.jpeg";
import teaching_sm from "../public/jocallio/image/HowItWorks/teaching_sm-300x193.jpg";
import matches_sm from "../public/jocallio/image/HowItWorks/matches_sm-300x192.jpg";
import advisory_team from "../public/jocallio/image/HowItWorks/advisory-team-2-300x190.jpg";

import proud_chart_sm from "../public/jocallio/image/HowItWorks/proud-chart_sm-300x216.png";
import earth_sm from "../public/jocallio/image/HowItWorks/earth_sm-300x194.jpg";

import awards_sm from "../public/jocallio/image/HowItWorks/awards_sm-300x194.jpg";

import flowchart from "../public/jocallio/image/HowItWorks/flowchart-768x1024.jpg";

export default class HowWorks extends Component {
  render() {
    return (
      <div className="page-style">
        <p>
          <strong>
            <span className="heading_how_it_works">
              How Planetful of Miracles (POM) Works
            </span>
          </strong>
        </p>
        <div className="hiw-section">
          <p>
            PlanetfulofMiracles (“PoM“) TV Show and the TECK CHI website is all
            about collaborating together to make a lasting positive impact. We
            combine the reach of Television and the power of the Internet to
            significantly improve your life while empowering current and future
            generations.There will be a special section for youth.
            <br />
            <br />
            Using TECK CHI as a springboard you can transform your unique skills
            into money-making endeavors. With the influential forces of TV,
            watched more than ever, but viewed on a variety of devices, we use
            the Internet to include your unique stories, expertise and voice.
            One full segment of the TV show is dedicated to the input and
            outcomes of those who participate through our website.
          </p>
          <div className="block_hiw">
            <p>
              <img
                className="size-medium wp-image-3814 alignleft"
                src={resume_sm}
                alt=""
                width="300"
                height="194"
              />
              1.{" "}
              <strong>
                <span className="hiw-title">CV (traditional resume)</span>
              </strong>{" "}
              is optional and is your standard job/work related information
              including history and education etc OR{" "}
              <em>Personal and pertinent information about your life</em>
            </p>
          </div>
          <div className="block_hiw">
            <p>
              <img
                className="size-medium wp-image-3816 alignleft"
                src={dream_sm}
                alt=""
                width="300"
                height="231"
              />
              2.{" "}
              <strong>
                <span className="hiw-title">CV ME (or REAL ME)</span>
              </strong>{" "}
              is who or what you desire and aspire to be and a statement of
              desired goals now and future.
            </p>
            <p>
              You can input your real abilities and talents. It’s who you are
              inside. It’s the person beyond your “regular job”: A description
              of how you’re underutilized or unrecognized and what you want to
              do and would love to do and are really capable of given the
              chance: A statement of what you should really be doing. Your
              brilliance can shine through here. Attachments can include photos
              or videos of those you love, friends, hobbies, favorite things for
              fun and/or photos of what you want to have in the future.
            </p>
          </div>
          <div className="block_hiw">
            <p>
              <img
                className="size-medium wp-image-3833 alignleft"
                src={family_sm}
                alt=""
                width="300"
                height="180"
              />
              3.
              <strong>
                {" "}
                P.E.P. –{" "}
                <span className="hiw-title">
                  Finding your PASSION, ESSENTIALS and PURPOSE
                </span>
              </strong>{" "}
              is encouraged here. It offers help and guidance, no matter what
              age or current position you’re in now, to find out who the best
              you really is. It helps to define what you need to do to be truly
              happy and fulfilled. It offers various methods from a
              questionnaire to personality and psychological tests of self
              examination etc. If you already know what you want and who you are
              and why, this step can be skipped. If you live in the present,
              learn from the past and can also consciously design your future
              and be happy, you’re in pretty good shape. The goal is to
              understand how you wish to be and see yourself as the future best
              you and get on the path to be there – for yourself and the world
              around you we have many affiliates to help you.{" "}
              <a href="/page/pep" target="_blank">
                LEARN MORE
              </a>
            </p>
          </div>
          <div className="block_hiw">
            <p>
              <img
                className="size-medium wp-image-3826 alignleft"
                src={sky_dive_circle_teamwork}
                alt=""
                width="300"
                height="195"
              />
              4.
              <strong>
                {" "}
                <span className="hiw-title">SOLO or TEAM</span>{" "}
              </strong>
              – Decide whether you want to join with other groups interested in
              the same subjects as yourself which are already established:
              university’s, consortiums, groups etc. If you have an invention,
              intellectual property, or are a solo artist etc. you may not need
              to find a team to collaborate with.{" "}
              <a href="/page/SoloTeam" target="_blank">
                LEARN MORE
              </a>
            </p>
          </div>
          <div className="block_hiw">
            <p>
              <img
                className="size-medium wp-image-3824 alignleft"
                src={teaching_sm}
                alt=""
                width="300"
                height="193"
              />
              5a.{" "}
              <strong>
                <span className="hiw-title">
                  ASPIRE (learn) and INSPIRE (teach) columns
                </span>
              </strong>{" "}
              – Here you can choose from one or both categories: ASPIRE (learn)
              or INSPIRE (teach) lists. This will decide who your TECK CHI*
              matches will be, those who contract with you to learn or teach a
              subject. We can set you up to teach or learn from one or more many
              people, and profit greatly doing what you know and/or love.
              Reviews are encouraged and rewarded.
            </p>
          </div>
          <div className="block_hiw">
            <p>
              <img
                className="size-medium wp-image-3822 alignleft"
                src={matches_sm}
                alt=""
                width="300"
                height="192"
              />
              5b.{" "}
              <strong>
                <span className="hiw-title">TECK CHI</span>
              </strong>{" "}
              happens when you find the match you need to help further your
              goals. You may search the database or the site can automatically
              choose your matches from the ASPIRE (learn) or INSPIRE (teach)
              lists. A review and reward process takes place. The better your
              reviews, which others can view, the more connections/contracts you
              can make. You can collect or give away Kudos Coins. Some
              connections are free, some are for barter and others for a
              designated fee. We can connect you with groups of people who want
              your TECK CHI!
            </p>
            <p>
              T – <strong>T</strong>ime/<strong>T</strong>alent
              <br />E – <strong>E</strong>xperience/<strong>E</strong>xpertise
              <br />C – <strong>C</strong>reative/<strong>C</strong>onnect
              <br />K – <strong>K</strong>nowledge/<strong>K</strong>udos
            </p>
            <p className="unique_case">
              C – <strong>C</strong>ommunicate/<strong>C</strong>oach
              <br />H – <strong>H</strong>elp/<strong>H</strong>eroi
              <strong>c</strong>
              <br />I – <strong>I</strong>mpact/<strong>I</strong>nnovate
              <br />
              <br />
              <a href="/page/TECK" target="_blank">
                LEARN MORE
              </a>
            </p>
          </div>
          <div className="block_hiw">
            <p>
              <img
                className="size-medium wp-image-3812 alignleft"
                src={advisory_team}
                alt=""
                width="300"
                height="190"
              />
              6.{" "}
              <strong>
                <span className="hiw-title">ADVISORY TEAM</span>
              </strong>{" "}
              – a group of professionals, authorities and experts in their field
              who can assist guide direct or network with you. THEY ARE :
              AUTHORITIES OR PROFESSIONALS IN THEIR FIELDS WHO HAVE EXPRESSED A
              FORM OF EXTREME INTEREST OR ENDORSEMENT OF THE TV SHOW AND
              INTERNET SITE IN THE PAST OR CURRENTLY, AND ARE IN ALIGNMENT WITH
              THE PROJECT BY INTENTION, PURPOSE, OBJECTIVE AND PHILOSOPHY. They
              can help you to become a leader, monetize, or otherwise jump start
              your vision of intended greatness. (Future set up) They are in
              alignment with the principles and goals of PoM.{" "}
              <a href="/page/AdvisoryTeam" target="_blank">
                LEARN MORE
              </a>
            </p>
          </div>
          <div className="block_hiw">
            <p>
              <img
                className="size-medium wp-image-3818 alignleft"
                src={earth_sm}
                alt=""
                width="300"
                height="194"
              />
              7.{" "}
              <strong>
                <span className="hiw-title">
                  PRESSING ISSUES OF HUMANITY (or Issue de jour)
                </span>
              </strong>{" "}
              offers the basic world challenges you may wish to solve or
              contribute to solving. We suggest the most basic and obvious but
              original causes and solution, deals or results are encouraged.{" "}
              <a href="/page/Press" target="_new">
                LEARN MORE
              </a>
            </p>
          </div>
          <div className="block_hiw">
            <p>
              <img
                className="size-medium wp-image-3828 alignleft"
                src={proud_chart_sm}
                alt=""
                width="300"
                height="216"
              />
              8.{" "}
              <strong>
                <span className="hiw-title">
                  The P.R.O.U.D. CHART (Progress Report of Ur Day(s))
                </span>
              </strong>{" "}
              – is a simple method of monitoring your weekly, monthly or yearly
              progress: Several charts can be designed and personalized for any
              of your needs or goals whether broad, general or specific.
            </p>
            <p>
              It is beneficial and important for all age groups from Baby
              Boomers and Millennials to Gen X, Y, Z and Alpha. Kids 16 and
              under to have specialized PROUD Chart formats for themselves
              and/or their parents to keep track of involvement, advancement and
              progress.
            </p>
          </div>

          <div className="block_hiw">
            <p>
              <img
                className="size-medium wp-image-3820 alignleft"
                src={awards_sm}
                alt=""
                width="300"
                height="194"
              />
              9.{" "}
              <strong>
                <span className="hiw-title">REWARDS and RECOGNITION</span>
              </strong>{" "}
              – Further, we highlight those who excel or help to solve Pressing
              Issues of Humanity, with valuable rewards and recognition
              including TV exposure on our sister show. Segment 3 is solely
              dedicated to the input and outcome of the Internet success
              stories. The TECK CHI website can also be a stand-alone: there
              will be a rewards and recognition page.
            </p>
          </div>
        </div>
        <p>&nbsp;</p>
        <p>
          <strong>
            <span className="heading_how_it_works">OVERALL FLOWCHART</span>
          </strong>
        </p>

        <div className="block_hiw">
          <img
            className="wp-image-3830 size-large alignleft"
            src={flowchart}
            alt=""
            width="768"
            height="1024"
            srcSet={`${flowchart} 768w, ${flowchart} 225w`}
            sizes="(max-width: 768px) 100vw, 768px"
          />
        </div>

        <p style={{ clear: "both" }}>(PATENT PENDING)</p>
        <p>
          <strong>
            <span className="heading_how_it_works">EXAMPLE PROFILE</span>
          </strong>
        </p>
        <div className="block_hiw">
          <img
            className="alignnone wp-image-3838 size-full"
            src={example_profile}
            alt=""
            width="543"
            height="703"
            srcSet={`${example_profile} 543w, ${example_profile} 232w`}
            sizes="(max-width: 543px) 100vw, 543px"
          />
        </div>
        <div className="clearfix"></div>

        <p style={{ marginTop: "15px" }}>
          * © C.L. Morci 917-940-8170. Planetful of Miracles is a subsidiary of
          MIRACULOUS MEDIA ENTERPRISE, a Clearing House for Positivity. We
          collaborate towards making a positive impact both personally and
          globally. MORCILING, INC.
        </p>
        <div className="clearfix"></div>
        <div className="page-single-pagination"></div>
      </div>
    );
  }
}
