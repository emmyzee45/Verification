import "./crypto.css";


const Crypto = ({ orders }) => {
  return (
    <div className="cryptoContainer">
      <div className="cryptoheader">
        <div className="c-header-item">Date</div>
        <div className="c-header-item">Method</div>
        <div className="c-header-item">Description</div>
        <div className="c-header-item">Amount</div>
        <div className="c-header-item">Received</div>
        <div className="c-header-item">Action(s)</div>
      </div>
      {orders?.map((item) => {
        return (
          <div className="cryptobody" key={item?._id}>
            <div className="c-body-item">{item?.createdAt?.slice(0,10)}</div>
            <div className="c-body-item">{item?.method}</div>
            <div className="c-body-item">{item?.pay_amount} Credits</div>
            <div className="c-body-item">{item?.pay_amount} {item?.currency}</div>
            <div className="c-body-item">{item?.receive_amount} USD</div>
            <div className="c-body-item ">
                <button className="c-body-button">Help</button>
            </div>
          </div>
        )
      })}
    </div>
  );
}

export default Crypto;
