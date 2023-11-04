import { useState } from "react";
import "./navbar.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOutSuccess } from "../../redux/redux-slices/UserSlice";
import MessageOutlinedIcon from '@mui/icons-material/MessageOutlined';
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';
import NotListedLocationOutlinedIcon from '@mui/icons-material/NotListedLocationOutlined';

const Navbar = () => {
  const [openSub, setOpenSub ] = useState(false);
  const [open, setOpen] = useState(false);
  const [openProfile, setOpenProfile ] = useState(false);

  const dispatch = useDispatch()
  const user = useSelector((state) => state.user.currentUser);
  const quantity = useSelector((state) => state.cart.quantity);

  const handleLogout = async() => {
    dispatch(logOutSuccess())
  }
  const handleSubscriptions = () => {
    setOpenSub(!openSub)
  }

  const handleProfile = () => {
    setOpenProfile(!openProfile)
  }

  return (
    <div className="navContainer">
      <div className="navleft navfw-bolder">
      <div className="navhamburger" onClick={() => setOpen(!open)}>
        <div className="navline" />
        <div className="navline" />
        <div className="navline" />
      </div>
      <div className="logo">
        <Link to="/">
        <img src="img/logo.png" className="navlogo" />
        </Link>
      </div>
      </div>
      <ul className="navlist fw-bolder">
        <li>
        {user && (
        <>
          <Link to="/balance" className="navleftItem navitem">${user?.balance?.toFixed(2)}</Link>
        </>
       )}
        </li>
        <li className="navlistItem navsubContainer" >
          <div onClick={handleSubscriptions}>
            <Link className="navitem">Subscriptions</Link>
            <ArrowDropDownOutlinedIcon />
          </div>
          {openSub && (
            <div className="navsubscriptions">
              <Link to="/subscriptions">
                <div className="navsubItem" >Manage</div>
              </Link>
              <Link to="/subscription" >
                <div className="navsubItem">Buy</div>
              </Link>
            </div>
          )}
        </li>
        <li className="navlistItem">
          <MessageOutlinedIcon />
          <Link to="/messages" className="navitem">Messages</Link>
        </li>
        <li className="navlistItem">
          <NotListedLocationOutlinedIcon />
          <Link to="/faq" className="navitem">FAQ</Link>
        </li>
        <li className="navcart">
            <Link to='/checkout'>
            <img src="/img/cart.png" alt="/" className="navcatimg" />
            <div className="navcounter">{quantity}</div>
            </Link>
          </li>
        {!user ? (
          <li className="navlistItem">
            <PersonAddAltOutlinedIcon />
          <Link to="/login" className="navitem">Login</Link>
        </li>
        ) : (
          <>
            <li>
            <img className="navimg" onClick={handleProfile} src={user?.img ? user?.img : "https://firebasestorage.googleapis.com/v0/b/cardano-d265c.appspot.com/o/images.jpeg?alt=media&token=8c34ea8e-71f2-4b6f-bf93-f823e2b3a90e"} />
            {openProfile && (
              <div className="navprofile">
                <Link to="/orders">
                  <div  className="profilenav">Order History</div>
                </Link>
                <Link to="/support" >
                  <div className="profilenav">Support</div>
                </Link>
                <Link to="/balance" >
                  <div className="profilenav">Top up</div>
                </Link>
                <div onClick={handleLogout} className="profilenav">Sign Out</div>
              </div>
            )}
            </li>
          </>
        )}
      </ul>
      <ul
        onClick={() => setOpen(false)}
        className="navmenu"
        style={{ left: open ? "0px" : "-50vw" }}>
        <li className="navmenuItem">
          <Link to="/" className="navitem">Home</Link>
        </li>
        <li className="navmenuItem">
          <Link to="/about" className="navitem">$0.00</Link>
        </li>
        <li className="navmenuItem">
          <Link to="/balance" className="navitem">Top up</Link>
        </li>
        <li className="navmenuItem">
          <Link to="/subscription" className="navitem">Subscriptions</Link>
        </li>
        <li className="navmenuItem">
          <Link to="/messages" className="navitem">Messages</Link>
        </li>
        {!user ? (
          <li className="navmenuItem">
            <Link to="/login" className="navitem">Login</Link>
          </li>
        ): (
          <>
          <li className="navlistItem" onClick={handleLogout}>    
          <Link className="navitem">Logout</Link>
        </li>
        </>
        )}
      </ul>
    </div>
  );
};

export default Navbar;
