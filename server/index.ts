import express from "express";
import nodemailer from "nodemailer";
import cors from "cors";
const app = express();
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAUTH2",
    user: process.env.EMAIL,
    pass: process.env.WORD,
    clientId: process.env.OAUTH_CLIENTID,
    clientSecret: process.env.OAUTH_CLIENT_SECRET,
    refreshToken: process.env.OAUTH_REFRESH_TOKEN,
    accessToken: process.env.OAUTH_ACCESS_TOKEN,
  },
});
transporter.verify((err, success) => {
  err
    ? console.log(err)
    : console.log(`=== Server is ready to take messages: ${success} ===`);
});

app.post("/send", function (req, res) {
  let mailOptions = {
    from: "test@gmail.com",
    to: `${req.body.clientMail}`,
    subject: "Message from SafeSpace",
    text: "You up?",
  };
  transporter.sendMail(mailOptions, function (err, data) {
    if (err) {
      console.log(err);
      res.send("Email not sent..");
    } else {
      console.log("Email sent successfully");
      res.status(250).send("Email sent");
    }
  });
});

app.listen(PORT, () => {
  console.log(`server running at http://localhost:${PORT}`);
});
