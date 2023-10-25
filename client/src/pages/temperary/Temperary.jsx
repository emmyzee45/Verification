import React, { useState } from "react";
import './temperary.css'
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import { Switch } from '@mui/material';
import { Link } from "react-router-dom";

const Temperary = () => {
  const [onechecked, onesetChecked] = useState(false); // Switch
  const [checked, setChecked] = useState(false); // Switch
  const [threeChecked, setThreeChecked] = useState(false); // Switch
  const [weekChecked, setWeekChecked] = useState(false); // Switch

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
    <div className="subContainer">
      <div className="subItems">
        <div className="subItem">
          <h2 className="subTitle">1 day</h2>
          <div className="secondHeader">
            <p className="subDesc">Starting at</p>
            <div className="subPrice"><b className="headerprice">${ onechecked ? "3.9":"1.95"}</b>/service</div>
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
            checked={onechecked}
            onChange={handleOneCheck}
            />
          </div>
          <div>No Wake up</div>
          </div>
          <Link to={`/subscription/1?alwaysOn=${onechecked}`}>
            <button className="subButton">Select plan</button>
          </Link>
        </div>
        <div className="subItem">
          <h2 className="subTitle">3 days</h2>
          <div className="secondHeader">
            <p className="subDesc">Starting at</p>
            <div className="subPrice"><b className="headerprice">${ threeChecked ? "4.55":"2.27"}</b>/service</div>
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
            checked={threeChecked}
            onChange={handleThreeCheck}
            />
          </div>
          <div>No Wake up</div>
          </div>
          <Link to={`/subscription/3?alwaysOn=${threeChecked}`}>
            <button className="subButton">Select plan</button>
          </Link>
        </div>
        <div className="subItem">
          <h2 className="subTitle">1 week</h2>
          <div className="secondHeader">
            <p className="subDesc">Starting at</p>
            <div className="subPrice"><b className="headerprice">${ weekChecked ? "5.20":"2.60"}</b>/service</div>
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
           checked={weekChecked}
            onChange={handleWeekCheck}
            />
          </div>
          <div>No Wake up</div>
          </div>
          <Link to={`/subscription/7?alwaysOn=${weekChecked}`}>
            <button className="subButton">Select plan</button>
          </Link>
        </div>
        <div className="subItem">
          <h2 className="subTitle">2 weeks</h2>
          <div className="secondHeader">
            <p className="subDesc">Starting at</p>
            <div className="subPrice"><b className="headerprice">${ checked ? "7.80":"5.20"}</b>/service</div>
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
            checked={checked}
            onChange={switchHandler}
            />
          </div>
          <div>No Wake up</div>
          </div>
          <Link to={`/subscription/14?alwaysOn=${checked}`}>
            <button className="subButton">Select plan</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Temperary;
