import React, { useEffect, useState } from "react";
import './temperary.css';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import { Switch } from '@mui/material';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Footer from "../../components/footer/Footer";

const Temperary = () => {
  const [onechecked, onesetChecked] = useState(true); // Switch
  const [checked, setChecked] = useState(true); // Switch
  const [threeChecked, setThreeChecked] = useState(true); // Switch
  const [weekChecked, setWeekChecked] = useState(true); // Switch

  const location = useLocation();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.user.isLoggedIn)

  useEffect(() => {
    !isAuthenticated && navigate('/login', { state: { from: location }, replace: true })
}, [isAuthenticated])

  const switchHandler = (event) => {
    setChecked(event.target.checked);
  };
  
  const handleOneCheck = (event) => {
    onesetChecked(event.target.checked);
  };

  const handleThreeCheck = (event) => {
    setThreeChecked(event.target.checked);
  };

  const handleWeekCheck = (event) => {
    setWeekChecked(event.target.checked);
  };
  
  return (
    <>
    <div className="subContainer">
      <h1 className="subtitle">Non-Renewable Plans</h1>
      <div className="subItems">
        <div className="subItemm">
          <h2 className="subTitle">1 day</h2>
          <div className="secondHeader">
            <p className="subDesc">Starting at</p>
            <div className="subPrice"><b className="headerprice">${ onechecked ? "8.10":"4.05"}</b>/service</div>
          </div>
          <ul className="subList">
            <li className="subTexts">
              <CheckOutlinedIcon className="subCheck" />
              <div className="subText">Non-VoIP US Number</div>
            </li>
            <li className="subTexts">
              <CheckOutlinedIcon className="subCheck" />
              <div className="subText">Choose Services</div>
            </li>
            <li className="subTexts">
              <CheckOutlinedIcon className="subCheck" />
              <div className="subText">Temperary Number</div>
            </li>
            <li className="subTexts">
              <CheckOutlinedIcon className="subCheck" />
              <div className="subText">Non-Renewable</div>
            </li>
          </ul>
          <div className="noWakeup">
          <div className="temperarySwitch" style={{backgroundColor: onechecked ? "green": "white"}} >
          <Switch
            style={{backgroundColor: onechecked ? "white": "lightgray"}}
            checked={true}
            // onChange={handleOneCheck}
            />
          </div>
          <div>No Wake up</div>
          </div>
          <Link to={`/subscription/1?alwaysOn=${onechecked}`}>
            <button className="subButton">Select plan</button>
          </Link>
        </div>
        <div className="subItemm">
          <h2 className="subTitle">3 days</h2>
          <div className="secondHeader">
            <p className="subDesc">Starting at</p>
            <div className="subPrice"><b className="headerprice">${ threeChecked ? "9.45":"4.72"}</b>/service</div>
          </div>
          <ul className="subList">
            <li className="subTexts">
              <CheckOutlinedIcon className="subCheck" />
              <div className="subText">Non-VoIP US Number</div>
            </li>
            <li className="subTexts">
              <CheckOutlinedIcon className="subCheck" />
              <div className="subText">Choose Services</div>
            </li>
            <li className="subTexts">
              <CheckOutlinedIcon className="subCheck" />
              <div className="subText">Temperary Number</div>
            </li>
            <li className="subTexts">
              <CheckOutlinedIcon className="subCheck" />
              <div className="subText">Non-Renewable</div>
            </li>
          </ul>
          <div className="noWakeup">
          <div className="temperarySwitch" style={{backgroundColor: threeChecked ? "green": "white"}} >
          <Switch
            style={{backgroundColor: threeChecked ? "white": "lightgray"}}
            checked={true}
            // onChange={handleThreeCheck}
            />
          </div>
          <div>No Wake up</div>
          </div>
          <Link to={`/subscription/3?alwaysOn=${threeChecked}`}>
            <button className="subButton">Select plan</button>
          </Link>
        </div>
        <div className="subItemm">
          <h2 className="subTitle">1 week</h2>
          <div className="secondHeader">
            <p className="subDesc">Starting at</p>
            <div className="subPrice"><b className="headerprice">${ weekChecked ? "10.80":"5.40"}</b>/service</div>
          </div>
          <ul className="subList">
            <li className="subTexts">
              <CheckOutlinedIcon className="subCheck" />
              <div className="subText">Non-VoIP US Number</div>
            </li>
            <li className="subTexts">
              <CheckOutlinedIcon className="subCheck" />
              <div className="subText">Choose Services</div>
            </li>
            <li className="subTexts">
              <CheckOutlinedIcon className="subCheck" />
              <div className="subText">Temperary Number</div>
            </li>
            <li className="subTexts">
              <CheckOutlinedIcon className="subCheck" />
              <div className="subText">Non-Renewable</div>
            </li>
          </ul>
          <div className="noWakeup">
          <div className="temperarySwitch" style={{backgroundColor: weekChecked ? "green": "white"}} >
          <Switch
            style={{backgroundColor: weekChecked ? "white": "lightgray"}}
           checked={true}
            // onChange={handleWeekCheck}
            />
          </div>
          <div>No Wake up</div>
          </div>
          <Link to={`/subscription/7?alwaysOn=${weekChecked}`}>
            <button className="subButton">Select plan</button>
          </Link>
        </div>
        <div className="subItemm">
          <h2 className="subTitle">2 weeks</h2>
          <div className="secondHeader">
            <p className="subDesc">Starting at</p>
            <div className="subPrice"><b className="headerprice">${ checked ? "16.20":"10.80"}</b>/service</div>
          </div>
          <ul className="subList">
            <li className="subTexts">
              <CheckOutlinedIcon className="subCheck" />
              <div className="subText">Non-VoIP US Number</div>
            </li>
            <li className="subTexts">
              <CheckOutlinedIcon className="subCheck" />
              <div className="subText">Choose Services</div>
            </li>
            <li className="subTexts">
              <CheckOutlinedIcon className="subCheck" />
              <div className="subText">Temperary Number</div>
            </li>
            <li className="subTexts">
              <CheckOutlinedIcon className="subCheck" />
              <div className="subText">Non-Renewable</div>
            </li>
          </ul>
          <div className="noWakeup">
          <div className="temperarySwitch" style={{backgroundColor: checked ? "green": "white"}} >
          <Switch
            style={{backgroundColor: checked ? "white": "lightgray"}}
            checked={true}
            // onChange={switchHandler}
            />
          </div>
          <div>No Wake up</div>
          </div>
          <Link to={`/subscription/14?alwaysOn=${checked}`}>
            <button className="subButton">Select plan</button>
          </Link>
        </div>
      </div>
    <Footer />
    </div>
    </>
  );
};

export default Temperary;
