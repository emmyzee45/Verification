import React, { useState } from "react";
import './permanent.css'
import { Link, useParams } from "react-router-dom";
import SingleLine from "../../components/singleLine/SingleLine";
import MultiPurpose from "../../components/multiPurpose/MultiPurpose";

const Permanent = () => {
  const params = useParams();
  const category = params.category;

  return (
      <div>
        <h1 className="subtitle">Renewable (Permanent) Single Service Subscription Plans</h1>
        {category === "isSingle" ? <SingleLine />: <MultiPurpose /> }
      </div>
      
  );
};

export default Permanent;
