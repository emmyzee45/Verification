import { useState } from "react";
import "./temperal.css";
import { makeRequest } from "../../axios";
import { toast } from "react-toastify";

const Temperal = ({ subscriptions }) => {
  const [isClose, setIsClose ] = useState(false);

const handleClose = () => {
  setIsClose(!isClose)
}

const handlewakeup = async(id) => {
  try {
    const res = await makeRequest.post(`subscriptions/reservations/catalog/wakeup?subscriptionId=${id}&reservationId=${id}`);
    console.log(res.data);
    toast.success(`Your line will be available in ${res.data}s`)
  } catch (error) {
    toast.error("something went wrong")
    console.log(error)
  }
}

  return (
    <div className='temperalSub'>
      <h1 className="temperalTitle">Temporal Subscriptions</h1>
      <div className="temperalItem headerItem">
        <div>Number</div>
        <div>Lines</div>
        <div>Expires</div>
        <div>AlwaysOn</div>
        <div>Actions</div>
      </div>

      <div className="temperalItem headerItemMessage">
        <div>You don't have any temporary subscriptions.</div>
      </div>

      {subscriptions.map((item) => {
        return (
            <div className="temperalItem bodyItem" key={item?.id}>
                <div className="number">{item?.subscriptionNumber}</div>
                <div className="lines">
                  <div className="line line1" onClick={handleClose}>{!isClose ? "Close All": "Expand All"}</div>
                  {!isClose && <div className="line line2">{item?.strReservations[0]?.target.name}</div>}
                  <div className="line line3">({item?.strReservations[0]?.lineNumber})</div>
                </div>
                <div className="time">{item?.noLongerAvailableAt?.slice(0, 19)}</div>
                <div className="alwaysOn">{item?.alwaysOn ? "Yes": "No"}</div>
                <div className="actions">
                  {!item?.alwaysOn && <button className="action" onClick={() => handlewakeup(item?.id)}>Wake up</button>}
                  {/* <button className="action action2">Edit Nickname</button> */}
                </div>
            </div>
          )
        })}
    </div>
  );
}

export default Temperal;
