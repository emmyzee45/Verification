import { useNavigate } from "react-router-dom";
import "./fiat.css";


const Fiat = ({ orders }) => {
  const navigate = useNavigate();

  const handleHelp = () => {
    navigate('/support')
  }
  return (
    <div className="fiatContainer">
      <div className="fiatheader">
        <div className="f-header-item">Date</div>
        <div className="f-header-item">Method</div>
        <div className="f-header-item">Description</div>
        <div className="f-header-item">Amount</div>
        <div className="f-header-item">Received</div>
        <div className="f-header-item">Action(s)</div>
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
                <button className="c-body-button" onClick={handleHelp}>Help</button>
            </div>
          </div>
        )
      })}
    </div>
  );
}

export default Fiat;
