import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";
import transporter from "../config/nodemailer.js";
import {
  EMAIL_VERIFY_TEMPLATE,
  PASSWORD_RESET_TEMPLATE,
} from "../config/EmailTemplate.js";

import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

export const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    throw new ApiError(400, "Missing required fields", [
      { field: "name / email / password", message: "All fields are mandatory" },
    ]);
  }

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new ApiError(409, "User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const user = await User.create({ name, email, password: hashedPassword });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  try {
    await transporter.sendMail({
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: "Welcome to the club!",
      text: `Hey ${name},\n\nWelcome to our app! Your account has been created with the email: ${email}.\n\nEnjoy!`,
    });
  } catch (emailErr) {
    console.error("Email send failed:", emailErr.message);
  }

  const createdUser = await User.findById(user._id).select("-password");

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }

  return res
    .status(201)
    .json(new ApiResponse(201, createdUser, "User registered successfully"));
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400, "Email and password are required", [
      { field: "email / password", message: "Both fields are mandatory" },
    ]);
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(404, "Invalid email address");
  }

  const isMatched = await bcrypt.compare(password, user.password);

  if (!isMatched) {
    throw new ApiError(401, "Invalid password");
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  const loggedInUser = await User.findById(user._id).select("-password");

  return res
    .status(201)
    .json(new ApiResponse(201, loggedInUser, "User logged in successfully"));
});

export const logout = asyncHandler(async (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
  });

  return res
    .status(201)
    .json(new ApiResponse(201, null, "User logged out successfully"));
});

export const sendVerifyOtp = asyncHandler(async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    throw new ApiError(400, "User ID is required");
  }

  const user = await User.findById(userId);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  if (user.isAccountVerified) {
    return res.json({ success: false, message: "Account Already Verified" });
  }

  const otp = String(Math.floor(100000 + Math.random() * 900000));
  user.verifyOtp = otp;
  user.verifyOtpExpireAt = Date.now() + 24 * 60 * 60 * 1000;

  await user.save();

  const mailOptions = {
    from: process.env.SENDER_EMAIL,
    to: user.email,
    subject: "Account Verification OTP",
    html: EMAIL_VERIFY_TEMPLATE.replace("{{otp}}", otp).replace(
      "{{email}}",
      user.email
    ),
  };

  await transporter.sendMail(mailOptions);

  return res
    .status(201)
    .json(new ApiResponse(201, null, "Verification OTP sent to email"));
});

export const verifyEmail = asyncHandler(async (req, res) => {
  const { userId, otp } = req.body;

  if (!userId || !otp) {
    throw new ApiError(400, "User ID and OTP are required", [
      { field: "userId / otp", message: "Both fields are mandatory" },
    ]);
  }

  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  if (!user.verifyOtp || user.verifyOtp !== otp) {
    throw new ApiError(401, "Invalid OTP");
  }

  if (user.verifyOtpExpireAt < Date.now()) {
    throw new ApiError(410, "OTP has expired");
  }

  user.isAccountVerified = true;
  user.verifyOtp = "";
  user.verifyOtpExpireAt = 0;

  await user.save();

  return res
    .status(201)
    .json(new ApiResponse(201, null, "Email verified successfully"));
});

export const isAuthenticated = asyncHandler(async (req, res) => {
  return res.status(201).json(new ApiResponse(201, null, "User authenticated"));
});

export const sendResetOtp = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email) {
    throw new ApiError(400, "Email is required");
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const otp = String(Math.floor(100000 + Math.random() * 900000));
  user.resetOtp = otp;
  user.resetOtpExpireAt = Date.now() + 15 * 60 * 1000;

  await user.save();

  const mailOptions = {
    from: process.env.SENDER_EMAIL,
    to: user.email,
    subject: "Password Reset OTP",
    html: PASSWORD_RESET_TEMPLATE.replace("{{otp}}", otp).replace(
      "{{email}}",
      user.email
    ),
  };

  await transporter.sendMail(mailOptions);

  return res
    .status(201)
    .json(new ApiResponse(201, null, "OTP sent to your email"));
});

export const resetPassword = asyncHandler(async (req, res) => {
  const { email, otp, newPassword } = req.body;

  if (!email || !otp || !newPassword) {
    throw new ApiError(400, "Email, OTP and new password are required", [
      {
        field: "email / otp / newPassword",
        message: "All fields are mandatory",
      },
    ]);
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  if (!user.resetOtp || user.resetOtp !== otp) {
    throw new ApiError(401, "Invalid OTP");
  }

  if (user.resetOtpExpireAt < Date.now()) {
    throw new ApiError(410, "OTP has expired");
  }

  const hashedPassword = await bcrypt.hash(newPassword, 12);

  user.password = hashedPassword;
  user.resetOtp = "";
  user.resetOtpExpireAt = 0;
  await user.save();

  return res
    .status(201)
    .json(new ApiResponse(201, null, "Password has been reset successfully"));
});




























// Get user details from frontend ( extract all data points ) : we need email,password ,name which we get from req.body

// create user account and stores all data/info about user in database

// check existing user in database with email

// Asynchronously generates a hash for the given password with salt ( salt increase krne se higher security but takes time )

// new user will be created and stored in database with following credentials/data

// generate token using jwt for authentication

// now we have to send this token to frontend  in user's response using cookies

// so only http request can access these cookies

// whenever we run this project on live server, then it will run on https , then secure: true

// running this project on local environment , it will run on http , so secure: false (not secure)

// local development pe strict  because in local environment , both backend and frontend will run on localhost , so same environment

// but when we deploy this app on server , we can run backend on another domain name and  our frontend is running on another domain name , there we have to add sameSite: none

// expires cookie in 7 days

// script to sending welcome email to user when successfully creating account

// user who has created the account

// email subject

// sender's mail id

// we do not store original password in database , we have to encrypt password befor storing in database

// now we have to generate token for authentication and we will send this token using cookies

// whenever new user is created in mongoDB database, it generates unique id for each user (mongoDB generated id for each model document created )

// function to register , login , logout , verify account  and password reset

// await user.save()	Optional: User.create() already saves the doc — await user.save() is redundant unless you've added pre/post hooks that mutate fields (you can safely remove it)

// Get user details from frontend ( extract all data points ) : we need email,password which we get from req.body

// now we need to find user in database by email address

// if user exist in database with this email , then we need to check for password

// compare both password : password stored in database and password user has provided

// Asynchronously tests a password against a hash.

// generate token ( user will be authenticated and loggedIn in website )

// just we have to clear the cookie from response

// Now we have to create API endpoint using this controller function --> routes define for login , logout, register

// controller for email verification  , so that user can verify the email ID and verify their account

// Send Verification OTP to the User's email ( verify the user's account )

// first we have to get user ID to verify the user and we will get user ID from req.body

// find the user from our database
// check account is verified or not

// if user's account is not verified then script to generate one OTP will sent on user's emailId

// it will generate a random six digit number

// now we have to save this OTP in database for this particular user

// now we have to set expiry time for this OTP after one day (24 hours)

// now we have to save this user

// after updating users data , we will send the email where we send OTP to the user
// sender's mail id

// user who has created the account
// text: `Your OTP is ${otp}. Verify your account using this OTP`,

// function that will get the OTP and verify the user's account :: suppose user has recieved OTP on their email , then we have to enter the OTP in web application and the account will be verified

// Verify the email using OTP
// we need user id , so we can verify the account and we need otp also

// we have to check userId and otp is available or not

// first of all , we have to find the user on basis of userId from database
// verify the otp that otp entered by user is same as otp saved in database ( OTP is valid or not )

// check OTP validation time

// it means OTP already expired

// now after the account verification , we'll reset the OTP and reset the expiryOTP in database

// but in controller funtion which will send the verification OTP and verify the account on basis of OTP   ::  but how will user send userId

// kyuki user pe userId ka access thodi hoga , toh how we'll recieve userId for the both controller functions ?.....   user can only send OTP in the UI

// we'll get the userId from token and token is stored in the cookies , we 'll need a middleware that will get the cookie and from that cookie it will find the token and from that token , it will find the userId

// cookie --> token ---> user.id and that userId will be added in req.body

// Check if user is authenticated

// before this controller function , we will execute the middleware and the middleware will be executed

// Send password reset OTP ( controller function that will send the password reset OTP to user)

// first we have to get the email Id from req.body , so whenever user try to reset the password , it need to provide email Id

// firstly we need to find the user using the given email Id

// if user is present in database with this email Id , then we'll generate one OTP and OTP will be saved in database and that OTP will sent on email

// it will generate a random six digit number

// now we have to save this OTP in database for this particular user

// now we have to set expiry time for this OTP after one day (15 min)

// now we have to save this user
// after updating users data , we will send the email where we send OTP to the user

// sender's mail id

// user who has created the account
// text: `Your OTP for resetting your password is ${otp}. Use this OTP to proceed with resetting your password`,

// we have to check this user exists with email or not

// controller function where user can verify the OTP and reset the password

// Reset User Password
// we need to extract datapoints like reset OTP,email Id,new password for setting new password from req.body

// try to find user in the database with the help of email Id

// Check the reset otp user provided is valid or not || and check the otp in database is match with the otp that user provdes

// check for the expiry date of reset OTP

// now we have to update user's password with newPassword but firstly we need to encrypt it before saving in database

// Asynchronously generates a hash for the given password and Salt length to generate or salt to use

// now we have to save the user

// now update the password in user's database and reset the otp and otp expiry in database
