import { useState } from "react";
import "./temperal.css";
import { makeRequest } from "../../axios";
import { toast } from "react-toastify";
import { logOutSuccess } from "../../redux/redux-slices/UserSlice";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

const Temperal = ({ subscriptions }) => {
  const [isClose, setIsClose ] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

const handleClose = () => {
  setIsClose(!isClose)
}
const handlewakeup = async(id) => {
  try {
    const res = await makeRequest.post(`subscriptions/reservations/catalog/wakeup?subscriptionId=${id}&reservationId=${id}`);
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
    <div className='temperalSub'>
      <h1 className="temperalTitle">Temporal Subscriptions</h1>
      <table>
      <tr className="temperalItem headerItem">
        <td className="table-header-item">Number</td>
        <td className="table-header-item table-header-lines">Lines</td>
        <td className="table-header-item">Expires</td>
        <td className="table-header-item">AlwaysOn</td>
        <td className="table-header-item">Actions</td>
      </tr>

      {/* <div className="temperalItem headerItemMessage">
        <div>You don't have any temporary subscriptions.</div>
      </div> */}

      {subscriptions.map((item) => {
        return (
            <tr className="temperalItem bodyItem" key={item?.id}>
                <td className="table-item number">{item?.subscriptionNumber}</td>
                <td className="lines">
                  <div className="line line1" onClick={handleClose}>{!isClose ? "Close All": "Expand All"}</div>
                  {!isClose && <div className="line line2">{item?.strReservations[0]?.target.name}</div>}
                  <div className="line line3">({item?.strReservations[0]?.lineNumber})</div>
                </td>
                <td className="table-item time">{item?.noLongerAvailableAt?.slice(0, 19)}</td>
                <td className="table-item alwaysOn">{item?.alwaysOn ? "Yes": "No"}</td>
                <td className="actions">
                  {!item?.alwaysOn && <button className="action" onClick={() => handlewakeup(item?.id)}>Wake up</button>}
                  {/* <button className="action action2">Edit Nickname</button> */}
                </td>
            </tr>
          )
        })}
      </table>
    </div>
  );
}

export default Temperal;
