import React from 'react';

const Message = ({message}) => {
  const display = ( message.type === 0 || message.type === 1 ) ? { display: 'block' } : { display: 'none' };
  const className = ( message.type === 1 ) ? 'alert alert-success': 'alert alert-danger';
  return (
    <div className="Message" style={ display } >
      <div className="container">
          <div className={ className } role="alert" >
              { message.desc }
          </div>
      </div>
    </div>
  );
}

export default Message;
