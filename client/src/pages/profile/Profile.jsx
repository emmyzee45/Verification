import React, { useState } from 'react';
import "./profile.css";
import { useSelector } from 'react-redux';
import EditProfile from '../../components/profile/EditProfile';

const Profile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const user = useSelector((state) => state.user.currentUser);

  const handleEdit = () => {
    setIsOpen(true);
  }
  
  return (
    <div className='profileContainer'>
      <div className="profileTop">
        <div className="imgContainer">
            <img src={user?.img ? user?.img : "https://firebasestorage.googleapis.com/v0/b/cardano-d265c.appspot.com/o/images.jpeg?alt=media&token=8c34ea8e-71f2-4b6f-bf93-f823e2b3a90e"} alt="" className="profileImg" />
        </div>
        <div className="profiledetails">
          <div className="profiledetail">{user?.username}</div>
          <button className="profileButton" onClick={handleEdit}>Edit</button>
        </div>
      </div>
      <div className="profileBottom">
        <div className="profileTab">
            <div className="tab">Temperal Subscription</div>
            <div className="tab">Permanent Subscription</div>
        </div>
        <div className="subList"></div>
      </div>
      {isOpen && <EditProfile setIsOpen={setIsOpen} />}
    </div>
  );
}

export default Profile;
