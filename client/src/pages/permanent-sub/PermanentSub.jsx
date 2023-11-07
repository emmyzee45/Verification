import React, { useEffect, useState } from 'react';
import "./permanentSub.css"
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { makeRequest } from '../../axios';
import { useDispatch, useSelector } from 'react-redux';
import { getSubscriptionFailure, getSubscriptionStart, getSubscriptionSuccess } from '../../redux/redux-slices/SubscriptionSlice';
import { addProduct, emptyCart, removeCart, updateCart } from '../../redux/redux-slices/cartSlice';
import SearchBar from '../../components/searchbox/SearchBar';
import Skeleton from '../../components/skeleton/Skeleton';

const PermanentSub = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const [searchText, setSearchText ] = useState(null);
    const [subscriptions, setSubscriptions ] = useState([]);
    const [filteredSub, setFilteredSub ] = useState([]);

    const products = useSelector((state) => state.cart.products);
    const isAuthenticated = useSelector((state) => state.user.isLoggedIn)
    const productIds = useSelector((state) => state.cart.products.map((item) => item.targetId));
    // const subscriptions = useSelector((state) => state.subscription.subscriptions);

    const location = useLocation();
    const alwaysOn = location.search.split("=")[1]
    const dispatch = useDispatch()
    const navigate = useNavigate();

    useEffect(() => {
      !isAuthenticated && navigate('/login', { state: { from: location }, replace: true })
  }, [isAuthenticated])

    useEffect(() => {
        const getSubscriptions = async() => {
            // dispatch(getSubscriptionStart())
            setIsLoading(true)
            try {
                const res = await makeRequest.get(`subscriptions/reservations/catalog?instantAvailability=${alwaysOn}`);
                setSubscriptions(res.data.advertisedTargets)
                setIsLoading(false)
            }catch(er) {
                setIsLoading(false)
                // dispatch(getSubscriptionFailure())
            }
        }
        getSubscriptions();
    }, [alwaysOn])

    useEffect(() => {
        setFilteredSub(subscriptions.filter((item) => item?.name?.toLowerCase().includes(searchText?.toLowerCase())))
    }, [searchText])

    const handleAdd = (product) => {
        const price = alwaysOn ? product?.baseAlwaysOnRenewalPrice?.amount : product?.baseRenewalPrice?.amount;
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
      <div className='table-subs'>
            <div className='table-head'>
                <div className='table-head-name'>Name</div>
                <div className='table-head-price'>Monthly Price </div>
            </div>
            {isLoading ? (
                <div className='sub-loader'>
                    <Skeleton type='custom'/>
                    {/* <img src='/img/icons/gears.gif' alt='' /> */}
                </div>
            ): (
                <div>
                    {filteredSub.length ? (
            filteredSub.map((item) => {
                return (
                    <div key={item?.targetId} className='table-tr'>
                        <div className='name table-td'><img src={`https://www.phoneblur.com${item?.iconUri}`} className='subIcon'/>{item?.name}</div>
                            <div className='price table-td'>${item.alwaysOn ? (item?.baseAlwaysOnRenewalPrice?.amount + 30/100 * item?.baseAlwaysOnRenewalPrice?.amount).toFixed(2) : (item?.baseRenewalPrice?.amount + 30/100 * item?.baseRenewalPrice?.amount).toFixed(2)}</div>
                        <div className='subsActions'>
                            <input type='number' min={1} className='actionsInput' name='quantity' onChange={(e)=> setQuantity(e.target.value)} />
                            {productIds.includes(item.targetId) ? (
                                <>
                                    <button className='addButton warning' onClick={() => handleUpdate(item.targetId)}>Update</button>
                                    <button className='addButton danger' onClick={() => handleRemoveCart(item.targetId)}>Remove</button>
                                </>
                            ): (
                                <button className='addButton' onClick={() => handleAdd(item)}>Add</button>
    
                            )}
                        </div>
                    </div>
                )
               })
           ):(
            subscriptions.map((item) => {
                return (
                    <div key={item?.targetId} className='table-tr'>
                        <div className='name table-td'><img src={`https://www.phoneblur.com${item?.iconUri}`} className='subIcon'/>{item?.name}</div>
                            <div className='price table-td'>${item.alwaysOn ? (item?.baseAlwaysOnRenewalPrice?.amount + 30/100 * item?.baseAlwaysOnRenewalPrice?.amount).toFixed(2) : (item?.baseRenewalPrice?.amount + 30/100 * item?.baseRenewalPrice?.amount).toFixed(2)}</div>
                        <div className='subsActions'>
                            <input type='number' min={1} className='actionsInput' name='quantity' onChange={(e)=> setQuantity(e.target.value)} />
                            {productIds.includes(item.targetId) ? (
                                <>
                                    <button className='addButton warning' onClick={() => handleUpdate(item.targetId)}>Update</button>
                                    <button className='addButton danger' onClick={() => handleRemoveCart(item.targetId)}>Remove</button>
                                </>
                            ): (
                                <button className='addButton' onClick={() => handleAdd(item)}>Add</button>
    
                            )}
                        </div>
                    </div>
                )
               })
           )}
                </div>
            )}
      </div>
    </div>
  );
}

export default PermanentSub;
