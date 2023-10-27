import React, { useRef, useState } from 'react';
import "./topBalance.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { makeRequest } from '../../axios';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { updateUserFailure, updateUserStart, updateUserSuccess } from '../../redux/redux-slices/UserSlice';
import { toast } from 'react-toastify';

export default function TopBalance() {
    const dispatch = useDispatch();
    const [amount, setAmount] = useState(null);
    const user = useSelector((state) => state.user.currentUser)
    const amountRef = useRef();
    const navigate = useNavigate();

    const handleTopUp = async() => {
      const data = {amount, currency: "USD", user_id: user._id }
        // dispatch(updateUserStart())
        try {
            const res = await makeRequest.post(`webhooks/checkout`,data);
            console.log(res.data.hosted_url)
            // dispatch(updateUserSuccess(res.data));
            amountRef.current.value = ""
            toast.success("Redirecting to Coinbase, after your payment is successful, the balance will be updated once payment is comfirmed")
            window.location.href = res.data.hosted_url;
          }catch(err) {
            // dispatch(updateUserFailure())
            toast.error("Something went wrong!")
        }
    }
  return (
    <div className='balanceContainer'>
      <h1 className='title'>Select Payment Method</h1>
      <div className="left">
        <div className="leftItem">
          <div className="labelContainer">
          <input type="radio" disabled />
          <label htmlFor="" className='radioLabel'>Credit Card</label>
          </div>
          <img alt='/' src='img/mastercard.png' className='img' />
        </div>
        <div className="leftItem">
          <div className="labelContainer">
          <input type="radio" disabled />
          <label htmlFor="" className='radioLabel'>PayPal</label>
          </div>
          <img alt='/' src='img/paypal1.png' className='img' />
        </div>
        <div className="leftItem">
          <div className="labelContainer">
          <input type="radio" />
          <label htmlFor="" className='radioLabel'>Cryptocurrency</label>
          </div>
          <img alt='/' src="img/crypto1.jpeg" className='img' />
        </div>
        <div className="leftItem">
          <div className="labelContainer">
          <input type="radio" disabled />
          <label htmlFor="" className='radioLabel'>Banker Tranfer</label>
          </div>
          <img alt='/' src="img/download.png" className='img' />
        </div>
      </div>
      <div className="right">
        <div className="rightItems">
          <div className="rightItem">
            <div className="rightlabel">Deposite Currency</div>
            <div className="input">USD</div>
          </div>
          <div className="rightItem">
            <div className="rightlabel">Deposite Amount</div>
            <input className="input" ref={amountRef} onChange={(e) => setAmount(e.target.value)} />
          </div>
          <div className="rightItem">
            <div className="rightlabel">Processing fee</div>
            <div className='righttext'>$0.00</div>
          </div>
          <hr />
          <div className="rightItem" style={{fontWeight: "bold"}}>
            <div className="rightlabel">Total</div>
            <div className='righttext'>${amount ? amount : "0.00"}</div>
          </div>
          {/* <Box sx={{ display: 'flex', }}>
         <CircularProgress />
         </Box> */}
          <button className='button' style={{backgroundColor: "#1C233F"}} onClick={handleTopUp}>Confirm and pay {amount && `$${amount}`}</button>
          <ul className="lists">
            <li className="list" style={{fontWeight: "bold"}}>You agree that your deposite is non-refundable!</li>
            <li className="list">Usually the payment is confirmed in few minutes, but it can take up to 3 hours.</li>
          </ul>
        </div>
      </div>  
    </div>
  
  );
}
