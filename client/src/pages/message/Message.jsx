import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import "./message.css";
import { format } from "timeago.js";
import { makeRequest } from "../../axios.js"
import { getMessageFailure, getMessageStart, getMessageSuccess } from '../../redux/redux-slices/messageSlice';
import { useLocation, useNavigate } from 'react-router-dom';
import { logOutSuccess } from '../../redux/redux-slices/UserSlice.js';
import Footer from '../../components/footer/Footer.jsx';

const Message = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user?.currentUser);
  const isAuthenticated = useSelector((state) => state.user?.isLoggedIn);
  const messages = useSelector((state) => state.message?.messages)
  // const messages = useSelector((state) => state.message?.messages?.filter((item) => user?.subscriptionIds?.includes(item?.subscriptionId)))

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
      //   if (err.response?.status === 401) {
      //   dispatch(logOutSuccess());
      //   navigate('/login', { state: { from: location }, replace: true });
      // } else {
      // }
      dispatch(getMessageFailure())
    }
    }
    getMessages()
  }, [])

  const handleReply = async() => {

  }

  return (
    <>
    <div className='messageContainer'>
      <h1 className="messageTitle">Latest Messages</h1>
      <table className='t-container'>
        <tr className='t-head'>
          <td className='t-head-item'>Line Type</td>
          <td className='t-head-item'>Service</td>
          <td className='t-head-item'>Line Number</td>
          <td className=' message-body'>Message</td>
          <td className='t-head-item'>Sent From</td>
          <td className='t-head-item'>Time</td>
          <td className='t-head-item'>Actions</td>
        </tr>
        <tbody className='tbody'>
          {messages.map((item) => {
            return (
              <tr className='messageItems' key={item?.id}>
                <td className="messageItem">{item?.lineType}</td>
                <td className="messageItem">{item?.target?.name}</td>
                <td className="messageItem">{item?.lineNumber}</td>
                <td className="message-body">{item?.fullPayloadValue}</td>
                <td className="messageItem">{item?.sentFrom}</td>
                <td className="messageItem">{format(item?.sentAt)}</td>
                <td className="messageItem">
                  <button className='action' onClick={handleReply}>Reply</button>
                  {/* <button className='action'>Action</button> */}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
    <Footer />
    </>
  );
}

export default Message;
