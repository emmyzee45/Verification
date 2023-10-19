import "./permanent.css";

const Permanent = ({ subscriptions }) => {
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
          <div className="permanentItem bodyItem" key={item._id}>
        <div>43464008</div>
        <div>{item.name}</div>
        <div>line 3</div>
        <div>04/07/2009</div>
        <div>Actions</div>
      </div>
        )
      })}
    </div>
  );
}

export default Permanent;
