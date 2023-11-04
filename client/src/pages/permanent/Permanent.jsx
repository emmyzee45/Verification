import React, { useEffect, useState } from "react";
import './permanent.css'
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import SingleLine from "../../components/singleLine/SingleLine";
import MultiPurpose from "../../components/multiPurpose/MultiPurpose";
import { useSelector } from "react-redux";

const Permanent = () => {
  const params = useParams();
  const category = params.category;
  const isAuthenticated = useSelector((state) => state.user.isLoggedIn);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    !isAuthenticated && navigate('/login', { state: { from: location }, replace: true })
}, [isAuthenticated])

  return (
      <div>
        <h1 className="subtitle">Renewable Plans</h1>
        {category === "isSingle" ? <SingleLine />: <MultiPurpose /> }
      </div>
  );
};

export default Permanent;
