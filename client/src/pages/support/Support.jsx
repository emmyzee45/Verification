import React from 'react';
import "./support.css";
import { Link } from "react-router-dom";

const Support = () => {
  return (
    <div className='supportContainer'>
      <div className='heading'>
        <h1 className="supportTitle">Support</h1>
        <button className="subButt">New Ticket</button>
      </div>

      <div className='tickets'>
        <div>
          <Link to={`/support`}>
            Open
          </Link>
        </div>
        <div>
          <Link to={`/support`}>
            Closed
          </Link>
        </div>
      </div>

      <div className='openTickets'>
        <div className='listDetail'>
          <h1> Open Tickets</h1>
          A list of open tickets associated with your account.
        </div>
        <div className='navButton'>
          <button  className='actionButton'>First</button>
          <button  className='actionButton'>Last</button>
        </div>
      </div>

      <table className='tableData'>
        <thead>
          <tr>
            <td>Updated (UTC)</td>
            <td>Site</td>
            <td>Subject</td>
            <td>Action(s)</td>
          </tr>
        </thead>
        <tbody>
          <tr className='messageItems'>
            <td className="messageItem">Oct 21 06:57</td>
            <td className="messageItem">PB</td>
            <td className="messageItem">API Integration</td>
            <td className='action'>
              <button className='actionButton'>View</button>
              <button className='actionButton'>Close</button>
              <button className='actionButton'>Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Support;
