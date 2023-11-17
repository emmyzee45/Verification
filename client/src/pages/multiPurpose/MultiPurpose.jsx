import React, { useEffect, useState } from "react";
import './multiPurpose.css'
import SearchBar from '../../components/searchbox/SearchBar';
import { Link, useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { State, Country } from "country-state-city";
import { useDispatch, useSelector } from "react-redux";
import { logOutSuccess, updateUserFailure, updateUserStart, updateUserSuccess } from "../../redux/redux-slices/UserSlice"
import { makeRequest } from "../../axios";
import { toast } from "react-toastify";
import Footer from "../../components/footer/Footer";

const MultiPurpose = () => {
  const [ state, setState ] =  useState(null);
  const [areaCode, setAreaCode] = useState(null);
  const [charges, setCharges] = useState(0);
  const [ discount, setDiscount ] = useState(null);
  const [ apply, setApply ] = useState(false);
  const user = useSelector((state) => state.user.currentUser);
  const isAuthenticated = useSelector((state) => state.user.isLoggedIn);

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const alwaysOn = location.search.split("=")[1];
  const price = location.search.split("=")[2];

  useEffect(() => {
    !isAuthenticated && navigate('/login', { state: { from: location }, replace: true })
  }, [isAuthenticated])

  const handleApply = () => {
    setApply(true)
  }

  const handleAreaCode = (e) => {
    setAreaCode(e.target.value);
    setCharges(20)
  }

  const handleSubmit = async() => {
    const data = {
      price,
      charges,
      areaCode,
      discountCode: discount,
      instantAvailability: alwaysOn === "true" ? true : false,
      subscriptionId: ""
      }
      navigate("/multi-check", {state: { data }})
  
  }

  return (
    <>
    <div className="container">
      {/* <SearchBar /> */}
      <div>
        <h1 className="multi-title"> Review Purchase </h1>
      </div >
      <div className="subList">
        You can place an order and we will automatically assign 
        you a number (typically within 48 hours) 
        by continuing with this purchase. Your service won't 
        start until we've assigned you a number and you won't lose 
        your place in line.
      </div>
      <div className="multiPurposeItem headerItem">
        <div className="headerItems header-item-left">Service</div>
        <div className="headerItems">Renewal Price</div>
        <div className="headerItems header-item-center">Activation Fee</div>
        <div className="headerItems header-item-center">Customer Order Fee</div>
        <div className="headerItems header-item-center">Quantity</div>
      </div>

      <div className="multiPurposeItem headerItemMessage">
        <div className="headerItems header-item-left">Multipurpose Line</div>
        <div className="headerItems">${price}</div>
        <div className="headerItems header-item-center">Waived</div>
        <div className="headerItems header-item-center">${apply ? "20.00" : "0.00" }</div>
        <div className="headerItems header-item-center"><input type="number" className="lineQty" id="lineQty" min="1" max="22" value="1" oninput="ValidateQty(event)" /></div>
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
    
        { state && <div className="areaCodeDiv">
          <input 
            className="areaCode" 
            type="text" 
            onChange={handleAreaCode} 
            placeholder="Enter area code here..."
          />
        </div>}
        <div className="multi-buttons">
          <button className="mult-button" disabled={!areaCode} type="submit" onClick={handleApply}>Apply</button>
          {/* <button className="subButton" style={{width: "100px"}} type="submit" onClick={handleClear}>Clear</button> */}
        </div>
      </div>

      <div className="pb-3">
        <h2 className="text-success"> Any US Number</h2>
      </div>
      {apply && (
        <div className="pb-3">
          <p className="selected-code">Selected Area Code: {areaCode}</p>
        </div>
      )}
      <div className="multi-message">
        <div>
          All purchases made during this transaction will be applied to a new subscription.
        </div>
        <div>
          Your subscription billing cycle will begin today and run for 30 days before renewal.
        </div>
        {apply &&   (
          <div className="apply-message">
          This number can take up to 48 hours to be activated. If we can't get your exact area code 
          you'll get an area code from nearby the one you chose. Thank you for your patience!
          </div>
        )}
      </div>
      <div className="multi-buttons">
        <div className="previous_page">
          <Link to={`/permanent-subscription/isMulti`}>
            <button className="multi-button">Back</button>
          </Link>
        </div>
        <div className="previous_page">
          <button className="multi-button" type="submit" onClick={handleSubmit}>Continue</button>
        </div>
      </div>
    </div>
    <Footer />
    </>
      
  );
};

export default MultiPurpose;
