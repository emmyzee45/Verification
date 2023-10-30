import "./fiat.css";


const Fiat = () => {
  return (
    <div className="fiatContainer">
      <div className="fiatheader">
        <div className="f-header-item">Date</div>
        <div className="f-header-item">Method</div>
        <div className="f-header-item">Description</div>
        <div className="f-header-item">Amount</div>
        <div className="f-header-item">Credit Received</div>
        <div className="f-header-item">Action(s)</div>
      </div>
      <div className="fiatbody">
        <div className="f-body-item">05/3/9924</div>
        <div className="f-body-item">Card</div>
        <div className="f-body-item">50 Credits</div>
        <div className="f-body-item">$10</div>
        <div className="f-body-item">50.3</div>
        <div className="f-body-item ">
            <button className="f-body-button">Help</button>
        </div>
      </div>
      <div className="fiatbody">
        <div className="f-body-item">05/3/9924</div>
        <div className="f-body-item">Card</div>
        <div className="f-body-item">50 Credits</div>
        <div className="f-body-item">$10</div>
        <div className="f-body-item">50.3</div>
        <div className="f-body-item"><button className="f-body-button">Help</button></div>
      </div>
      <div className="fiatbody">
        <div className="f-body-item">05/3/9924</div>
        <div className="f-body-item">Card</div>
        <div className="f-body-item">50 Credits</div>
        <div className="f-body-item">$10</div>
        <div className="f-body-item">50.3</div>
        <div className="f-body-item"><button className="f-body-button">Help</button></div>
      </div>
    </div>
  );
}

export default Fiat;
