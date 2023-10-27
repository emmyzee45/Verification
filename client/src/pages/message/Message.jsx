import React from 'react';
import "./message.css";

const Message = () => {
  return (
    <div className='messageContainer'>
      <h1 className="messageTitle">Latest Messages</h1>
      <table>
        <thead>
          <tr>
          <td>Line Type</td>
          <td>Service</td>
          <td>Line Number</td>
          <td>Message</td>
          <td>Sent From</td>
          <td>Timestamp</td>
          <td>Actions</td>
          </tr>
        </thead>
        <tbody>
          <tr className='messageItems'>
            <td className="messageItem">Temperary Line</td>
            <td className="messageItem">Amazon</td>
            <td className="messageItem">5352332142</td>
            <td className="messageItem text">
              Below is your code you can do any thing what within 
              the time interval given 3534
            </td>
            <td className="messageItem">Amazon</td>
            <td className="messageItem">24/04/5554: 03:23:00</td>
            <td className="messageItem">
              <button className='action'>Action</button>
              <button className='action'>Action</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Message;
