import express from "express";
import nodemailer from "nodemailer";
const app = express();
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 3002;

const transporterConfig = {
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: process.env.EMAIL,
    pass: process.env.WORD,
    clientId: process.env.OAUTH_CLIENTID,
    clientSecret: process.env.OAUTH_CLIENT_SECRET,
    refreshToken: process.env.OAUTH_REFRESH_TOKEN,
  },
};

app.listen(PORT, () => {
  console.log(`server running at http://localhost:${PORT}`);
});
