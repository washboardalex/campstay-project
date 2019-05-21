import React, { Fragment } from 'react';

const VideoPlayer = ({title, size, url, userId}) => (
    <Fragment>
        <h1>{title}</h1>
        <video width="100%" controls>
            <source src={url} type="video/mp4" />
            Your browser does not support the video tag.
        </video>
        <p>Size: {size/1000} megabytes</p>
        <p>Uploaded By: User {userId}</p>

    </Fragment>
)

export default VideoPlayer;