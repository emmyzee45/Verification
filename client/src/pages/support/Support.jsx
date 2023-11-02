import React, { useEffect, useState } from 'react';
import "./support.css";
import { useSelector } from 'react-redux';
import { makeRequest } from '../../axios';
import Supports from '../../components/support/Support';
import Form from '../../components/ticket/form/Form';

const Support = () => {
  const [focus, setFocus] = useState(false);
  const [tickets, setTickets] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const user = useSelector((state) => state.user.currentUser);
  const openTicket = tickets?.filter((item) => item?.status?.toLowerCase() === "open");
  const closeTicket = tickets?.filter((item) => item?.status?.toLowerCase() === "close");
  
  const handleFiat = () => {
    setFocus(false);
  }
  const handleFocus = () => {
    setFocus(true)
  }

  const handleOPenForm = () => {
    setOpenForm(true)
  }

  useEffect(() => {
    const getTickets = async() => {
      try {
        const res = await makeRequest.get(`tickets/${user?._id}`);
        setTickets(res.data);
      }catch(err) {
        // console.log(err);
      }
    }
    getTickets();
  }, [user])

  return (
    <div className='supportContainer'>
        <div className="support-title">
            <h1 className="left-title">Support</h1>
            <button className="ticket" onClick={handleOPenForm}>New Ticket</button>
        </div>
      <div className="supportTop">
        <button style={{ color: !focus ? "#121d4e": "black", borderBottom: !focus ? "3px solid #121d4e": "white"}} className="topButton" onClick={handleFiat}>Open</button>
        <button style={{ color: focus ? "#121d4e": "black", borderBottom: focus ? "3px solid #121d4e": "white"}} className="topButton" onClick={handleFocus}>Closed</button>
      </div>
      <h2 className='supportheader'>{!focus ? "Open": "Closed"} Tickets</h2>
      {!focus ? (
        <Supports tickets={openTicket}/>
      ):(
        <Supports tickets={closeTicket}/>
      )}
      { openForm && <Form  setOpenForm={setOpenForm} />}
    </div>
  );
}

export default Support;
