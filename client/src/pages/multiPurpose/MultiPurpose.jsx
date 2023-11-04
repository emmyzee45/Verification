import React, { useEffect, useState } from "react";
import './multiPurpose.css'
import SearchBar from '../../components/searchbox/SearchBar';
import { Link, useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { State, Country } from "country-state-city";
import { useDispatch, useSelector } from "react-redux";
import { logOutSuccess, updateUserFailure, updateUserStart, updateUserSuccess } from "../../redux/redux-slices/UserSlice"
import { makeRequest } from "../../axios";
import { toast } from "react-toastify";

const MultiPurpose = () => {
  const [ state, setState ] =  useState(null);
  const [areaCode, setAreaCode] = useState(null);
  const [ discount, setDiscount ] = useState(null);
  const user = useSelector((state) => state.user.currentUser);
  const isAuthenticated = useSelector((state) => state.user.isLoggedIn);

  const location = useLocation();
  const dispatch = useDispatch();
  const alwaysOn = location.search.split("=")[1];
  const navigate = useNavigate();

  useEffect(() => {
    !isAuthenticated && navigate('/login', { state: { from: location }, replace: true })
  }, [isAuthenticated])

  const handleClear = () => {
    setState(null);
    setAreaCode(null)
  }

  const handleSubmit = async() => {

    const data = {
      discountCode: discount,
      areaCode: 217,
      instantAvailability: alwaysOn === "true" ? true : false,
      subscriptionId: ""
      }
      dispatch(updateUserStart())
      try {
        const res = await makeRequest.post(`subscriptions/multi-purpose-line`, data);
        const updateUser = await makeRequest.put(`users/decrease/${user._id}`, {balance: alwaysOn ? 50 + 30/100 * 50 : 25 + 30/100  * 25});
        dispatch(updateUserSuccess(updateUser.data));
        toast.success("Subscription Successful")
    }catch(err) {
      if (!err?.response) {
        toast.error('No Server Response');
    }  else if (err.response?.status === 401) {
      dispatch(updateUserFailure())
      dispatch(logOutSuccess());
      navigate('/login', { state: { from: location }, replace: true });
    } else {
        toast.error('Something went wrong');
        dispatch(updateUserFailure())
    }
    }
  }
  console.log(state)
  return (
    <div className="container">
      {/* <SearchBar /> */}
      <div>
        <h1 className="multi-title"> Review Purchase </h1>
      </div >
      <div className="subList">
        You can place an order and we will automatically assign 
        you a number when we restock (typically within 72 hours) 
        by continuing with this purchase. Your service won't 
        start until we've assigned you a number and you won't lose 
        your place in line.
      </div>
      <div className="multiPurposeItem headerItem">
        <div>Service</div>
        <div>Renewal Price</div>
        <div>Activation Fee</div>
        <div>Customer Order Fee</div>
        <div>Quantity</div>
      </div>

      <div className="multiPurposeItem headerItemMessage">
        <div>Multipurpose Line</div>
        <div>${alwaysOn === "true" ? 50.00 : 25.00}</div>
        <div>Waived</div>
        <div>$0.00</div>
        <div><input type="number" className="lineQty" id="lineQty" min="1" max="22" value="1" oninput="ValidateQty(event)" /></div>
      </div>
      
      <div className="w-50">
        <div className="promotionCode mb-3">
          <input className="promotionCode" type="text" onChange={(e) => setDiscount(e.target.value)} placeholder="Have a discount code? Enter it here..."></input>
        </div>
        <div className="d-inline pl-2">
          <button className="promoButton" type="submit">Apply</button>
        </div>
      </div>
      <div className="w-50">
        <select
          className="stateCode"
          required
          value={state}
          onChange={(e) => setState(e.target.value)}
        >
          <option readOnly value="">Select a State</option>
            {State.getStatesOfCountry("US").map((item) => (
              <option key={item.isoCode} value={item.isoCode}>
                {item.name}
          </option>))}
        </select>
        {/* <select
          className="areaCode"
          required
          value={areaCode}
          onChange={(e) => setAreaCode(e.target.value)}
        >
          <option value="">Select a State</option>
            {State.getStatesOfCountry("US").map((item) => (
              <option key={item.isoCode} value={item.isoCode}>
                {item.name}
          </option>))}
        </select> */}
        <div className="areaCodeDiv">
          <input 
            className="areaCode" 
            type="text" 
            onChange={(e) => setAreaCode(e.target.value)} 
            placeholder="Enter area code here..."
          />
        </div>
        <div className="multi-buttons">
          <button className="mult-button" type="submit" onClick={handleSubmit}>Apply</button>
          {/* <button className="subButton" style={{width: "100px"}} type="submit" onClick={handleClear}>Clear</button> */}
        </div>
      </div>

      <div className="pb-3">
        <h2 className="text-success"> Any US Number</h2>
      </div>
      <div>
        <div>
          All purchases made during this transaction will be applied to a new subscription.
        </div>
        <div>
          Your subscription billing cycle will begin today and run for 30 days before renewal.
        </div>
      </div>

      <div className="multi-buttons">
        <div className="previous_page">
          <Link to={`/permanent-subscription/isMulti`}>
            <button className="multi-button">Back</button>
          </Link>
        </div>
        <div className="previous_page">
          <button className="multi-button" type="submit">Continue</button>
        </div>
      </div>

    </div>
      
  );
};

export default MultiPurpose;
