import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import "./message.css";
import { format } from "timeago.js";
import { makeRequest } from "../../axios.js"
import { getMessageFailure, getMessageStart, getMessageSuccess } from '../../redux/redux-slices/messageSlice';
import { useLocation, useNavigate } from 'react-router-dom';
import { logOutSuccess } from '../../redux/redux-slices/UserSlice.js';

const Message = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user?.currentUser);
  const isAuthenticated = useSelector((state) => state.user?.isLoggedIn);
  const messages = useSelector((state) => state.message?.messages?.filter((item) => user?.subscriptionIds?.includes(item?.subscriptionId)))

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    !isAuthenticated && navigate('/login', { state: { from: location }, replace: true })
  }, [isAuthenticated])

  useEffect(() => {
    const getMessages = async() => {
      dispatch(getMessageStart())
      try {
        const res = await makeRequest.get("subscriptions/incoming-text-messages");
        console.log(res.data)
        dispatch(getMessageSuccess(res.data))
      }catch(err) {
        if (err.response?.status === 401) {
        dispatch(logOutSuccess());
        navigate('/login', { state: { from: location }, replace: true });
      } else {
          dispatch(getMessageFailure())
      }
      }
    }
    getMessages()
  }, [])

  return (
    <div className='messageContainer'>
      <h1 className="messageTitle">Latest Messages</h1>
      <div>
        <div className='thead'>
          <div className='thead-item'>Line Type</div>
          <div className='thead-item'>Service</div>
          <div className='thead-item'>Line Number</div>
          <div className='thead-item'>Message</div>
          <div className='thead-item'>Sent From</div>
          <div className='thead-item'>Time</div>
          <div className='thead-item'>Actions</div>
        </div>
        <div className='tbody'>
          {messages.map((item) => {
            return (
              <div className='messageItems'>
                <div className="messageItem">{item?.lineType}</div>
                <div className="messageItem">{item?.target?.name}</div>
                <div className="messageItem">{item?.lineNumber}</div>
                <div className="messageItem text">{item?.fullPayloadValue}</div>
                <div className="messageItem">{item?.sentFrom}</div>
                <div className="messageItem">{format(item?.sentAt)}</div>
                <div className="messageItem">
                  <button className='action'>Action</button>
                  {/* <button className='action'>Action</button> */}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  );
}

export default Message;
