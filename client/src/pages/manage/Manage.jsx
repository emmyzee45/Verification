import React, { useEffect, useState } from 'react';
import "./manage.css"
import Permanent from '../../components/permanent/Permanent';
import Temperal from '../../components/temperal/Temperal';
import { makeRequest } from '../../axios';
import { useDispatch, useSelector } from "react-redux";
import { getSubscriptionFailure, getSubscriptionStart, getSubscriptionSuccess } from '../../redux/redux-slices/SubscriptionSlice';

const Manage = () => {
  const [isOpen, setIsOpen ] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);
  const subscriptions = useSelector((state) => state.subscription.subscriptions);
  const permanentSub = subscriptions.filter((item) => item.isPermanent == true || item.isMulti == true && user.subscriptionIds.includes(item._id))
  const temperalSub = subscriptions.filter((item) => item.isTemperal == true && user.subscriptionIds.includes(item._id))
  
  useEffect(() => {
    const getSubscriptions = async() => {
      dispatch(getSubscriptionStart())
      try {
        const res = await makeRequest.get("subscriptions");
        console.log(res.data)
        dispatch(getSubscriptionSuccess(res.data))
      }catch(err) {
        dispatch(getSubscriptionFailure())
      }
    }
    getSubscriptions();
  },[])

  return (
    <div className='manageContainer'>
      <div className="manageTop">
        <h1 className="manageTitle">Subscriptions</h1>
        <div className='manageButton' style={{backgroundColor: isOpen ? "gray": "rgb(236, 230, 230)"}} onClick={()=> setIsOpen(true)}>Permanent</div>
        <div className='manageButton' style={{backgroundColor: !isOpen ? "gray": "rgb(236, 230, 230)"}} onClick={() => setIsOpen(false)}>Temperary</div>
      </div>
      {isOpen ? (
        <Permanent subscriptions={permanentSub} />
      ):(
        <Temperal subscriptions={temperalSub} />
      )}
    </div>
  );
}

export default Manage;
