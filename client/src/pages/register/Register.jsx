import { useState } from "react";
import "./register.css";
import FormInput from "../../components/register/Register";
import { Link, redirect } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { makeRequest } from "../../axios";
import Footer from "../../components/footer/Footer";

const Register = () => {
  const [isFetching, setIsFetching] = useState(false);
  const [values, setValues] = useState({
    username: "",
    email: "",
    birthday: "",
    password: "",
    confirmPassword: "",
  });

  const inputs = [
    {
      id: 1,
      name: "username",
      type: "text",
      placeholder: "Username",
      errorMessage:
        "Username should be 3-16 characters and shouldn't include any special character!",
      label: "Username",
      pattern: "^[A-Za-z0-9]{3,16}$",
      required: true,
    },
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
      errorMessage:
        "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!",
      label: "Password",
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
      required: true,
    },
    {
      id: 5,
      name: "confirmPassword",
      type: "password",
      placeholder: "Confirm Password",
      errorMessage: "Passwords don't match!",
      label: "Confirm Password",
      pattern: values.password,
      required: true,
    },
  ];

  const handleSubmit = async(e) => {
    e.preventDefault();
    setIsFetching(true)
    try {
      await makeRequest.post("auth/register", values);
      toast.success("Registration successful")
      setIsFetching(false);
      window.location.replace("/login");
    }catch(err) {
      toast.error("Something went wrong");
      setIsFetching(false)
    }
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <>
    <div className="regContainer">
      <form onSubmit={handleSubmit}>
        <h1 className="register-title">Register</h1>
        {inputs.map((input) => (
          <FormInput
            key={input.id}
            {...input}
            value={values[input.name]}
            onChange={onChange}
          />
        ))}
        <button 
          className="regButton"
          disabled={isFetching} 
          style={{background: isFetching && "#46507c", cursor: isFetching && "not-allowed"}} 
          onClick={handleSubmit}
        >
          {isFetching ? "Processing..." : "Submit"}
        </button>
      </form>
      <Link to="/login" className="loginButton">Login</Link>
    </div>
    <Footer />
    </>
  );
};

export default Register;
