import React from 'react';
import { Link } from 'react-router-dom';

const VideosList = ({videos}) =>  {
     return (
        <div style={{ paddingTop:'50px'}} className='col-12'>
            {videos && videos.map(({ title, description, userId, id }) => (
                <div style={{marginBottom:'50px'}} key={id}>
                    <Link to={`/videos/${id}`}><h5>{title}</h5></Link>
                    <p>Description: {description}</p>
                    <p>Thanks to user: <Link to={`/users/${userId}`}>{userId}</Link></p>
                </div>
            ))}
        </div>
    )
}

export default VideosList;