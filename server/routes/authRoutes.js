// authentication routes

import express from "express";
import { login, logout, register, sendVerifyOtp, verifyEmail } from "../controllers/authController.js";
import userAuth from "../middleware/userAuth.js";

const authRouter = express.Router();

// POST ---> Server pe naya resource create karna.  Example: New user, product, ya category add karna.

// jaise hi hum ye endpoint hit krenge /register toh register controller execute hojayega

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/logout", logout);

authRouter.post("/send-verify-otp",userAuth,sendVerifyOtp)

authRouter.post("/verify-account", userAuth , verifyEmail)

export default authRouter;

// now we have to implement mail functionality , whenever a new account is created , user will recieve a welcome email

// configure : nodemailer allows us to send email

/*

SMTP ka full form hai Simple Mail Transfer Protocol. Yeh ek standard protocol hai jo emails bhejne ke liye use hota hai, especially across internet.


    - SMTP ka use email clients (like Outlook, Gmail, etc.) aur mail servers ke beech communication ke liye hota hai. Jab bhi aap koi email bhejte ho:


        - Email client (jaise Outlook, Thunderbird, ya Gmail) : email ko SMTP server ko bhejta hai.

        - SMTP server email ko recipient ke mail server tak pahunchata hai.

        - Recipient ka mail server us email ko receive karta hai.

        - Phir user usse IMAP ya POP3 protocol ke through apne inbox mein dekh sakta hai.



     SMTP Ports:

       - 25: Default port (mail sending ke liye, lekin block bhi ho sakta hai kai ISPs ke through spam ke wajah se)

       - 587: Recommended port with STARTTLS (modern, secure way)

       - 465: SSL ke sath (older, but still in use)


    SMTP Authentication:

       SMTP server pe spamming se bachne ke liye authentication zaroori hoti hai:

          - Username & Password

          - TLS/SSL encryption
*/


// To send email , we need to create SMTP account from where we get host, port , and authentication details  and with the help of transporter we send the mail to client




