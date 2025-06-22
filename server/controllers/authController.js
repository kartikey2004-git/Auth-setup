// function to register , login , logout , verify account  and password reset

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
import transporter from "../config/nodemailer.js";

export const register = async (req, res) => {
  // Get user details from frontend ( extract all data points ) : we need email,password ,name which we get from req.body

  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.json({ success: false, message: "Missing Details" });
  }

  // create user account and stores all data/info about user in database

  try {
    // check existing user in database with email

    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      return res.json({ success: false, message: "User already exists." });
    }

    // Asynchronously generates a hash for the given password with salt ( salt increase krne se higher security but takes time )

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new userModel({ name, email, password: hashedPassword });

    await user.save(); // new user will be created and stored in database with following credentials/data

    // generate token using jwt for authentication

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // now we have to send this token to frontend  in user's response using cookies

    res.cookie("token", token, {
      httpOnly: true, // so only http request can access these cookies

      // whenever we run this project on live server, then it will run on https , then secure: true

      // running this project on local environment , it will run on http , so secure: false (not secure)

      secure: process.env.NODE_ENV === "production",

      // local development pe strict  because in local environment , both backend and frontend will run on localhost , so same environment

      // but when we deploy this app on server , we can run backend on another domain name and  our frontend is running on another domain name , there we have to add sameSite: none

      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",

      // expires cookie in 7 days
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // script to sending welcome email to user when successfully creating account

    const mailOptions = {
      from: process.env.SENDER_EMAIL, // sender's mail id

      to: email, // user who has created the account

      // email subject
      subject: "nigga hu main",

      text: `Welcome my cute little red flags .. kaise ho saare badhiya . Your account has been created with email id : ${email}`,
    };

    await transporter.sendMail(mailOptions);

    return res.json({ success: true, message: "User registered sucessfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }

  // we do not store original password in database , we have to encrypt password befor storing in database

  // now we have to generate token for authentication and we will send this token using cookies

  // whenever new user is created in mongoDB database, it generates unique id for each user (mongoDB generated id for each model document created )
};

export const login = async (req, res) => {
  // Get user details from frontend ( extract all data points ) : we need email,password which we get from req.body

  const { email, password } = req.body;

  if (!email || !password) {
    return res.json({
      success: false,
      message: "Email and password are required",
    });
  }

  try {
    // now we need to find user in database by email address

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "Invalid email address" });
    }

    // if user exist in database with this email , then we need to check for password

    // compare both password : password stored in database and password user has provided

    // Asynchronously tests a password against a hash.

    const isMatched = await bcrypt.compare(password, user.password);

    if (!isMatched) {
      return res.json({ success: false, message: "Invalid password" });
    }

    // generate token ( user will be authenticated and loggedIn in website )

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",

      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.json({ success: true, message: "User loggedIn sucessfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const logout = async (req, res) => {
  try {
    // just we have to clear the cookie from response

    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",

      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    });

    return res.json({ success: true, message: "User loggedOut successfully" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

// Now we have to create API endpoint using this controller function --> routes define for login , logout, register


export const sendVerifyOtp = async (req, res) => {

  // controller for email verification  , so that user can verify the email ID and verify their account

  // Send Verification OTP to the User's email ( verify the user's account )

  try {
    // first we have to get user ID to verify the user and we will get user ID from req.body

    const { userId } = req.body;

    // find the user from our database

    const user = await userModel.findById(userId);

    // check account is verified or not

    if (user.isAccountVerified) {
      return res.json({ success: false, message: "Account Already Verified" });
    }

    // if user's account is not verified then script to generate one OTP will sent on user's emailId

    // it will generate a random six digit number

    const otp = String(Math.floor(100000 + Math.random() * 900000));

    // now we have to save this OTP in database for this particular user

    user.verifyOtp = otp;

    // now we have to set expiry time for this OTP after one day (24 hours)

    user.verifyOtpExpireAt = Date.now() + 24 * 60 * 60 * 1000;

    // now we have to this user

    await user.save();

    // after updating users data , we will send the email where we send OTP to the user

    const mailOption = {
      from: process.env.SENDER_EMAIL, // sender's mail id

      to: user.email, // user who has created the account

      subject: "Account Verification OTP",
      text: `Your OTP is ${otp}. Verify your account using this OTP`,
    };

    await transporter.sendMail(mailOption);

    res.json({ success: true, message: "Verification OTP Sent on Email" });

  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};


// function that will get the OTP and verify the user's account :: suppose user has recieved OTP on their email , then we have to enter the OTP in web application and the account will be verified 


export const verifyEmail = async (req,res) => {
 
  // we need user id , so we can verify the account and we need otp also

  const { userId , otp} = req.body

  // we have to check userId and otp is available or not 

  if(!userId || !otp){
    return res.json({ success: false , message: 'Missing Details'})
  }

  try {

    // first of all , we have to find the user on basis of userId from database

    const user = await userModel.findById(userId)

    if(!user){
      return res.json({ success: false , message: 'User not found'})
    }

    // verify the otp that otp entered by user is same as otp saved in database ( OTP is valid or not )

    if(user.verifyOtp === '' || user.verifyOtp !== otp){
      return res.json({ success: false , message: 'Invalid OTP'})
    }

    // check OTP validation time 
    if(user.verifyOtpExpireAt < Date.now()){

      // it means OTP already expired 
      res.json({ success: false , message: 'OTP'})
    }

    user.isAccountVerified = true;

    // now after the account verification , we'll reset the OTP and reset the expiryOTP in database 

    user.verifyOtp = ''
    user.verifyOtpExpireAt = 0

    await user.save()
    return res.json({ success: true , message: 'Email verified successfully'})

  } catch (error) {
    return res.json({ success: false , message: error.message})
  }
}

// but in controller funtion which will send the verification OTP and verify the account on basis of OTP   ::  but how will user send userId 


// kyuki user pe userId ka access thodi hoga , toh how we'll recieve userId for the both controller functions ?.....   user can only send OTP in the UI



// we'll get the userId from token and token is stored in the cookies , we 'll need a middleware that will get the cookie and from that cookie it will find the token and from that token , it will find the userId


// cookie --> token ---> user.id and that userId will be added in req.body

