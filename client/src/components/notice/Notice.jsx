import React from 'react';
import "./notice.css";

const Notice = ({message}) => {
  return (
    <marquee className='notice-container'>
      {message}
    </marquee>
  );
}

export default Notice;
