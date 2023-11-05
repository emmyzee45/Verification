import React, { useEffect } from "react";
import './subscription.css'
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Subscription = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.user.isLoggedIn)

  useEffect(() => {
    !isAuthenticated && navigate('/login', { state: { from: location }, replace: true })
}, [isAuthenticated])
  
  return (
    <div className="subContainer">
      <h1 className="subtitle">Subscription Plans</h1>
      <div className="subItems">
        <div className="subItem">
          <h2 className="subTitle">Single Service Line</h2>
          <p className="subDesc">Non-Renewable Phone Rental</p>
          <span className="subPrice">$5.6</span>
          <ul className="subList">
            <li className="subTexts">
              <CheckOutlinedIcon className="subCheck" />
              <div className="subText">Non-VoIP US Number</div>
            </li>
            <li className="subTexts">
              <CheckOutlinedIcon className="subCheck" />
              <div className="subText">Choose Individual Services</div>
            </li>
            <li className="subTexts">
              <CheckOutlinedIcon className="subCheck" />
              <div className="subText">1 Day - 14 Day Rental</div>
            </li>
            <li className="subTexts disableIcon">
              <CloseOutlinedIcon className="subClose" />
              <div className="subText">Non-Renewable Subscription</div>
            </li>
            <li className="subTexts disableIcon">
              <CloseOutlinedIcon className="subClose" />
              <div className="subText">Cannot Send SMS</div>
            </li>
            <li className="subTexts disableIcon">
              <CloseOutlinedIcon className="subClose" />
              <div className="subText">No Area code Selection</div>
            </li>
          </ul>
          <Link to='/temporary-subscription'>
            <div className="subButton">Select plan</div>
          </Link>
        </div>
        <div className="subItem">
          <h2 className="subTitle">Single Service Line</h2>
          <p className="subDesc">Renewable Phone Rental</p>
          <span className="subPrice">$10</span>
          <ul className="subList">
          <li className="subTexts">
              <CheckOutlinedIcon className="subCheck" />
              <div className="subText">Non-VoIP US Number</div>
            </li>
            <li className="subTexts">
              <CheckOutlinedIcon className="subCheck" />
              <div className="subText">Choose Individual Services</div>
            </li>
            <li className="subTexts">
              <CheckOutlinedIcon className="subCheck" />
              <div className="subText">1 Day - 14 Day Rental</div>
            </li>
            <li className="subTexts">
              <CheckOutlinedIcon className="subCheck" />
              <div className="subText">Non-Renewable Subscription</div>
            </li>
            <li className="subTexts disableIcon">
              <CloseOutlinedIcon className="subClose " />
              <div className="subText">Cannot Send SMS</div>
            </li>
            <li className="subTexts disableIcon">
              <CloseOutlinedIcon className="subClose" />
              <div className="subText">No Area code Selection</div>
            </li>
          </ul>
          <Link to='/permanent-subscription/isSingle'>
            <div className="subButton">Select plan</div>
          </Link>
        </div>
        <div className="subItem">
          <h2 className="subTitle">Multi-Purpose Line</h2>
          <p className="subDesc">Renewable Phone Rental</p>
          <span className="subPrice">$15</span>
          <ul className="subList">
          <li className="subTexts">
              <CheckOutlinedIcon className="subCheck" />
              <div className="subText">Non-VoIP US Number</div>
            </li>
            <li className="subTexts">
              <CheckOutlinedIcon className="subCheck" />
              <div className="subText">Choose Individual Services</div>
            </li>
            <li className="subTexts">
              <CheckOutlinedIcon className="subCheck" />
              <div className="subText">1 Day - 14 Day Rental</div>
            </li>
            <li className="subTexts">
              <CheckOutlinedIcon className="subCheck" />
              <div className="subText">Non-Renewable Subscription</div>
            </li>
            <li className="subTexts">
              <CheckOutlinedIcon className="subCheck" />
              <div className="subText">Cannot Send SMS</div>
            </li>
            <li className="subTexts">
              <CheckOutlinedIcon className="subCheck" />
              <div className="subText">No Area code Selection</div>
            </li>
          </ul>
          <Link to='/permanent-subscription/isMulti'>
            <div className="subButton">Select plan</div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Subscription;
