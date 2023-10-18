import React, { useEffect, useState } from 'react';
import "./subscriptions.css"
import { useParams } from 'react-router-dom';
import { makeRequest } from '../../axios';
import { useDispatch, useSelector } from 'react-redux';
import { getSubscriptionFailure, getSubscriptionStart, getSubscriptionSuccess } from '../../redux/redux-slices/SubscriptionSlice';

const Subscriptions = () => {
    const [isOpen, setIsOpen] = useState(false)
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

    return (
    <div className='subsContainer'>
      <h1 className='subsTitle'>AVailable Servicers</h1>
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
                        <input type='number' min={1} className='actionsInput' />
                        <button className='addButton'>Add</button>
                        <button className='addButton warning'>Update</button>
                        <button className='addButton danger'>Remove</button>
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
