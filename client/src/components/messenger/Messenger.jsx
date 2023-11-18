import "./messenger.css";
import Message from "../message/Message";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeRequest } from "../../axios";
import { logOutSuccess } from "../../redux/redux-slices/UserSlice";
import { useLocation, useNavigate } from "react-router-dom";

export default function Messenger({ currentTicket, setOpen }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const user = useSelector((state) => state.user.currentUser);
  const scrollRef = useRef();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await makeRequest.get(`messages/${currentTicket?._id}`);
        setMessages(res.data);
      } catch (err) {
        if (err.response?.status === 401) {
        dispatch(logOutSuccess());
        navigate('/login', { state: { from: location }, replace: true });
      } 
    }
  };
    getMessages();
  }, [currentTicket]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: user._id,
      text: newMessage,
      ticketId: currentTicket?._id,
      sendto: currentTicket.members.filter((id) => id != user._id)[0]
    };

    try {
      const res = await makeRequest.post("/messages", message);
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (err) {
      if (err.response?.status === 401) {
      dispatch(logOutSuccess());
      navigate('/login', { state: { from: location }, replace: true });
    } 
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleclose = () => {
    setOpen(false)
  }

  return (
    <>
      {/* <Topbar /> */}
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            {/* <input placeholder="Search for friends" className="chatMenuInput" />
            {conversations.map((c) => (
              <div onClick={() => setCurrentChat(c)}>
                <Conversation conversation={c} currentUser={user} />
              </div>
            ))} */}
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            <div className="m-header">
              <h2>{currentTicket?.title}</h2>
              <div className="m-close" onClick={handleclose}>X</div>
            </div>
                <div className="chatBoxTop">
                  {messages.map((m) => (
                    <div ref={scrollRef} key={m?._id}>
                      <Message message={m} own={m.sender === user?._id} />
                    </div>
                  ))}
                </div>
                {currentTicket?.status === "open" && (
                  <div className="chatBoxBottom">
                    <textarea
                      className="chatMessageInput"
                      placeholder="write something..."
                      onChange={(e) => setNewMessage(e.target.value)}
                      value={newMessage}
                    ></textarea>
                    <button className="chatSubmitButton" onClick={handleSubmit}>
                      Send
                    </button>
                  </div>
                )}
          </div>
        </div>
        <div className="chatOnline">
          <div className="chatOnlineWrapper">
            {/* <ChatOnline
              onlineUsers={onlineUsers}
              currentId={user._id}
              setCurrentChat={setCurrentChat}
            /> */}
          </div>
        </div>
      </div>
    </>
  );
}
