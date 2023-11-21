import React, { useEffect } from 'react';
import "./checkout.css";
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import Notiflix from "notiflix";
import { toast } from "react-toastify";
import { makeRequest } from '../../axios';
import { logOutSuccess, updateUserFailure, updateUserStart, updateUserSuccess } from '../../redux/redux-slices/UserSlice';
import { emptyCart } from '../../redux/redux-slices/cartSlice';
import Footer from '../../components/footer/Footer';

const Checkout = () => {
  const {total, products, quantity, duration } = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user.currentUser);
  const isAuthenticated = useSelector((state) => state.user.isLoggedIn);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    !isAuthenticated && navigate('/login', { state: { from: location }, replace: true })
  }, [isAuthenticated])

  const handleBackward = ()=> {
    dispatch(emptyCart())
    // navigate("/subscription")
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
  // 1fcfd03a-2efb-4c92-9f87-4ecaff9cec49
  const handleSubscriptions = async() => {
    const data = {
      targets: products.map((item) => item.targetId),
      reserveOnSameNumber: true,
      instantAvailability: products[0].alwaysOn,
      duration
    }
    if(user.balance < total) return toast.error("Insufficient balance");
    dispatch(updateUserStart())
    try {
      const res = await makeRequest.post( 
        products[0].basePriceOneDay 
        ? `subscriptions/reservations/create` 
        : `subscriptions/single-service`, data
        );
      const updateUser = await makeRequest.put(`users/decrease/${user._id}`, {balance: parseInt(total?.toFixed(2))});
      dispatch(updateUserSuccess(updateUser.data));
      dispatch(emptyCart())
      toast.success("Transaction successful")
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
    <div className=''>
      <div className='checkout-item-container'>
        <h1 className='checkoutTitle'>Confirm Subscription Purchase</h1>
      <div className='checkItem'>
        <div className="checkItems heading">
            <div className='heading-item'>Service</div>
            <div className='heading-item'>Prorated Charges</div>
            <div className='heading-item heading-right'>Renewal Price</div>
        </div>
        {products.map((product) => {
          return (
            <div className="checkItems boding" key={product.targetId}>
              <div className='bodyItems body-item-left'>
                <img src={`https://www.phoneblur.com${product?.iconUri}`} className='subIcon'/>
                {product.name}
              </div>
              <div className='bodyItems '>{product.price} X {product.quantity}</div>
              <div className='bodyItems'>${product.price * product.quantity}</div>
            </div>
          )
        })}
        <div className="checkItems checkTotal">
            <div className='bodyItems'>Total</div>
            <div className='bodyItems'></div>
            <div className='bodyItems'>${total?.toFixed(2)}</div>
        </div>
      </div>
      <div className='checkButtons'>
        <button className='checkBuyButton' onClick={handleBuy}>Buy</button> 
        <button className='checkBuyButton' onClick={handleBackward}>Clear Cart</button> 
      </div>
      </div>
    </div>
    <Footer />
    </>
  );
}

export default Checkout;
