import React, { useState } from "react";
import './multiPurpose.css'
import SearchBar from '../../components/searchbox/SearchBar';
import { Link } from "react-router-dom";
import { State, Country } from "country-state-city";

const MultiPurpose = () => {
  const [ state, setState ] =  useState(null);
  const [areaCode, setAreaCode] = useState(null);

  const handleClear = () => {
    setState(null);
    setAreaCode(null)
  }

  const handleSubmit = async() => {
    console.log(state, areaCode)
  }

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
        <div>$50.00</div>
        <div>Waived</div>
        <div>$0.00</div>
        <div><input type="number" className="lineQty" id="lineQty" min="1" max="22" value="1" oninput="ValidateQty(event)" /></div>
      </div>
      
      <div className="w-50">
        <div className="promotionCode mb-3">
          <input className="promotionCode" type="text" placeholder="Have a discount code? Enter it here..."></input>
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
          <option value="">Select a State</option>
            {State.getStatesOfCountry("US").map((item) => (
              <option key={item.isoCode} value={item.isoCode}>
                {item.name}
          </option>))}
        </select>
        <select
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
        </select>
        <div className="multi-buttons">
          <button className="multi-button" style={{width: "100px"}} type="submit" onClick={handleSubmit}>Apply</button>
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
