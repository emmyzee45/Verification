import React from 'react';
import "./checkout.css";

const Checkout = () => {
  return (
    <div className='checkoutContainer'>
        <h1 className='checkoutTitle'>Confirm Subscription Purchase</h1>
      <div className='checkItem'>
        <div className="checkItems heading">
            <div>Service</div>
            <div>Prorated Charges</div>
            <div>Renewal Price</div>
        </div>
        <div className="checkItems boding">
            <div>Service</div>
            <div>Prorated Charges</div>
            <div>Renewal Price</div>
        </div>
        <div className="checkItems boding">
            <div>Service</div>
            <div>Prorated Charges</div>
            <div>Renewal Price</div>
        </div>
        <div className="checkItems boding">
            <div>Service</div>
            <div>Prorated Charges</div>
            <div>Renewal Price</div>
        </div>
        <div className="checkItems checkTotal">
            <div>Total</div>
            <div>$23.00</div>
        </div>
      </div>
      <button className='checkBuyButton'>Buy</button>  
    </div>
  );
}

export default Checkout;
