import { toast } from "react-toastify";
import { makeRequest } from "../../axios";
import "./permanent.css";
import { logOutSuccess } from "../../redux/redux-slices/UserSlice";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Permanent = ({ subscriptions }) => {
  const [close, setClose ] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleClose = () => {
    setClose(!close)
  }

  const handleSubRenewal = async(id) => {
    try{
      await makeRequest.post(`subscriptions/reservations/renew/${id}`);
      toast.success("Successfully renew")
    }catch(err) {
      if (err.response?.status === 401) {
        dispatch(logOutSuccess());
        navigate('/login', { state: { from: location }, replace: true });
      } else {
        toast.error("Something went wrong")
      }
    }
  }

  const handleWakeUp = async(id) => {
    try {
      const res = await makeRequest.post(`subscriptions/reservations/catalog/wakeup?subscriptionId=${id}`);
      toast.success(`Your line will be available in ${res.data}s`)
    } catch (err) {
      if (err.response?.status === 401) {
        dispatch(logOutSuccess());
        navigate('/login', { state: { from: location }, replace: true });
      } else {
        toast.error("something went wrong")
      }
    }
  }
  return (
    <div className="permanentSub">
      <h1 className="permanentTitle">Permanent Subscriptions</h1>
      <table>
      <tr className="permanentItem headerItem">
        <td className="table-header-item">Number</td>
        <td className="table-header-item">Nickname</td>
        <td className="table-header-item table-header-lines">Lines</td>
        <td className="table-header-item">End Date</td>
        <td className="table-header-item">Actions</td>
      </tr>
      {subscriptions.map((item) => {
        return (
          <tr className="permanentItem bodyItem" key={item?.id}>
          <td className="table-item">{item?.subscriptionNumber}</td>
          <td className="table-item">{item?.name}</td>
          <td className="lines">
              <div className="line line1" onClick={handleClose}>Close All</div>
              {item?.strReservations?.length ? (
                <>
                {!close && <div className="line line2">{item?.strReservations[0]?.target.name}</div>}
                <div className="line line3">({item?.strReservations[0]?.lineNumber})</div>
                </>
              ): (
                <>
                {!close && <div className="line line2">Whole Lines</div>}
                <div className="line line3">({item?.wholeLineReservations[0]?.lineNumber})</div>
                </>
              )}
          </td>
        <td className="table-item">{item?.noLongerAvailableAt ? item?.noLongerAvailableAt : item?.cycleEnd?.slice(0,16)}</td>
          <td className="actions">
              <button className="action" onClick={() => handleSubRenewal(item?.id)}>Renew</button>
              {!item?.strReservations[0]?.alwaysOn && <button disabled className="action action2" onClick={() => handleWakeUp(item?.id)}>Wake Up</button>}
          </td>
      </tr>
        )
      })}
    </table>
    </div>
  );
}

export default Permanent;
