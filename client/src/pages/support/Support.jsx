import React, { useEffect, useState } from 'react';
import "./support.css";
import { useDispatch, useSelector } from 'react-redux';
import { makeRequest } from '../../axios';
import Supports from '../../components/support/Support';
import Form from '../../components/ticket/form/Form';
import { getTicketFailure, getTicketStart, getTicketSuccess } from '../../redux/redux-slices/ticketSlice';
import { useLocation, useNavigate } from 'react-router-dom';
import { logOutSuccess } from '../../redux/redux-slices/UserSlice';
import Footer from '../../components/footer/Footer';

const Support = () => {
  const [focus, setFocus] = useState(false);
  const [openForm, setOpenForm] = useState(false);

  const user = useSelector((state) => state.user.currentUser);
  const tickets = useSelector((state) => state.ticket.tickets);
  const isAuthenticated = useSelector((state) => state.user.isLoggedIn);
  const openTicket = tickets?.filter((item) => item?.status?.toLowerCase() === "open");
  const closeTicket = tickets?.filter((item) => item?.status?.toLowerCase() === "closed");
  
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const location = useLocation();


  useEffect(() => {
    !isAuthenticated && navigate('/login', { state: { from: location }, replace: true })
  }, [isAuthenticated])

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
      dispatch(getTicketStart())
      try {
        const res = await makeRequest.get(`tickets/${user?._id}`);
        dispatch(getTicketSuccess(res.data))
      }catch(err) {
        if (err.response?.status === 401) {
        dispatch(logOutSuccess());
        dispatch(getTicketFailure())
        navigate('/login', { state: { from: location }, replace: true });
      } else {
          dispatch(getTicketFailure())
      }
        // console.log(err);
      }
    }
    getTickets();
  }, [user])

  return (
    <>
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
    <Footer />
    </>
  );
}

export default Support;
