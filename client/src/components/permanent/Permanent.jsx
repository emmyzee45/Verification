import { toast } from "react-toastify";
import { makeRequest } from "../../axios";
import "./permanent.css";

const Permanent = ({ subscriptions }) => {
  const handleSubRenewal = async(id) => {
    try{
      await makeRequest.post(`subscriptions/reservations/renew/${id}`);
      toast.success("Successfully renew")
    }catch(err) {
      toast.error("Something went wrong")
      console.log(err);
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
              <div className="line line2">{item?.strReservations[0]?.target.name}</div>
              <div className="line line3">({item?.strReservations[0]?.lineNumber})</div>
          </div>
        <div>{item?.noLongerAvailableAt}</div>
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
