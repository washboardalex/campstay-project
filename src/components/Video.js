import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import { getVideoAndComment, likeVideo } from '../_redux/actions';
import NewComment from './NewComment';
import CommentsList from './CommentsList';
import Loading from './Loading';
import VideoPlayer from './VideoPlayer';

const mapStateToProps = (state) => {
    const { video, comments, likes, loading, hasLiked } = state.getVideoAndComment
    return {
        video, comments, likes, loading, hasLiked
    }
  }
  
  const mapDispatchToProps = (dispatch) => {
    return ({
        getVideoAndComment: (videoId) => dispatch(getVideoAndComment(videoId)),
        likeVideo: () => dispatch(likeVideo())
    });
  }
  

class Video extends Component {

    componentDidMount() {
        window.scrollTo(0,0);

        const { video, getVideoAndComment } = this.props;
        const { videoId } = this.props.match.params;
        ((Object.entries(video).length === 0 && video.constructor === Object) || videoId !== video.id)
            && getVideoAndComment(videoId);
    }

    // titleCase = (str) => {
    //     let splitStr = str.toLowerCase().split(' ');
    //     for (let i = 0; i < splitStr.length; i++) {
    //         splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
    //     }
    //     return splitStr.join(' '); 
    //  }
       

    render() { 
        const { comments, likes, likeVideo, hasLiked, loading } = this.props;
        const { title, size, url, userId } = this.props.video;

        return (
            <div style={{margin:'25px'}}>
                {loading
                    ? 
                    <div className='fll-pg-ld'>
                        <Loading text={'Loading'} />
                    </div>
                    :
                    <Fragment>
                        <div className='row mgn-crct center'>
                            <div>
                                <VideoPlayer
                                    title={title}
                                    size={size}
                                    url={url}
                                    userId={userId}
                                />
                            </div>
                        </div>
                        <div style={{marginLeft:'10px', marginBottom:'10px'}} className='row mgn-crct'>
                            <div className='col-12'>
                                <span><button onClick={likeVideo}>Like This!</button> {likes} likes</span>
                            </div>
                            <div className='col-12'>
                                <span style={{marginLeft:'-10px'}}> {hasLiked && 'Thanks!' } </span>
                            </div>
                        </div>
                        <div className="row mgn-crct">
                            <h1 style={{borderBottom:'1px solid black', width:'100%', marginBottom:'25px'}}>Comments</h1>
                        </div>
                        <div className='drctn-col' >
                            <div style={{width:'70%'}}>
                                <div className='row mgn-crct'>
                                    <NewComment />
                                    <CommentsList comments={comments} />
                                </div>
                            </div>
                        </div>
                    </Fragment>
                }  
            </div>
        );
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Video);