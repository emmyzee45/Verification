import React, { useEffect, useState } from 'react';
import "./orders.css";
import { useDispatch, useSelector } from 'react-redux';
import EditProfile from '../../components/profile/EditProfile';
import Crypto from '../../components/orders/crypto/Crypto';
import Fiat from '../../components/orders/fiat/Fiat';
import { makeRequest } from '../../axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { logOutSuccess } from '../../redux/redux-slices/UserSlice';

const Profile = () => {
  const [focus, setFocus] = useState(false);
  const [orders, setOrders] = useState([]);
  const user = useSelector((state) => state.user.currentUser);
  const isAuthenticated = useSelector((state) => state.user.isLoggedIn);
  const crypto = orders?.filter((item) => item?.method?.toLowerCase() === "crypto");
  const fiat = orders?.filter((item) => item?.method?.toLowerCase() !== "crypto");
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

  useEffect(() => {
    !isAuthenticated && navigate('/login', { state: { from: location }, replace: true })
  }, [isAuthenticated])
  
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
         if (err.response?.status === 401) {
        dispatch(logOutSuccess());
        navigate('/login', { state: { from: location }, replace: true });
      }
      }
    }
    getOrders();
  }, [])
  
  return (
    <div className='profileContainer'>
      <div className="profileTop">
        <button style={{ color: !focus ? "#121d4e": "black", borderBottom: !focus ? "3px solid #121d4e": "white"}} className="topButton" onClick={handleFiat}>Fiat</button>
        <button style={{ color: focus ? "#121d4e": "black", borderBottom: focus ? "3px solid #121d4e": "white"}} className="topButton" onClick={handleFocus}>Crypto</button>
      </div>
      <h2 className='orderheader'>{focus ? "Crypto": "Fiat"} Orders History</h2>
      {focus ? <Crypto orders={crypto} />: <Fiat orders={fiat} />}
    </div>
  );
}

export default Profile;
