import "./crypto.css";


const Crypto = () => {
  return (
    <div className="cryptoContainer">
      <div className="cryptoheader">
        <div className="c-header-item">Date</div>
        <div className="c-header-item">Method</div>
        <div className="c-header-item">Description</div>
        <div className="c-header-item">Amount</div>
        <div className="c-header-item">Credit Received</div>
        <div className="c-header-item">Action(s)</div>
      </div>
      <div className="cryptobody">
        <div className="c-body-item">05/3/9924</div>
        <div className="c-body-item">Crypto</div>
        <div className="c-body-item">50 Credits</div>
        <div className="c-body-item">$10</div>
        <div className="c-body-item">50.3</div>
        <div className="c-body-item ">
            <button className="c-body-button">Help</button>
        </div>
      </div>
      <div className="cryptobody">
        <div className="c-body-item">05/3/9924</div>
        <div className="c-body-item">Crypto</div>
        <div className="c-body-item">50 Credits</div>
        <div className="c-body-item">$10</div>
        <div className="c-body-item">50.3</div>
        <div className="c-body-item">
        <button className="f-body-button">Help</button>
        </div>
      </div>
      <div className="cryptobody">
        <div className="c-body-item">05/3/9924</div>
        <div className="c-body-item">Crypto</div>
        <div className="c-body-item">50 Credits</div>
        <div className="c-body-item">$10</div>
        <div className="c-body-item">50.3</div>
        <div className="c-body-item">
        <button className="f-body-button">Help</button>
        </div>
      </div>
    </div>
  );
}

export default Crypto;
