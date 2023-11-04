import { useState } from "react";
import "./support.css";
import { toast } from "react-toastify"
import Messenger from "../messenger/Messenger";
import { useDispatch } from "react-redux";
import { deleteTicketFailure, deleteTicketStart, deleteTicketSuccess, updateTicketFailure, updateTicketStart, updateTicketSuccess } from "../../redux/redux-slices/ticketSlice";
import { makeRequest } from "../../axios";
import { logOutSuccess } from "../../redux/redux-slices/UserSlice";
import { useLocation, useNavigate } from "react-router-dom";


const Support = ({ tickets }) => {
  const [open, setOpen ] = useState(false);
  const [currentChat, setCurrentChat] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleMessages = (item) => {
    setOpen(true)
    setCurrentChat(item)
  }

  const handleCloseTicket = async(id) => {
    dispatch(updateTicketStart())
    try {
      const res = await  makeRequest.put(`tickets/${id}`, {status: "closed"});
      dispatch(updateTicketSuccess({ ticket: res.data, id}));
      toast.success("Ticket successfully closed")
    }catch(err) {
      if (err.response?.status === 401) {
        dispatch(logOutSuccess());
        navigate('/login', { state: { from: location }, replace: true });
      } else {
        dispatch(updateTicketFailure())
        toast.error("Something went wrong!")
      }
    }
  }

  const handleDeleteTicket = async(id) => {
    dispatch(deleteTicketStart());
    try {
      await makeRequest.delete(`tickets/${id}`);
      dispatch(deleteTicketSuccess(id))
      toast.success("Ticket successfully deleted")
    }catch(err) {
      if (err.response?.status === 401) {
        dispatch(logOutSuccess());
        navigate('/login', { state: { from: location }, replace: true });
      } else {
        dispatch(deleteTicketFailure())
        toast.error("Something went wrong")
      }
    }
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
                {item?.status === "open" && <button className="s-body-button" onClick={() => handleCloseTicket(item?._id)}>Close</button>}
                <button className="s-body-button" onClick={() => handleDeleteTicket(item?._id)}>Delete</button>
            </div>
          </div>
        )
      })}
      {open && <Messenger currentTicket={currentChat} setOpen={setOpen} />}
    </div>
  );
}

export default Support;
