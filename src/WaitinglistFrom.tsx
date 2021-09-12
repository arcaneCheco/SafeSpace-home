import nodemailer from "nodemailer";
import { useEffect } from "react";

const WaitingListForm = () => {
  useEffect(() => {
    main();
  }, []);
  const main = async () => {
    let testAccount = await nodemailer.createTestAccount();
    const smtpConfig = {
      host: "smtp.ethereal.email",
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    };
    let transporter = nodemailer.createTransport(smtpConfig);
    const mailOptions = {
      from: "sergio.azizi.14@gmail.com",
      to: "sergio.azizi.14@gmail.com",
      subject: "mail from nodemailer",
      text: "here is the message :-)",
    };
    await transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        return console.log(err);
      }
      console.log(`Message sent ${info.response}`);
    });
  };
  return (
    <div className="waiting-form">
      <input placeholder="Enter your email"></input>
      <button>Join the waiting list</button>
    </div>
  );
};

export default WaitingListForm;
