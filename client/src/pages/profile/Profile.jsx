import React, { useState } from 'react';
import "./profile.css";
import { useSelector } from 'react-redux';
import EditProfile from '../../components/profile/EditProfile';
import Crypto from '../../components/orders/crypto/Crypto';
import Fiat from '../../components/orders/fiat/Fiat';

const Profile = () => {
  const user = useSelector((state) => state.user.currentUser);
  const [focus, setFocus] = useState(false);

  const handleFiat = () => {
    setFocus(false);
  }
  const handleFocus = () => {
    setFocus(true)
  }
  
  return (
    <div className='profileContainer'>
      <div className="profileTop">
        <button style={{ color: !focus ? "#121d4e": "black", borderBottom: !focus ? "3px solid #121d4e": "white"}} className="topButton" onClick={handleFiat}>Fiat</button>
        <button style={{ color: focus ? "#121d4e": "black", borderBottom: focus ? "3px solid #121d4e": "white"}} className="topButton" onClick={handleFocus}>Crypto</button>
      </div>
      <h2 className='orderheader'>{focus ? "Crypto": "Fiat"} Orders History</h2>
      {focus ? <Crypto />: <Fiat />}
    </div>
  );
}

export default Profile;
