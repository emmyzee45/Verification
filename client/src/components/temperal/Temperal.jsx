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
            <div className="temperalItem bodyItem" key={item._id}>
                <div>53430524</div>
                <div>{item.name}</div>
                <div>Line 3</div>
                <div>03/06/2006</div>
                <div>Yes</div>
                <div>Actions</div>
            </div>
          )
        })}
    </div>
  );
}

export default Temperal;
