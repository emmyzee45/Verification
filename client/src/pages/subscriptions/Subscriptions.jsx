import React, { useEffect, useState } from 'react';
import "./subscriptions.css"
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { makeRequest } from '../../axios';
import { useDispatch, useSelector } from 'react-redux';
import { getSubscriptionFailure, getSubscriptionStart, getSubscriptionSuccess } from '../../redux/redux-slices/SubscriptionSlice';
import { addProduct, emptyCart, removeCart, updateCart } from '../../redux/redux-slices/cartSlice';
import SearchBar from '../../components/searchbox/SearchBar';
import Skeleton from '../../components/skeleton/Skeleton';

const Subscriptions = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [price, setPrice ]  = useState(0)
    const [quantity, setQuantity] = useState(1);
    const [searchText, setSearchText ] = useState(null);
    const [filteredSub, setFilteredSub ] = useState([]);
    const [subscriptions, setSubscriptions ] = useState([]);

    const products = useSelector((state) => state.cart.products);
    const productIds = useSelector((state) => state.cart.products.map((item) => item.targetId));
    // const subscriptions = useSelector((state) => state.subscription.subscriptions);
    const isAuthenticated = useSelector((state) => state.user.isLoggedIn)
    const params = useParams()
    const navigate = useNavigate()
    const location = useLocation();
    const alwaysOn = location.search.split("=")[1]

    const dispatch = useDispatch()
    const category = params.category;

    useEffect(() => {
        !isAuthenticated && navigate('/login', { state: { from: location }, replace: true })
    }, [isAuthenticated])
    useEffect(() => {
        const getSubscriptions = async() => {
            setIsLoading(true)
            try {
                const res = await makeRequest.get(`/subscriptions/reservations/catalog/duration?duration=${category}:00:00:00&instantAvailability=${alwaysOn}`);
                setSubscriptions(res.data.advertisedTargets);
                setIsLoading(false)
            }catch(er) {
                setIsLoading(false)
            }
        }
        getSubscriptions();
    }, [category, alwaysOn])

    useEffect(() => {
        setFilteredSub(subscriptions.filter((item) => item?.name?.toLowerCase().includes(searchText?.toLowerCase())))
    }, [searchText])

    const handleAdd = (product) => {
        const threeOn = product?.baseAlwaysOnPriceThreeDay?.amount;
        const oneOn = product?.baseAlwaysOnPriceOneDay?.amount;
        const sevenOn = product?.baseAlwaysOnPriceOneWeek?.amount;
        const fourteenOn = product?.baseAlwaysOnPriceTwoWeek?.amount;
        const one = product?.basePriceOneDay?.amount;
        const three = product?.basePriceThreeDay?.amount;
        const seven = product?.basePriceOneWeek?.amount;
        const fourteen = product?.basePriceTwoWeek?.amount;
        const price = category == 1 && alwaysOn === "true" ? oneOn: category == 3 && alwaysOn === "true" ? threeOn : category == 7 && alwaysOn === "true" ? sevenOn : category == 14 && alwaysOn === "true" ? fourteenOn : category == 1 ? one : category == 3 ? three : category == 7 ? seven : fourteen;
        dispatch(addProduct({...product, quantity, price: (price + 170/100 * price).toFixed(2), duration: `${category}:00:00:00`}))
    }

    const handleUpdate = (id) => {
        const product = products.filter((product) => product?.targetId === id)[0];
        dispatch(updateCart({...product, quantity, tempQuantity: quantity - product.quantity}))
    }

    const handleRemoveCart = (id) => {
        const product = products.filter((product) => product?.targetId === id)[0];
        dispatch(removeCart({...product, id}))
    }

    return (
    <div className='subsContainer'>
      <h1 className='subsTitle'>Available Services</h1>
      <SearchBar setSearchText={setSearchText} />
      <div className='table-subs'>
            <div className='table-head'>
                <div className='table-head-name'>Name</div>
                <div className='table-head-price'>Cost Per {category == 7 ? "1 week": category > 7 ? "2 weeks" : category == 1 ? "1 day": `3 days`} </div>
                <div></div>
            </div>
            {isLoading ? (
                <div className='sub-loader'>
                    <Skeleton type="custom" />
                </div>
            ): (
                <>
                    {filteredSub.length ? (
            filteredSub?.map((item) => {
                return (
                    <div key={item?.targetId} className='table-tr'>
                        <div className='name table-td'><img src={`https://www.phoneblur.com${item?.iconUri}`} className='subIcon'/>{item?.name}</div>
                            {category == 1 && alwaysOn === "true" ? (
                                <div className='price table-td'>${(item?.baseAlwaysOnPriceOneDay?.amount + 170/100 * item?.baseAlwaysOnPriceOneDay?.amount).toFixed(2)}</div>
                            ): category == 3 && alwaysOn === "true" ? (
                                <div className='price table-td'>${(item?.baseAlwaysOnPriceThreeDay?.amount + 170/100 * item?.baseAlwaysOnPriceThreeDay?.amount).toFixed(2)}</div>
                            ): category == 7 && alwaysOn === "true" ? (
                                <div className='price table-td'>${(item?.baseAlwaysOnPriceOneWeek?.amount + 170/100 * item?.baseAlwaysOnPriceOneWeek?.amount).toFixed(2)}</div>
                            ): category == 14 && alwaysOn === "true" ? (
                                <div className='price table-td'>${(item?.baseAlwaysOnPriceTwoWeek?.amount + 170/100 * item?.baseAlwaysOnPriceTwoWeek?.amount).toFixed(2)}</div>
                            ): category == 1 ? (
                                <div className='price table-td'>${(item?.basePriceOneDay?.amount + 170/100 * item?.basePriceOneDay?.amount).toFixed(2)}</div>
                            ): category == 3 ? (
                                <div className='price table-td'>${(item?.basePriceThreeDay?.amount + 170/100 * item?.basePriceThreeDay?.amount).toFixed(2)}</div>
                            ): category == 7 ? (
                                <div className='price table-td'>${(item?.basePriceOneWeek?.amount + 170/100 * item?.basePriceOneWeek?.amount).toFixed(2)}</div>
                            ): (
                                <div className='price table-td'>${(item?.basePriceTwoWeek?.amount + 170/100 * item?.basePriceTwoWeek?.amount).toFixed(2)}</div>
                            )}
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
            subscriptions?.map((item) => {
                return (
                    <div key={item?.targetId} className='table-tr'>
                        <div className='name'><img src={`https://www.phoneblur.com${item?.iconUri}`} className='subIcon'/>{item?.name}</div>
                            {category == 1 && alwaysOn === "true" ? (
                                <div className='price table-td'>${(item?.baseAlwaysOnPriceOneDay?.amount + 170/100 * item?.baseAlwaysOnPriceOneDay?.amount).toFixed(2)}</div>
                            ): category == 3 && alwaysOn === "true" ? (
                                <div className='price table-td'>${(item?.baseAlwaysOnPriceThreeDay?.amount + 170/100 * item?.baseAlwaysOnPriceThreeDay?.amount).toFixed(2)}</div>
                            ): category == 7 && alwaysOn === "true" ? (
                                <div className='price table-td'>${(item?.baseAlwaysOnPriceOneWeek?.amount + 170/100 * item?.baseAlwaysOnPriceOneWeek?.amount).toFixed(2)}</div>
                            ): category == 14 && alwaysOn === "true" ? (
                                <div className='price table-td'>${(item?.baseAlwaysOnPriceTwoWeek?.amount + 170/100 * item?.baseAlwaysOnPriceTwoWeek?.amount).toFixed(2)}</div>
                            ): category == 1 ? (
                                <div className='price table-td'>${(item?.basePriceOneDay?.amount + 170/100 * item?.basePriceOneDay?.amount).toFixed(2)}</div>
                            ): category == 3 ? (
                                <div className='price table-td'>${(item?.basePriceThreeDay?.amount + 170/100 * item?.basePriceThreeDay?.amount).toFixed(2)}</div>
                            ): category == 7 ? (
                                <div className='price table-td'>${(item?.basePriceOneWeek?.amount + 170/100 * item?.basePriceOneWeek?.amount).toFixed(2)}</div>
                            ): (
                                <div className='price table-td'>${(item?.basePriceTwoWeek?.amount + 170/100 * item?.basePriceTwoWeek?.amount).toFixed(2)}</div>
                            )}
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
                </>
            )}
      </div>
    </div>
  );
}

export default Subscriptions;
