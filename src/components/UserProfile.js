import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import CommentsList from './CommentsList';
import VideosList from './VideosList';
import Loading from './Loading';
import { getUserInfo } from '../_redux/actions';


const mapStateToProps = (state) => {
    const { userId, videos, comments, loading } = state.getUserInfo;
    return {
        userId, videos, comments, loading
    }
  }

  const mapDispatchToProps = (dispatch) => {
    return {
        getUserInfo: (request) => dispatch(getUserInfo(request)),
    }
  }
  

class UserProfile extends Component {

    componentDidMount() {
        const { id, getUserInfo } = this.props;
        const { userId } = this.props.match.params;

        ( id === null || id !== userId ) && getUserInfo(userId);

    }
    
    render() {
        const { videos, comments, loading } = this.props;
        const { userId } = this.props.match.params;

        return (
            <div className='row'>
                {loading
                    ? 
                    <div className='fll-pg-ld'>
                        <Loading text={'Loading'} />
                    </div>
                    :
                    <Fragment>
                        <div className='col-12 center'>
                            <h1>User {userId}</h1>
                        </div>
                        <div className='col-lg-6 col-md-12'>
                            <h3>User {userId}'s Videos</h3>
                            <VideosList videos={videos} />
                        </div>
                        <div className='col-lg-6 col-md-12'>
                            <h3>User {userId}'s Comments</h3>
                            <CommentsList comments={comments} />
                        </div>
                    </Fragment>
                }  
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);