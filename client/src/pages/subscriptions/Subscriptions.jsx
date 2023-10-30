import React, { useEffect, useState } from 'react';
import "./subscriptions.css"
import { useLocation, useParams } from 'react-router-dom';
import { makeRequest } from '../../axios';
import { useDispatch, useSelector } from 'react-redux';
import { getSubscriptionFailure, getSubscriptionStart, getSubscriptionSuccess } from '../../redux/redux-slices/SubscriptionSlice';
import { addProduct, emptyCart, removeCart, updateCart } from '../../redux/redux-slices/cartSlice';

const Subscriptions = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [price, setPrice ]  = useState(0)
    const [quantity, setQuantity] = useState(1);
    const products = useSelector((state) => state.cart.products);
    const productIds = useSelector((state) => state.cart.products.map((item) => item.targetId));
    const subscriptions = useSelector((state) => state.subscription.subscriptions);
    const params = useParams()
    console.log(params)
    const location = useLocation();
    console.log(location)
    const alwaysOn = location.search.split("=")[1]

    const dispatch = useDispatch()
    const category = params.category;

    useEffect(() => {
        const getSubscriptions = async() => {
            dispatch(getSubscriptionStart())
            try {
                const res = await makeRequest.get(`/temporary-rentals/reservations/catalog/duration?duration=${category}:00:00:00&instantAvailability=${alwaysOn}`);
               console.log(res.data.advertisedTargets)
                dispatch(getSubscriptionSuccess(res.data.advertisedTargets))
            }catch(er) {
                console.log(er)
                dispatch(getSubscriptionFailure())
            }
        }
        getSubscriptions();
    }, [category, alwaysOn, dispatch])

    const handleAdd = (product) => {
        const threeOn = product?.baseAlwaysOnPriceThreeDay?.amount;
        const oneOn = product?.baseAlwaysOnPriceOneDay?.amount;
        const sevenOn = product?.baseAlwaysOnPriceOneWeek?.amount;
        const fourteenOn = product?.baseAlwaysOnPriceTwoWeek?.amount;
        const one = product?.basePriceOneDay?.amount;
        const three = product?.basePriceThreeDay?.amount;
        const seven = product?.basePriceOneWeek?.amount;
        const fourteen = product?.basePriceTwoWeek?.amount;
        const price = category == 1 && alwaysOn ? oneOn: category == 3 && alwaysOn ? threeOn : category == 7 && alwaysOn ? sevenOn : category == 14 && alwaysOn ? fourteenOn : category == 1 ? one : category == 3 ? three : category == 7 ? seven : fourteen;
        dispatch(addProduct({...product, quantity, price, duration: `${category}:00:00:00`}))
    }

    const handleUpdate = (id) => {
        const product = products.filter((product) => product?.targetId === id)[0];
        dispatch(updateCart({...product, quantity, tempQuantity: quantity - product.quantity}))
    }
    const handleRemoveCart = (id) => {
        const product = products.filter((product) => product?.targetId === id)[0];
        dispatch(removeCart({...product, id}))
    }
    const handleEmptyCart = () => {
        dispatch(emptyCart())
    }
    return (
    <div className='subsContainer'>
      <h1 className='subsTitle'>Available Services</h1>
      <table>
        <thead>
            <tr>
                <td>Name</td>
                <td>Cost Per {category == 7 ? "1 week": category > 7 ? "2 weeks" : category == 1 ? "1 day": `3 days`} </td>
                <td></td>
            </tr>
        </thead>
        <tbody>
           {subscriptions?.map((item) => {
            return (
                <tr key={item?.targetId}>
                    <td><img src={`https://www.phoneblur.com${item?.iconUri}`} className='subIcon'/>{item?.name}</td>
                        {category == 1 && alwaysOn ? (
                            <td className='price'>${item?.baseAlwaysOnPriceOneDay?.amount}</td>
                        ): category == 3 && alwaysOn ? (
                            <td className='price'>${item?.baseAlwaysOnPriceThreeDay?.amount}</td>
                        ): category == 7 && alwaysOn ? (
                            <td className='price'>${item?.baseAlwaysOnPriceOneWeek?.amount}</td>
                        ): category == 14 && alwaysOn ? (
                            <td className='price'>${item?.baseAlwaysOnPriceTwoWeek?.amount}</td>
                        ): category == 1 ? (
                            <td className='price'>${item?.basePriceOneDay?.amount}</td>
                        ): category == 3 ? (
                            <td className='price'>${item?.basePriceThreeDay?.amount}</td>
                        ): category == 7 ? (
                            <td className='price'>${item?.basePriceOneWeek?.amount}</td>
                        ): (
                            <td className='price'>${item?.basePriceTwoWeek?.amount}</td>
                        )}
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

export default Subscriptions;
