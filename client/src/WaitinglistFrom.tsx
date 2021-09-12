import React, { useState } from "react";
import axios from "axios";

const WaitingListForm = () => {
  const [clientMail, setClientMail] = useState("");
  const handleClientMail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setClientMail(e.target.value);
  };
  const submitEmail = (e: React.FormEvent) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/send", { clientMail })
      .then((res) => {
        if (res.status === 250) {
          alert("message sent!");
        } else {
          alert("message failed to send..");
        }
      })
      .then(() => {
        setClientMail("");
      });

    console.log("submitted!");
  };
  return (
    <div className="waiting-form">
      <form onSubmit={submitEmail}>
        <input
          placeholder="Enter your email"
          onChange={handleClientMail}
          value={clientMail}
        ></input>
        <button>Join the waiting list</button>
      </form>
    </div>
  );
};

export default WaitingListForm;
