import React, { useRef, useState } from 'react';
import "./topBalance.css";
import { useDispatch, useSelector } from 'react-redux';
import { makeRequest } from '../../axios';
import { updateUserFailure, updateUserStart, updateUserSuccess } from '../../redux/redux-slices/UserSlice';
import { toast } from 'react-toastify';

export default function TopBalance() {
    const dispatch = useDispatch();
    const [amount, setAmount] = useState(0);
    const user = useSelector((state) => state.user.currentUser)
    const amountRef = useRef();

    const handleTopUp = async() => {
        dispatch(updateUserStart())
        try {
            const res = await makeRequest.put(`users/${user._id}`, {balance: parseInt(amount) + user.balance});
            dispatch(updateUserSuccess(res.data));
            amountRef.current.value = ""
            toast.success("Top up successful")
        }catch(err) {
            dispatch(updateUserFailure())
            toast.error("Something went wrong!")
        }
    }
  return (
    <div className='balanceContainer'>
      <div className="formContainer">
        <input type='text' ref={amountRef} onChange={(e)=> setAmount(e.target.value)} />
        <button className='balanceButton' onClick={handleTopUp}>Top up</button>
      </div>
    </div>
  );
}
