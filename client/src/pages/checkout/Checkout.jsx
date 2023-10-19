import React from 'react';
import "./checkout.css";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Notiflix from "notiflix";
import { makeRequest } from '../../axios';
import { updateUserFailure, updateUserStart, updateUserSuccess } from '../../redux/redux-slices/UserSlice';
import { emptyCart } from '../../redux/redux-slices/cartSlice';

const Checkout = () => {
  const {total, products, quantity } = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user.currentUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleBackward = ()=> {
    navigate("/subscription")
  }

  const handleBuy = () => {
    confirmDelete()
  }

  const confirmDelete = (id) => {
    Notiflix.Confirm.show(
      "Purchase Products!!!",
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
    dispatch(updateUserStart())
    try {
      const res = await makeRequest.put(`users/${user._id}`, 
        {
          balance: user.balance - total, 
          subscriptionIds: products.map((item) => item._id)
        }
      );
      dispatch(updateUserSuccess(res.data));
      dispatch(emptyCart())
    }catch(err) {
      dispatch(updateUserFailure())
    }
  }

  return (
    <div className='checkoutContainer'>
        <h1 className='checkoutTitle'>Confirm Subscription Purchase</h1>
      <div className='checkItem'>
        <div className="checkItems heading">
            <div>Service</div>
            <div>Prorated Charges</div>
            <div>Renewal Price</div>
        </div>
        {products.map((product) => {
          return (
            <div className="checkItems boding" key={product._id}>
              <div>{product.name}</div>
              <div className='bodyItems'>{product.price} X {product.quantity}</div>
              <div className='bodyItems'>${product.price * product.quantity}</div>
            </div>
          )
        })}
        <div className="checkItems checkTotal">
            <div>Total</div>
            <div className='bodyItems'>${total}</div>
        </div>
      </div>
      <div className='checkButtons'>
        <button className='checkBuyButton' onClick={handleBuy}>Buy</button> 
        <button className='checkBuyButton' onClick={handleBackward}>Go back</button> 
      </div>
    </div>
  );
}

export default Checkout;
