import { useState } from "react";
import "./support.css";
import Messenger from "../messenger/Messenger";


const Support = ({ tickets }) => {
  const [open, setOpen ] = useState(false);
  const [currentChat, setCurrentChat] = useState({});
  const handleMessages = (item) => {
    setOpen(true)
    setCurrentChat(item)
  }

  return (
    <div className="support-item-Container">
      <div className="support-item-header">
        <div className="s-header-item">Date</div>
        <div className="s-header-item">Subject</div>
        <div className="s-header-item s-header-action">Action(s)</div>
      </div>
      {tickets?.map((item) => {
        return (
          <div className="support-item-body" key={item?._id}>
            <div className="s-body-item">{item?.createdAt?.slice(0,10)}</div>
            <div className="s-body-item">{item?.title}</div>
            <div className="s-body-item s-body-action">
                <button className="s-body-button" onClick={() => handleMessages(item)}>View</button>
                {item?.status === "open" && <button className="s-body-button">Close</button>}
                <button className="s-body-button">Delete</button>
            </div>
          </div>
        )
      })}
      {open && <Messenger currentTicket={currentChat} setOpen={setOpen} />}
    </div>
  );
}

export default Support;
