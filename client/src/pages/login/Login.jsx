import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./login.css";
import FormInput from "../../components/login/FormInput";
import { loginFailure, loginStart, loginSuccess } from "../../redux/redux-slices/UserSlice";
import { toast } from "react-toastify";
import { makeRequest } from "../../axios";

const Login = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const inputs = [
    {
      id: 2,
      name: "email",
      type: "email",
      placeholder: "Email",
      errorMessage: "It should be a valid email address!",
      label: "Email",
      required: true,
    },
    {
      id: 4,
      name: "password",
      type: "password",
      placeholder: "Password",
     
    },
  ];
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault();
    dispatch(loginStart())
    try {
      const res = await makeRequest.post("auth", values);
      dispatch(loginSuccess(res.data));
      toast.success("Successfully logged In")
      navigate("/")
      // window.location.replace("/")
    }catch(err) {
      toast.error("Something went wront")
      dispatch(loginFailure())
    }
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <div className="loginContainer">
      <form>
        <h1>Login</h1>
        {inputs.map((input) => (
          <FormInput
            key={input.id}
            {...input}
            value={values[input.name]}
            onChange={onChange}
          />
        ))}
        <button className="logButton" onClick={handleSubmit}>Submit</button>
        <div className="loginHrContainer">
          <div className="loginHr"></div>
          <div className="loginOr">OR</div>
          <div className="loginHr"></div>
        </div>
        <button className="logingoogle">
          <img src="/img/g2.png" className="googleIcon"/>
          <div className="googleText">Login with Google</div>
        </button>
      </form>
      <Link to="/register" className="registerButton">Register</Link>
    </div>
  );
};

export default Login;
