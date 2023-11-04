import React, { useState } from 'react';
import "./form.css";
import { addTicketFailure, addTicketStart, addTicketSuccess } from '../../../redux/redux-slices/ticketSlice';
import { useDispatch, useSelector } from 'react-redux';
import { makeRequest } from '../../../axios';
import { toast } from 'react-toastify';
import { logOutSuccess } from '../../../redux/redux-slices/UserSlice';
import { useLocation, useNavigate } from 'react-router-dom';

const Form = ({ setOpenForm }) => {
    const [title, setTitle ] = useState(null);
    const [msg, setMsg] = useState(null);

    const user = useSelector((state) => state.user.currentUser);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const handleSubmit = async(e) => {
        e.preventDefault();
        dispatch(addTicketStart())
        try{
          const res = await makeRequest.post('tickets', { title, msg, sender: user?._id });
          dispatch(addTicketSuccess(res.data));
          setOpenForm(false);
          toast.success("Ticket successfully creasted!")
        }catch(err) {
          if (err.response?.status === 401) {
            dispatch(logOutSuccess());
            navigate('/login', { state: { from: location }, replace: true });
          } else {
            dispatch(addTicketFailure());
            toast.error("something went wrong!");
          }
        }
    }

    const handleOpenForm = () => {
        setOpenForm(false)
    }

  return (
    <div className='t-form-container'>
      <form className="t-form">
        <h2 className='t-form-title'>New Ticket</h2>
        <div>
            <label className='t-label' htmlFor='subject'>Subject</label>
            <input id='subject' type='text' onChange={(e) => setTitle(e.target.value)} className='t-form-subject'/>
        </div>
        <div className='message'>
            <label className='t-label' htmlFor='message'>Message</label>
            <textarea id='t-form-message' onChange={(e) => setMsg(e.target.value)} />
        </div>
        <div className='t-form-buttons'>
            <button className="t-form-button" onClick={handleOpenForm}>Cancel</button>
            <button className="t-form-button t-form-submit" onClick={handleSubmit}>Create</button>
        </div>
      </form>
    </div>
  );
}

export default Form;
