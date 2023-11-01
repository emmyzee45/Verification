import React, { useEffect, useState } from 'react';
import "./support.css";
import { useSelector } from 'react-redux';
import Crypto from '../../components/orders/crypto/Crypto';
import Fiat from '../../components/orders/fiat/Fiat';
import { makeRequest } from '../../axios';

const Support = () => {
  const [focus, setFocus] = useState(false);
  const [orders, setOrders] = useState([]);
  const user = useSelector((state) => state.user.currentUser);
  const crypto = orders?.filter((item) => item?.method?.toLowerCase() === "crypto");
  const fiat = orders?.filter((item) => item?.method?.toLowerCase() !== "crypto");
  
  const handleFiat = () => {
    setFocus(false);
  }
  const handleFocus = () => {
    setFocus(true)
  }

  useEffect(() => {
    const getOrders = async() => {
      try {
        const res = await makeRequest.get(`orders/${user._id}`);
        setOrders(res.data);
      }catch(err) {
        console.log(err);
      }
    }
    getOrders();
  }, [])
  
  return (
    <div className='supportContainer'>
        <div className="support-title">
            <h1 className="left-title">Support</h1>
            <button className="ticket">New Ticket</button>
        </div>
      <div className="supportTop">
        <button style={{ color: !focus ? "#121d4e": "black", borderBottom: !focus ? "3px solid #121d4e": "white"}} className="topButton" onClick={handleFiat}>Fiat</button>
        <button style={{ color: focus ? "#121d4e": "black", borderBottom: focus ? "3px solid #121d4e": "white"}} className="topButton" onClick={handleFocus}>Crypto</button>
      </div>
      <h2 className='supportheader'>{focus ? "Open": "Closed"} Tickets</h2>
      {focus ? <Crypto orders={crypto} />: <Fiat orders={fiat} />}
    </div>
  );
}

export default Support;
