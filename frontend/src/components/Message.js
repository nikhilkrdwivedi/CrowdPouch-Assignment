import React from 'react';

const Message = ({ msg }) => {
    return (
        <div className="text-center" style={{margin:"0.5rem 1rem", fontSize: '14px'}}>
            {msg.status === 'Success' ?
            <strong style={{color: 'green'}}><span>Success response</span>: </strong> :
            <strong style={{color: 'green'}}><span style={{color: 'red'}}>Error</span>/<span style={{color: 'orange'}}>Warning</span>: </strong> }
            {msg.text}
        </div>
    );
};

export default Message;