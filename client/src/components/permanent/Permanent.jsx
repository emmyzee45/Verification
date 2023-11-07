import { toast } from "react-toastify";
import { makeRequest } from "../../axios";
import "./permanent.css";
import { logOutSuccess } from "../../redux/redux-slices/UserSlice";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

const Permanent = ({ subscriptions }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

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
  return (
    <div className="permanentSub">
      <h1 className="permanentTitle">Permanent Subscriptions</h1>
      <div className="permanentItem headerItem">
        <div>Subscription Number</div>
        <div>Nickname</div>
        <div>Lines</div>
        <div>End Date</div>
        <div>Actions</div>
      </div>
      {subscriptions.map((item) => {
        return (
          <div className="permanentItem bodyItem" key={item?.id}>
          <div>{item?.subscriptionNumber}</div>
          <div>{item?.name}</div>
          <div className="lines">
              <div className="line line1">Close All</div>
              {item?.strReservations?.length ? (
                <>
                <div className="line line2">{item?.strReservations[0]?.target.name}</div>
                <div className="line line3">({item?.strReservations[0]?.lineNumber})</div>
                </>
              ): (
                <>
                <div className="line line2">Whole Lines</div>
                <div className="line line3">({item?.wholeLineReservations[0]?.lineNumber})</div>
                </>
              )}
          </div>
        <div>{item?.noLongerAvailableAt ? item?.noLongerAvailableAt : item?.cycleEnd?.slice(0,16)}</div>
          <div className="actions">
              <button className="action" onClick={() => handleSubRenewal(item?.id)}>Renew</button>
              <button className="action action2">Edit Nickname</button>
          </div>
      </div>
        )
      })}
    </div>
  );
}

export default Permanent;
