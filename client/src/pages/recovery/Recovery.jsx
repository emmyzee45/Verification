import React, { useState } from 'react';
import FormInput from "../../components/login/FormInput";
import { useSelector } from 'react-redux';
import { toast } from "react-toastify"
import "./recovery.css";
import { makeRequest } from '../../axios';

const inputs = [
    {
      id: 1,
      name: "email",
      type: "email",
      placeholder: "Email",
      errorMessage: "It should be a valid email address!",
      label: "Email",
      required: true,
    },
  ];

const Recovery = () => {
    const [email, setEmail ] = useState('');
    const [isLoading, setIsLoading ] = useState(false)
    // const user = useSelector((state) => state.user.currentUser);
    // const isFetching = useSelector((state) => state.user.isFetching);

    const handleSubmit = async(e) => {
        e.preventDefault();
        setIsLoading(true)
        try {
          const res = await makeRequest.post("/users/password", {email});
          toast.success("Link has being sent to your email")
          setIsLoading(false)
        }catch(err) {
            setIsLoading(false)
          toast.error("Try again")
        }
      }

  return (
    <div className="loginContainer">
      <form>
        <h1 className="login-title">Recover</h1>
        {inputs.map((input) => (
          <FormInput
            key={input.id}
            {...input}
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />
        ))}
          <button 
            className="logButton" 
            disabled={isLoading} 
            style={{background: isLoading && "#46507c", cursor: isLoading && "not-allowed"}} 
            onClick={handleSubmit}
          >
            {isLoading ? "Processing..." : "Submit"}
          </button>
          <div className="forgot-password text-center py-4">
                <span className='forgot-password text-gray-500' onClick={handleSubmit}>Resend</span>
            </div>
      </form>
    </div>
  );
}

export default Recovery;
