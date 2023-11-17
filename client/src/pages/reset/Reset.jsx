import React, { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { resetPasswordValidation } from '../../helper/validate'
import { resetPassword } from '../../helper/helper'
import { useNavigate, Navigate, useLocation } from 'react-router-dom';
import "./reset.css"
import { useSelector } from 'react-redux';
import { makeRequest } from '../../axios';

export default function Reset() {
  const [password, setPassword ] = useState("");
  const [confirm_password, setConfirm_Password ] = useState("");
  const user = useSelector((state) => state.user.currentUser);

  const navigate = useNavigate();
  const location = useLocation();
  const token = location.pathname.split("/")[2];

  const handleSubmit = async(e) => {
    e.preventDefault();
    if(password !== confirm_password) {
      return toast.error("Please confirm password")
    }
    try{
      const res = await makeRequest.post(`/users/resetpassword/${token}`, {password});
      res.status === 200 && navigate("/login");
      toast.success("Password successfully reset")
    }catch(err) {
      toast.error("Invalid or Expired token")
    }
  }

  return (
    <div className="reset-container">

      <Toaster position='top-right' reverseOrder={false}></Toaster>

      <div className='form-container'>
          {/* <div>Reset</div> */}
          <form className='reset-form ' onSubmit={handleSubmit}>
              <div>Enter new password</div>
              <div className="">
                  <input 
                    type='password' 
                    name='password' 
                    className='form-input' 
                    onChange={(e)=>setPassword(e.target.value)} 
                    placeholder='New Password' 
                  />
                  <input 
                    type='password' 
                    name='confirm_password' 
                    className='form-input' 
                    onChange={(e)=>setConfirm_Password(e.target.value)} 
                    placeholder='Repeat Password' 
                  />
                  <button className='reset-button' type='submit'>Reset</button>
              </div>

          </form>
      </div>
    </div>
  )
}
