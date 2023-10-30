import React from "react";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Home from "./pages/home/Home";
// import Message from "./pages/message/Message";
import About from "./pages/subscription/Subscription";
// import Login from "./pages/login/Login";
import { Route, Routes} from "react-router-dom";
import Profile from "./pages/profile/Profile";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Subscription from "./pages/subscription/Subscription";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import MultiPurpose from "./pages/multiPurpose/MultiPurpose";
import Subscriptions from "./pages/subscriptions/Subscriptions";
import Checkout from "./pages/checkout/Checkout";
import TopBalance from "./pages/balance/TopBalance";
import Manage from "./pages/manage/Manage";
import Temperary from "./pages/temperary/Temperary";
import Permanent from "./pages/permanent/Permanent";
import PermanentSub from "./pages/permanent-sub/PermanentSub";
import Message from "./pages/message/Message";
// #1C233F
// #0C0D0F
function App() {
  return (
    <div>
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />}/>
        {/* <Route exact path="/contact" element={<Contact />}/> */}
        <Route exact path="/about" element={<About />}/>
        <Route exact path="/profile" element={<Profile />}/>
        <Route exact path="/subscription" element={<Subscription />}/>
        <Route exact path="/subscription/:category" element={<Subscriptions />}/>
        <Route exact path="/subscriptions" element={<Manage />}/>
        <Route exact path="/temporary-subscription" element={<Temperary />}/>
        <Route exact path="/MultiPurpose" element={<MultiPurpose />}/>
        <Route exact path="/permanent-subscription/catalog" element={<PermanentSub />}/>
        <Route exact path="/permanent-subscription/:category" element={<Permanent />}/>
        <Route exact path="/checkout" element={<Checkout />}/>
        <Route exact path="/balance" element={<TopBalance />}/>
        <Route exact path="/login" element={<Login />}/>
        <Route exact path="/register" element={<Register />}/>
        <Route exact path="/messages" element={<Message />}/>
      </Routes>
      {/* <Footer /> */}
    </div>
  );
}

export default App;