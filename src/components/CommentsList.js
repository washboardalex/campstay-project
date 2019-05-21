import React from 'react';

const CommentsList = ({comments}) => (
    <div style={{marginBottom:''}} className='row'>
        {comments.map(({name, email, body}, index) => (
            <div key={index} style={{paddingBottom:'25px', paddingTop:'25px', borderTop:'1px solid black'}} className='col-12'>
                <h5>{name}</h5>
                <h5>{email}</h5>
                <p>{body}</p>
            </div>
        ))}
    </div>
)

export default CommentsList;