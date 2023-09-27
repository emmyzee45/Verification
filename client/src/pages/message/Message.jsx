import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import Circle from "../../components/circle/Circle";
import "./contact.css";

const Contact = () => {
  const [done, setDone] = useState(false);
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_5r1pb74', 'template_m86qho8', form.current, process.env.REACT_APP_API_KEY)
      .then((result) => {
          console.log(result.text);
          setDone(true);
      }, (error) => {
          console.log(error.text);
      });
      e.target.reset();
  };

  return (
    <div className="container">
        <Circle backgroundColor="#0265FF" left="-40vh" top="-20vh" className="circle"/>
        <Circle backgroundColor="#00CCFF" right="-30vh" bottom="-60vh" className="circle"/>
      <h1 className="title">Get in Touch</h1>
      {done && <div className="success_message">Thanks, I will reply ASAP...</div>}
      <form ref={form} onSubmit={sendEmail} className="form">
        <input className="inputL" name="from_name" type="text" placeholder="Name" />
        {/* <input className={style.inputS} type="text" placeholder="Phone" /> */}
        <input className="inputL" name="from_email" type="text" placeholder="Email" />
        <input className="inputL" name="to_subject" type="text" placeholder="Subject" />
        <textarea
          className="textArea"
          type="text"
          rows={6}
          placeholder="Message"
          name="message"
        />
        <button className="button">SUBMIT</button>
      </form>
    </div>
  );
};

export default Contact;
