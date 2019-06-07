import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import { getData } from '../_redux/actions';
import VideoList from './VideosList';
import Loading from './Loading';
import logo from '../static/logo.jpg';

const mapStateToProps = (state) => {
  const { videos, loading } = state.getVideos;
  return {
    videos, loading
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getData: (request) => dispatch(getData(request)),
  }
}

class Home extends Component {

  componentDidMount() {
    const { videos, getData } = this.props;

    videos.length < 1 && getData('videos');
  }

  render() {
    const {videos,loading } = this.props;

    return (
      <Fragment>
        <div className='stdrd-margin row'>
          <div className='center col-12'>
            <h1 style={{height:'100%', width:'100%'}} className='mn-hdng center' >NotYoutube</h1>
          </div>
          <div className='center cntr-mdl col-12'>
            <img src={logo} className='auth-img'alt='logo?' />
          </div>
        </div>
        <div className='center row'>
          <div style={{ width:'70%'}} >
            <div style={{marginTop:'50px', marginBottom:'10px'}} className='center col-12'><h1>Videos Ya Mug! I changed this file! And it's changed again in New Zealand!</h1></div>
            <VideoList videos={videos} />
          </div>
          { loading === true && <div className='stdrd-margin center col-12'><Loading text={'Loading'} /></div> }
        </div>
      </Fragment>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);