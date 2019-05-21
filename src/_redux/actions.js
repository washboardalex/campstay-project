import { 
    GET_VIDEOS_PENDING, 
    GET_VIDEOS_SUCCESS, 
    GET_VIDEOS_FAILED, 
    GET_VIDEO_FAILED,
    GET_VIDEO_PENDING,
    GET_VIDEO_SUCCESS,
    NEW_COMMENT_CHANGE,
    PUBLISH_NEW_COMMENT,
    GET_USER_INFO_PENDING,
    GET_USER_INFO_SUCCESS,
    GET_USER_INFO_FAILED,
    LIKE_VIDEO,
    API_URL 
} from './constants';
import { apiCall } from '../_api/api';

export const getData = (request) => (dispatch) => {
    dispatch({ type: GET_VIDEOS_PENDING });
    apiCall(`${API_URL}/${request}`)
        .then(data => {
            dispatch({ type: GET_VIDEOS_SUCCESS, payload: data });
        })
        .catch(error => dispatch({ type: GET_VIDEOS_FAILED, payload: error }));
}

export const getVideoAndComment = (videoId) => (dispatch) => {
    dispatch({ type: GET_VIDEO_PENDING });
    apiCall(`${API_URL}/videos/${videoId}`)
        .then(data => {
            const video = data;
            apiCall(`${API_URL}/comments?videoId=${videoId}`)
                .then(data => {
                    const comments = data;
                    dispatch({ type: GET_VIDEO_SUCCESS, payload: {video, comments}  });
                })
                .catch(error => dispatch({ type: GET_VIDEO_FAILED, payload: error }));
        })
        .catch(error => dispatch({ type: GET_VIDEO_FAILED, payload: error }));
}

export const getUserInfo = (userId) => (dispatch) => {
    dispatch({type: GET_USER_INFO_PENDING})
    apiCall(`${API_URL}/comments?userId=${userId}`)
        .then(data => {
            const comments = data;
            apiCall(`${API_URL}/videos/?userId=${userId}`)
                .then(data => {
                    const videos = data;
                    const userInfo = { comments, videos }
                    dispatch({type: GET_USER_INFO_SUCCESS, payload: userInfo })
                })
                .catch(error => dispatch({ type: GET_USER_INFO_FAILED, payload: error }));
        })
        .catch(error => dispatch({ type: GET_USER_INFO_FAILED, payload: error }));
}

export const newCommentChange = (field, value) => ({ type: NEW_COMMENT_CHANGE, payload: { field, value } })

export const publishNewComment = () => ({type: PUBLISH_NEW_COMMENT })

export const likeVideo = () => ({type: LIKE_VIDEO})