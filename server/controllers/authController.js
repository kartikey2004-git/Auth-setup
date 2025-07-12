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
import { generateAccessAndRefreshTokens } from "../utils/generateAccessTokenAndRefreshToken.js";
import bcrypt from "bcryptjs";

// Handles new user creation, validation, password hashing, and welcome email

export const register = asyncHandler(async (req, res) => {
  // Extract user registration details (name, email, password) from the request body sent by the frontend/postman

  const { name, email, password } = req.body;

  // Validate that name, email, and password are present in the request body

  if (!name || !email || !password) {
    throw new ApiError(400, "Missing required fields", [
      { field: "name / email / password", message: "All fields are mandatory" },
    ]);
  }

  // Check if a user with the given email already exists in the database

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new ApiError(409, "User already exists");
  }

  // password received will be automatically hashed by the pre('save') middleware defined in the user model

  // Create a new user in the database with the provided details

  const user = await User.create({
    name,
    email,
    password,
  });

  // Generate access token and refresh token for the authenticated user

  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    user
  );

  // Send the extracted refresh token in a secure HTTP-only cookie to the client

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  // Send a welcome email to the user upon successful registration

  await transporter
    .sendMail({
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: "Welcome to the club!",
      text: `Hey ${name},\n\nWelcome to our app! Your account has been created with the email: ${email}.\n\nEnjoy!`,
    })
    .catch((err) => {
      throw new ApiError(500, `Failed to send welcome email: ${err.message}`);
    });

  // Send only safe user fields in the response after successful registration (excluding password and sensitive data)

  const loggedInUser = await User.findById(user._id).select([
    "-password",
    "-refreshTokens",
    "-verifyOtp",
    "-verifyOtpExpireAt",
    "-resetOtp",
    "-resetOtpExpireAt",
    "-twoFactorOtp",
    "-twoFactorOtpExpiresAt",
  ]);

  return res
    .status(201)
    .json(
      new ApiResponse(
        201,
        { user: loggedInUser, accessToken },
        "User registered successfully"
      )
    );
});

// Handles user authentication, password verification, and token generation

export const login = asyncHandler(async (req, res) => {
  // Extract user's email and password from the request body for login

  const { email, password } = req.body;

  // Validate that both email and password are provided and not empty

  if (!email || !password) {
    throw new ApiError(400, "Email and password are required", [
      { field: "email / password", message: "Both fields are mandatory" },
    ]);
  }

  // Find the user in the database by email and explicitly include password and refreshToken fields

  const user = await User.findOne({ email }).select("+password +refreshTokens");

  if (!user) {
    throw new ApiError(404, "Invalid email address");
  }

  // Compare the provided password with the hashed password stored in the database

  const isMatched = await user.isPasswordCorrect(password);

  if (!isMatched) {
    throw new ApiError(401, "Invalid password");
  }

  // Generate access token and refresh token for the authenticated user

  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    user
  );

  // Send the extracted refresh token in a secure HTTP-only cookie to the client

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  // Send only safe user fields in the response after successful login (excluding password and sensitive data)

  const loggedInUser = await User.findById(user._id).select([
    "-password",
    "-refreshTokens",
    "-verifyOtp",
    "-verifyOtpExpireAt",
    "-resetOtp",
    "-resetOtpExpireAt",
    "-twoFactorOtp",
    "-twoFactorOtpExpiresAt",
    "-__v",
  ]);

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { user: loggedInUser, accessToken },
        "User logged in successfully"
      )
    );
});

// Handles refresh token invalidation, cookie clearance, and user session cleanup

export const logout = asyncHandler(async (req, res) => {
  // retrieve the refresh token from the request cookies

  const refreshToken = req.cookies?.refreshToken;

  // If the refresh token is missing, treat the user as already logged out

  if (!refreshToken) {
    return res
      .status(200)
      .json(new ApiResponse(200, null, "User already logged out"));
  }

  try {
    // Now verify the refresh token using JWT and check if it matches the secret stored in environment variables

    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

    // Remove the used refresh token from the user's refreshTokens array in the database

    await User.findByIdAndUpdate(decoded._id, {
      $pull: {
        refreshTokens: refreshToken,
      },
    });
  } catch (err) {
    console.warn("Refresh token verification failed:", err.message);
  }

  // Clear the refresh token cookie from the user's browser with proper security settings

  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
  });

  return res
    .status(200)
    .json(new ApiResponse(200, null, "User logged out successfully"));
});

//  Generate and email a 6‑digit OTP to verify the user’s account

export const sendVerifyOtp = asyncHandler(async (req, res) => {
  //  Destructure and validate request body

  const userId = req.user?._id;

  if (!userId) {
    throw new ApiError(400, "User ID is required");
  }

  if (!userId) {
    throw new ApiError(400, "User ID is required");
  }

  // Fetch the user from DB on basis of userId

  const user = await User.findById(userId);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  // Check if user account already verified
  if (user.isAccountVerified) {
    return res.json({ success: false, message: "Account Already Verified" });
  }

  // Create a 6‑digit OTP and set its expiry (24h)

  const otp = String(Math.floor(100000 + Math.random() * 900000));
  user.verifyOtp = otp;
  user.verifyOtpExpireAt = Date.now() + 24 * 60 * 60 * 1000;
  await user.save();

  //  Prepare and send verification email

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

// Validate OTP and mark user’s email as verified

export const verifyEmail = asyncHandler(async (req, res) => {
  //  Extract OTP from req.body
  const { otp } = req.body;

  // Extract user ID from auth middleware
  const userId = req.user?._id;

  if (!userId || !otp) {
    throw new ApiError(400, "User ID and OTP are required", [
      { field: "userId / otp", message: "Both fields are mandatory" },
    ]);
  }

  // Fetch user on basis of userID in database

  const user = await User.findById(userId).select(
    "+verifyOtp +verifyOtpExpireAt"
  );

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  // Validate OTP value

  if (!user.verifyOtp || user.verifyOtp !== otp) {
    throw new ApiError(401, "Invalid OTP");
  }

  // Validate OTP expiry

  if (user.verifyOtpExpireAt < Date.now()) {
    throw new ApiError(410, "OTP has expired");
  }

  // Mark account as verified and clear OTP fields

  user.isAccountVerified = true;
  user.verifyOtp = "";
  user.verifyOtpExpireAt = 0;

  await user.save();

  return res
    .status(201)
    .json(new ApiResponse(201, null, "Email verified successfully"));
});

// Check Authentication Status

export const isAuthenticated = asyncHandler(async (req, res) => {
  return res.status(201).json(new ApiResponse(201, null, "User authenticated"));
});

// Generate a 6‑digit OTP and email it to the user for password reset

export const sendResetOtp = asyncHandler(async (req, res) => {
  // Extract and validate email

  const { email } = req.body;

  if (!email) {
    throw new ApiError(400, "Email is required");
  }

  // Check if user exists with this current email

  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  // Create OTP valid for 15 minutes

  const otp = String(Math.floor(100000 + Math.random() * 900000));
  user.resetOtp = otp;
  user.resetOtpExpireAt = Date.now() + 15 * 60 * 1000;
  await user.save();

  // Configure and send OTP email

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

// Reset Password Using OTP

export const resetPassword = asyncHandler(async (req, res) => {
  // Extract and validate body fields

  const { email, otp, newPassword } = req.body;

  if (!email || !otp || !newPassword) {
    throw new ApiError(400, "Email, OTP and new password are required", [
      {
        field: "email / otp / newPassword",
        message: "All fields are mandatory",
      },
    ]);
  }

  // Fetch user by email

  const user = await User.findOne({ email }).select("+resetOtp +resetOtpExpireAt");

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  //  Validate OTP correctness
  if (!user.resetOtp || user.resetOtp !== otp) {
    throw new ApiError(401, "Invalid OTP");
  }

  // Validate OTP expiry
  if (user.resetOtpExpireAt < Date.now()) {
    throw new ApiError(410, "OTP has expired");
  }

  // Hash the new password and clear OTP fields
  const hashedPassword = await bcrypt.hash(newPassword, 12);

  user.password = hashedPassword;
  user.resetOtp = "";
  user.resetOtpExpireAt = 0;
  await user.save();

  return res
    .status(201)
    .json(new ApiResponse(201, null, "Password has been reset successfully"));
});

/*

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

// generate here access and refresh token by custom methods which are defined in user schema

// user.save() is a Mongoose method that saves the current document (user) to the MongoDB database.

// The option { validateBeforeSave: false } disables Mongoose validation before saving.

*/
