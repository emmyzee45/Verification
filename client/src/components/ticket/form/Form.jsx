import React, { useState } from 'react';
import "./form.css";

const Form = ({ setOpenForm }) => {
    const [title, setTitle ] = useState(null);
    const [msg, setMsg] = useState(null);

    const handleSubmit = async(e) => {
        e.preventDefault();
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
