import React from 'react';

import { Link } from 'react-router-dom';

const CommentsList = ({comments}) => {
    return (
        <div  className='row'>
            {comments.map(({body, date, userId}, index) => (
                <div key={index} style={{paddingBottom:'25px', paddingTop:'25px', borderTop:'1px solid black'}} className='col-12'>
                    <h5>Posted By: User <Link to={`/users/${userId}`}>{userId}</Link></h5>
                    <h5>Date: {date}</h5>
                    <p>{body}</p>
                </div>
            ))}
        </div>
    )
}

export default CommentsList;