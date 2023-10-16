import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./login.css";
import axios from "axios";
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

  const handleSubmit = async(e) => {
    e.preventDefault();
    dispatch(loginStart())
    try {
      console.log("Login data")
      const res = await makeRequest.post("auth", values);
      console.log(res)
      dispatch(loginSuccess(res.data));
      toast.success("Successfully logged In")
      window.location.replace("/")
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
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        {inputs.map((input) => (
          <FormInput
            key={input.id}
            {...input}
            value={values[input.name]}
            onChange={onChange}
          />
        ))}
        <button className="logButton">Submit</button>
        {/* <div className="loginHr"></div>
        <div className="loginOr">Or</div>
        <button className="logingoogle">Login with Google</button> */}
      </form>
      <Link to="/register" className="registerButton">Register</Link>
    </div>
  );
};

export default Login;
