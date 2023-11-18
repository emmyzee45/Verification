import React, { useEffect } from 'react';
import "./multicheck.css";
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import Notiflix from "notiflix";
import { toast } from "react-toastify";
import { makeRequest } from '../../axios';
import { logOutSuccess, updateUserFailure, updateUserStart, updateUserSuccess } from '../../redux/redux-slices/UserSlice';
import { emptyCart } from '../../redux/redux-slices/cartSlice';
import Footer from '../../components/footer/Footer';

const MultiCheck = () => {
  const {total, products, quantity, duration } = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user.currentUser);
  const isAuthenticated = useSelector((state) => state.user.isLoggedIn);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
 const data = location?.state?.data;

  useEffect(() => {
    !isAuthenticated && navigate('/login', { state: { from: location }, replace: true })
  }, [isAuthenticated])

  const handleBackward = ()=> {
    navigate("/balance")
  }

  const handleBuy = () => {
    confirmDelete()
  }

  const confirmDelete = (id) => {
    Notiflix.Confirm.show(
      "Confirm Purchase!!!",
      "You are about to purchase this products",
      "Ok",
      "Cancel",
      function okCb() {
        handleSubscriptions();
      },
      function cancelCb() {
        console.log("List Canceled");
      },
      {
        width: "320px",
        borderRadius: "3px",
        titleColor: "orangered",
        okButtonBackground: "#1C233F",
        cssAnimationStyle: "zoom",
      }
    );
  };

  const handleSubscriptions = async() => {
    // console.log(data)
    const {areaCode, discountCode, instantAvailability, subscriptionId } = data

    if(user?.balance < parseInt(data?.price) + data?.charges){
      return toast.warn("Insufficient balance")
    }
    
    dispatch(updateUserStart())
      try {
        const res = await makeRequest.post(`subscriptions/multi-purpose-line`, {areaCode, discountCode, instantAvailability, subscriptionId });
        const updateUser = await makeRequest.put(`users/decrease/${user?._id}`, {balance: parseInt(data?.price) + data?.charges});
        dispatch(updateUserSuccess(updateUser.data));
        toast.success("Subscription Successful")
    }catch(err) {
      if (!err?.response) {
        toast.error('No Server Response');
    }  else if (err.response?.status === 401) {
      dispatch(updateUserFailure())
      dispatch(logOutSuccess());
      navigate('/login', { state: { from: location }, replace: true });
    } else {
        toast.error('Something went wrong');
        dispatch(updateUserFailure())
    }
    }
  }

  return (
    <>
    <div className='checkoutContainer'>
        <h1 className='checkoutTitle'>Confirm Subscription Purchase</h1>
      <div className='checkItem'>
        <div className="checkItems heading">
            <div className='heading-item'>Service</div>
            <div className='heading-item fee-button'>Activation Fee</div>
            <div className='heading-item heading-right'>Renewal Price</div>
            <div className='heading-item'>Custom Order Fee</div>
        </div>
        <div className="checkItems boding" >
            <div className='bodyItems body-item-left'>
            Multipurpose Line
            </div>
            <div className='bodyItems fee-button'>Waived</div>
            <div className='bodyItems'>${data?.price}</div>
            <div className='bodyItems'>{data?.charges}</div>
        </div>
      </div>
      <div className="service-header">Summary</div>
      <div className="service-items">
        <div className="service-item">
            <div className="service-text">Activation Fee</div>
            <div className="service-text">Waived</div>
        </div>
        {data?.areaCode && (
          <div className="service-item">
            <div className="service-text">Customization Fees (Selected Area Code {data?.areaCode > 0 ? data?.areaCode : "Nill" } )</div>
            <div className="service-text">{data?.charges}</div>
        </div>
        )}
        <div className="service-item">
            <div className="service-text">Porated Fees</div>
            <div className="service-text">${data?.price}</div>
        </div>
        <div className="service-item">
            <div className="service-text">Discounts</div>
            <div className="service-text">$0.00</div>
        </div>
        <div className="service-item">
            <div className="service-text">Total Due Today</div>
            <div className="service-text">${parseInt(data?.price) + data?.charges}</div>
        </div>
        <div className="service-item">
            <div className="service-text">Estimated Monthly Charges</div>
            <div className="service-text">${data?.price}</div>
        </div>
      </div>
      <div className='checkButtons'>
        <button className='checkBuyButton' onClick={handleBuy}>Buy</button> 
        {/* {user?.balance >= 85 ? (
        ): user.balance >= 65 ? (
            <button className='checkBuyButton' onClick={handleBuy}>Buy</button> 
        ): (
            <button className='checkBuyButton' onClick={handleBackward}>Top up</button>
        ) } */}
      </div>
    </div>
      <Footer />
    </>
  );
}

export default MultiCheck;
