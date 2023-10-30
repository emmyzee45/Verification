import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import "./message.css";
import { format } from "timeago.js";
import { makeRequest } from "../../axios.js"
import { getMessageFailure, getMessageStart, getMessageSuccess } from '../../redux/redux-slices/messageSlice';

const Message = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user?.currentUser);
  const messages = useSelector((state) => state.message?.messages?.filter((item) => user?.subscriptionIds?.includes(item?.subscriptionId)))

  useEffect(() => {
    const getMessages = async() => {
      dispatch(getMessageStart())
      try {
        const res = await makeRequest.get("subscriptions/incoming-text-messages");
        console.log(res.data)
        dispatch(getMessageSuccess(res.data))
      }catch(err) {
        dispatch(getMessageFailure())
      }
    }
    getMessages()
  }, [])

  return (
    <div className='messageContainer'>
      <h1 className="messageTitle">Latest Messages</h1>
      <div>
        <thead>
          <tr>
          <td>Line Type</td>
          <td>Service</td>
          <td>Line Number</td>
          <td>Message</td>
          <td>Sent From</td>
          <td>Time</td>
          <td>Actions</td>
          </tr>
        </thead>
        <tbody>
          {messages.map((item) => {
            return (
              <tr className='messageItems'>
                <td className="messageItem">{item?.lineType}</td>
                <td className="messageItem">{item?.target?.name}</td>
                <td className="messageItem">{item?.lineNumber}</td>
                <td className="messageItem text">{item?.fullPayloadValue}</td>
                <td className="messageItem">{item?.sentFrom}</td>
                <td className="messageItem">{format(item?.sentAt)}</td>
                <td className="messageItem">
                  <button className='action'>Action</button>
                  {/* <button className='action'>Action</button> */}
                </td>
              </tr>
            )
          })}
        </tbody>
      </div>
    </div>
  );
}

export default Message;
