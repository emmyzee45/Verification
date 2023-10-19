import React, { useEffect, useState } from 'react';
import "./subscriptions.css"
import { useParams } from 'react-router-dom';
import { makeRequest } from '../../axios';
import { useDispatch, useSelector } from 'react-redux';
import { getSubscriptionFailure, getSubscriptionStart, getSubscriptionSuccess } from '../../redux/redux-slices/SubscriptionSlice';
import { addProduct, emptyCart, removeCart, updateCart } from '../../redux/redux-slices/cartSlice';

const Subscriptions = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const products = useSelector((state) => state.cart.products);
    const productIds = useSelector((state) => state.cart.products.map((item) => item._id));
    const subscriptions = useSelector((state) => state.subscription.subscriptions);

    const params = useParams()
    const dispatch = useDispatch()
    const category = params.category;

    useEffect(() => {
        const getSubscriptions = async() => {
            dispatch(getSubscriptionStart())
            try {
                const res = await makeRequest.get(`subscriptions?${category}=true`);
                dispatch(getSubscriptionSuccess(res.data))
            }catch(er) {
                dispatch(getSubscriptionFailure())
            }
        }
        getSubscriptions();
    }, [category])

    const handleAdd = (product) => {
        dispatch(addProduct({...product, quantity}))
    }

    const handleUpdate = (id) => {
        const product = products.filter((product) => product._id === id)[0];
        dispatch(updateCart({...product, quantity, tempQuantity: quantity - product.quantity}))
    }
    const handleRemoveCart = (id) => {
        const product = products.filter((product) => product._id === id)[0];
        dispatch(removeCart(product))
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
                <td>Monthly Price</td>
                <td></td>
            </tr>
        </thead>
        <tbody>
           {subscriptions.map((item) => {
            return (
                <tr key={item._id}>
                    <td>{item.name}</td>
                        <td className='price'>${item.price}</td>
                    <td className='subsActions'>
                        <input type='number' min={1} className='actionsInput' name='quantity' onChange={(e)=> setQuantity(e.target.value)} />
                        {productIds.includes(item._id) ? (
                            <>
                                <button className='addButton warning' onClick={() => handleUpdate(item._id)}>Update</button>
                                <button className='addButton danger' onClick={() => handleRemoveCart(item._id)}>Remove</button>
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
