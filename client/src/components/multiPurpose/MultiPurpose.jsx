import React from "react";
import './multipurpose.css'
import { Link } from "react-router-dom";

const MultiPurpose = () => {
 
  return (
    <div className="subContainer">
      <div className="subItems">
        <div className="subItem">
          <h2 className="subTitle">Standard</h2>
          <div className="secondHeader">
            <p className="subDesc">Starting at</p>
            <div className="subPrice"><b className="headerprice">$25</b>/month</div>
          </div>
          <div className="subList">
            Standard lines require users to click the "Wake U
            p" button and then typically have a delay of at least
             2 minutes before the line is ready for use.
        </div>
          <Link to={`/MultiPurpose?alwaysOn=${false}`}>
            <button className="subButton">Select plan</button>
          </Link>
        </div>
        <div className="subItem">
          <h2 className="subTitle">No Wake Up</h2>
          <div className="secondHeader">
            <p className="subDesc">Starting at</p>
            <div className="subPrice"><b className="headerprice">$50</b>/month</div>
          </div>
          <div className="subList" style={{marginBottom: "50px"}}>
          No Wake Up lines do not require users to click the "Wake Up" 
          button when they want to use them.
          </div>
          <Link to={`/MultiPurpose?alwaysOn=${true}`}>
            <button className="subButton">Select plan</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MultiPurpose;
