import "./temperal.css";

const Temperal = ({ subscriptions }) => {
  return (
    <div className='temperalSub'>
      <h1 className="temperalTitle">Temperal Subscriptions</h1>
      <div className="temperalItem headerItem">
        <div>Number</div>
        <div>Nickname</div>
        <div>Lines</div>
        <div>Expires</div>
        <div>AlwaysOn</div>
        <div>Actions</div>
      </div>
      {subscriptions.map((item) => {
        return (
            <div className="temperalItem bodyItem" key={item?.id}>
                <div className="number">{item?.subscriptionNumber}</div>
                <div className="name">Jack</div>
                <div className="lines">
                  <div className="line line1">Close All</div>
                  <div className="line line2">{item?.strReservations[0]?.target.name}</div>
                  <div className="line line3">({item?.strReservations[0]?.lineNumber})</div>
                </div>
                <div className="time">{item?.noLongerAvailableAt}</div>
                <div className="alwaysOn">Yes</div>
                <div className="actions">
                  <button className="action">View</button>
                  <button className="action action2">Edit Nickname</button>
                </div>
            </div>
          )
        })}
    </div>
  );
}

export default Temperal;
