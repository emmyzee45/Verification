import React, { useEffect, useState } from 'react';
import "./permanentSub.css"
import { useLocation, useParams } from 'react-router-dom';
import { makeRequest } from '../../axios';
import { useDispatch, useSelector } from 'react-redux';
import { getSubscriptionFailure, getSubscriptionStart, getSubscriptionSuccess } from '../../redux/redux-slices/SubscriptionSlice';
import { addProduct, emptyCart, removeCart, updateCart } from '../../redux/redux-slices/cartSlice';
import SearchBar from '../../components/searchbox/SearchBar';

const PermanentSub = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const [searchText, setSearchText] = useState(null);
    const [filteredSub, setFilteredSub ] = useState([]);
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
                const res = await makeRequest.get(`subscriptions/reservations/catalog?instantAvailability=${alwaysOn}`);
                dispatch(getSubscriptionSuccess(res.data.advertisedTargets))
            }catch(er) {
                dispatch(getSubscriptionFailure())
            }
        }
        getSubscriptions();
    }, [alwaysOn, dispatch])

    useEffect(() => {
        searchText && setFilteredSub(
            subscriptions?.filter((item) => item.name.toLowerCase().includes(searchText.toLowerCase()))
        )
    }, [searchText])

    const handleAdd = (product) => {
        const price = alwaysOn == "true" ? product?.baseAlwaysOnRenewalPrice?.amount : product?.baseRenewalPrice?.amount;
        dispatch(addProduct({...product, quantity, price: (price + 30/100 * price).toFixed(2)}))
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
      <h1 className='subsTitle'>Available Services</h1>
      <SearchBar setSearchText={setSearchText} />
      <div>
        <thead>
            <tr>
                <td>Name</td>
                <td>Monthly Price </td>
                <td></td>
            </tr>
        </thead>
        <tbody>
           {filteredSub.length ? (
            filteredSub.map((item) => {
                return (
                    <tr key={item?.targetId}>
                        <td><img src={`https://www.phoneblur.com${item?.iconUri}`} className='subIcon'/>{item?.name}</td>
                            <td className='price'>${alwaysOn == "true" ? (item?.baseAlwaysOnRenewalPrice?.amount + 30/100 * item?.baseAlwaysOnRenewalPrice?.amount).toFixed(2) : (item?.baseRenewalPrice?.amount + 30/100 * item?.baseRenewalPrice?.amount).toFixed(2)}</td>
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
               })
           ):(
            subscriptions.map((item) => {
                return (
                    <tr key={item?.targetId}>
                        <td><img src={`https://www.phoneblur.com${item?.iconUri}`} className='subIcon'/>{item?.name}</td>
                            <td className='price'>${alwaysOn == "true" ? (item?.baseAlwaysOnRenewalPrice?.amount + 30/100 * item?.baseAlwaysOnRenewalPrice?.amount).toFixed(2) : (item?.baseRenewalPrice?.amount + 30/100 * item?.baseRenewalPrice?.amount).toFixed(2)}</td>
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
               })
           )}
        </tbody>
      </div>
    </div>
  );
}

export default PermanentSub;
