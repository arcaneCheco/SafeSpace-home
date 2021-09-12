import nodemailer from "nodemailer";

const WaitingListForm = () => {
  return (
    <div className="waiting-form">
      <input placeholder="Enter your email"></input>
      <button>Join the waiting list</button>
    </div>
  );
};

export default WaitingListForm;
