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
} from './constants';

const initStateHome = {
    videos: [],
    loading: true,
}

export const getVideos = (state=initStateHome, action={}) => {
    switch (action.type) {
        case GET_VIDEOS_PENDING:
            return { ...state, loading: true };
        case GET_VIDEOS_SUCCESS:
            return { ...state, loading: false, videos: state.videos.concat(action.payload) };
        case GET_VIDEOS_FAILED:
            return { ...state, loading: false, error: action.payload };
        default:
          return state
      }
}

const initStateVideo = {
    video: {},
    comments:[],
    hasLiked: false,
    loading: true,
    likes: 10, //Math.floor(Math.random()*20)
    newCommentName: '',
    newCommentEmail: '',
    newCommentText: ''
}

export const getVideoAndComment = (state=initStateVideo, action={}) => {
    switch(action.type) {
        case GET_VIDEO_PENDING:
            return { ...state, loading: true };
        case GET_VIDEO_SUCCESS:
            const {video, comments} = action.payload;
            return { ...state, loading: false, video, comments }
        case GET_VIDEO_FAILED:
            return { ...state, loading: false, error: action.payload };
        case NEW_COMMENT_CHANGE:
            return { ...state, [action.payload.field]: action.payload.value}
        case PUBLISH_NEW_COMMENT:
            const { newCommentName, newCommentEmail, newCommentText } = state;
            if ( newCommentName !== '' && newCommentEmail !== '' && newCommentText !== '' ) {
                const comment =[{
                    videoId: parseInt(state.id,10),
                    id: state.comments.length + 1,
                    name: newCommentName,
                    email: newCommentEmail,
                    body: newCommentText
                }]
                const comments = state.comments.concat(comment)
                return { ...state, comments, newCommentName: '', newCommentEmail:'', newCommentText:'' } 
            } else {
                return state;
            }
        case LIKE_VIDEO:
            if (state.hasLiked === true) {
                return state
            } 
            return { ...state, likes: state.likes + 1, hasLiked: true }
        default:
          return state;
    }
}

const initStateUser = {
    id: null,
    videos: [],
    comments: [],
    loading: true
}

export const getUserInfo = (state=initStateUser, action={}) => {
    switch(action.type) {
        case GET_USER_INFO_PENDING:
            return { ...state, loading: true };
        case GET_USER_INFO_SUCCESS:
            console.log(action.payload)
            const {videos, comments} = action.payload;
            return { ...state, loading: false, videos, comments }
        case GET_USER_INFO_FAILED:
            return { ...state, loading: false, error: action.payload };
        default:
          return state;
    }
} 