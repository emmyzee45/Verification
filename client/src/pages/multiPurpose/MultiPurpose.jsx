import React, { useState } from "react";
import './multiPurpose.css'
import SearchBar from '../../components/searchbox/SearchBar';
import { Link } from "react-router-dom";

const MultiPurpose = () => {
  return (
    <div className="container">
      <SearchBar />
      <div>
        <h1> Review Purchase </h1>
      </div>
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
          <button className="subButton" type="submit">Apply</button>
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

      <div className="buttons">
        <div className="previous_page">
          <Link to={`/permanent-subscription/isMulti`}>
            <button className="subButton">Back</button>
          </Link>
        </div>
        <div>
          <button className="subButton" type="submit">Continue</button>
        </div>
      </div>

    </div>
      
  );
};

export default MultiPurpose;
