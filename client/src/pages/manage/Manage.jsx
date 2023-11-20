import React, { useEffect, useState } from 'react';
import "./manage.css"
import Permanent from '../../components/permanent/Permanent';
import Temperal from '../../components/temperal/Temperal';
import { makeRequest } from '../../axios';
import { useDispatch, useSelector } from "react-redux";
import { getSubscriptionFailure, getSubscriptionStart, getSubscriptionSuccess } from '../../redux/redux-slices/SubscriptionSlice';
import Skeleton from "../../components/skeleton/Skeleton";
import { useLocation, useNavigate } from 'react-router-dom';
import Footer from '../../components/footer/Footer';

const Manage = () => {
  const [isOpen, setIsOpen ] = useState(false);
  const [isLoading, setIsLoading ] = useState(false);
  const [ temperarySub, setTemperarySub ] = useState([]);
  const [ permanent, setPermanent ] = useState([]);

  const user = useSelector((state) => state.user.currentUser);
  const isAuthenticated = useSelector((state) => state.user.isLoggedIn);
  const permanentSub = permanent.filter((item) => user?.subscriptionIds?.includes(item.id))
  const temperalSub = temperarySub.filter((item) => user?.subscriptionIds?.includes(item.id))
  
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    !isAuthenticated && navigate('/login', { state: { from: location }, replace: true })
  }, [isAuthenticated])

  useEffect(() => {
   
    const getTemperarySubscriptions = async() => {
      setIsLoading(true)
      try {
        const res = await makeRequest.get("subscriptions/reservations/catalog/temperary");
        console.log(res.data)
        setTemperarySub(res.data);
        setIsLoading(false)
      }catch(err) {
        setIsLoading(false)
      }
    }
    getTemperarySubscriptions();
  },[])

  useEffect(() => {
   
    const getAllSubscriptions = async() => {
      setIsLoading(true)
      try {
        const res = await makeRequest.get("subscriptions/reservations/catalog/all");
        console.log(res.data)
        setPermanent(res.data);
        setIsLoading(false)
      }catch(err) {
        setIsLoading(false)
      }
    }
    getAllSubscriptions();
  },[])

  return (
    <>
    <div className='manageContainer'>
      <div className="manageTop">
        <h1 className="manageTitle">Subscriptions</h1>
        <div className='manageButton' style={{backgroundColor: isOpen ? "gray": "rgb(236, 230, 230)"}} onClick={()=> setIsOpen(true)}>Permanent</div>
        <div className='manageButton' style={{backgroundColor: !isOpen ? "gray": "rgb(236, 230, 230)"}} onClick={() => setIsOpen(false)}>Temperary</div>
      </div>
      {isLoading ? (
        <div style={{marginTop: "60px"}}>
          <Skeleton type="custom" />
        </div>
      ): (
        <>
          {isOpen ? (
        <Permanent subscriptions={permanentSub} />
      ):(
        <Temperal subscriptions={temperalSub} />
      )}
        </>
      )}
    </div>
    <Footer />
    </>
  );
}

export default Manage;
