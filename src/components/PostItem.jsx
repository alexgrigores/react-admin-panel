import React from 'react';
import './PostItem.css';

function PostItem(props) {
    const {userId, id, title, body} = props;

    return (
        <div className='containerPost'>
            <p><b>userId:</b> { userId }</p>
            <p><b>id:</b> { id }</p>
            <p><b>title:</b> { title }</p>
            <p><b>body:</b> { body }</p>
        </div>
    );
}

export default PostItem;