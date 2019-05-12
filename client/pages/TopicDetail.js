import React, { Component } from 'react';
import { FadeLoader } from 'react-spinners';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Actions from '../actions/topicsAction';
import API_URL from '../config/API_URL';
import small_profile from '../public/jocallio/image/small_profile.png';
import profileplaceholder from '../public/jocallio/image/profileplaceholder.png';
class TopicDetail extends Component {
  componentWillMount(){
    const { topic, dispatch, match, productDetail } = this.props;
    if(!this.props.location.state){
      dispatch(Actions.getTopicDetail(match.params.topicID));
    }

  }

  render() {
    const override = 'display: block;margin: 0 auto;border-color: red;';
    const {productDetail, topic}=this.props;
    
    return (<div>
      {topic.fetching && 
            <FadeLoader
                css={override}
                sizeUnit={"px"}
                size={150}
                color={'#123abc'}
                loading={true}
              />
              }
       {topic.fetched && 
      <main className="main">
        <section className="Contracts shadowbox">
          <h2>Topic: {topic.text}</h2>
          <h2>people that have included this topic in their {topic.type} </h2>

            <div className="toggle tabs tabs_default TabSecond" >
                  
                 
                    <div id='tab-3'>
                        <table>
                          <thead>
                            <tr>
                              <th>Name</th>
                              <th>Current situation</th>
                              <th></th>
                            </tr>
                          </thead>
                          <tbody>
                          {topic._userIds.map((user, index) => {
                            if(user.image==null)
    var profile_img=profileplaceholder;
    else
                            var profile_img = API_URL.API_URL+'/public/'+user._id+'/profile/'+user.image;
                  return (
                            <tr key={user._id} onClick={() => this.props.history.push('/'+user.name)}>
                              <td>{user.name}</td>
                              <td>{user.current_situation}</td>
                              <td>
                                  <div className="profile"><img src={profile_img} alt="image" /></div>
                                 
                                  <a href="" className="view" title="view">view</a>

                              </td>
                            </tr>)}).reverse()}
                           
                          </tbody>
                        </table>

                        </div>
                    
                 
                </div>
        </section>
      </main>}       
      </div>
    )
  }
}
export default connect(
  state => ({
    topic:state.topic
  })
)(TopicDetail);