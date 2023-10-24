import React, { useEffect, useState } from 'react';
import "./permanentSub.css"
import { useLocation, useParams } from 'react-router-dom';
import { makeRequest } from '../../axios';
import { useDispatch, useSelector } from 'react-redux';
import { getSubscriptionFailure, getSubscriptionStart, getSubscriptionSuccess } from '../../redux/redux-slices/SubscriptionSlice';
import { addProduct, emptyCart, removeCart, updateCart } from '../../redux/redux-slices/cartSlice';

const PermanentSub = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const products = useSelector((state) => state.cart.products);
    const productIds = useSelector((state) => state.cart.products.map((item) => item.targetId));
    const subscriptions = useSelector((state) => state.subscription.subscriptions);

    const location = useLocation();
    const alwaysOn = location.search.split("=")[1]
    const dispatch = useDispatch()

    useEffect(() => {
        const getSubscriptions = async() => {
            dispatch(getSubscriptionStart())
            try {
                const res = await makeRequest.get(`/temporary-rentals/reservations/catalog?instantAvailability=${alwaysOn}`);
               console.log(res.data.advertisedTargets)
                dispatch(getSubscriptionSuccess(res.data.advertisedTargets))
            }catch(er) {
                dispatch(getSubscriptionFailure())
            }
        }
        getSubscriptions();
    }, [alwaysOn, dispatch])

    const handleAdd = (product) => {
        const price = alwaysOn ? product?.baseAlwaysOnRenewalPrice?.amount : product?.baseRenewalPrice?.amount;
        dispatch(addProduct({...product, quantity, price}))
    }

    const handleUpdate = (id) => {
        const product = products.filter((product) => product.targetId === id)[0];
        dispatch(updateCart({...product, quantity, tempQuantity: quantity - product.quantity}))
    }
    const handleRemoveCart = (id) => {
        const product = products.filter((product) => product.targetId === id)[0];
        dispatch(removeCart({...product, id}))
    }
    const handleEmptyCart = () => {
        dispatch(emptyCart())
    }
    return (
    <div className='subsContainer'>
      <h1 className='subsTitle'>AVailable Services</h1>
      <table>
        <thead>
            <tr>
                <td>Name</td>
                <td>Monthly Price </td>
                <td></td>
            </tr>
        </thead>
        <tbody>
           {subscriptions.map((item) => {
            return (
                <tr key={item?.targetId}>
                    <td><img src={`https://www.phoneblur.com${item?.iconUri}`} className='subIcon'/>{item?.name}</td>
                        <td className='price'>${item.alwaysOn ? item?.baseAlwaysOnRenewalPrice?.amount : item?.baseRenewalPrice?.amount}</td>
                    <td className='subsActions'>
                        <input type='number' min={1} className='actionsInput' name='quantity' onChange={(e)=> setQuantity(e.target.value)} />
                        {productIds.includes(item.targetId) ? (
                            <>
                                <button className='addButton warning' onClick={() => handleUpdate(item.targetId)}>Update</button>
                                <button className='addButton danger' onClick={() => handleRemoveCart(item.targetId)}>Remove</button>
                            </>
                        ): (
                            <button className='addButton' onClick={() => handleAdd(item)}>Add</button>

                        )}
                    </td>
                </tr>
            )
           })}
        </tbody>
      </table>
    </div>
  );
}

export default PermanentSub;
