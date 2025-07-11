import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    verifyOtp: {
      type: String,
      default: "",
      select: false,
    },
    verifyOtpExpireAt: {
      type: Date,
      default: null,
    },
    isAccountVerified: {
      type: Boolean,
      default: false,
    },
    resetOtp: {
      type: String,
      default: "",
      select: false,
    },
    resetOtpExpireAt: {
      type: Date,
      default: null,
    },
    twoFactorOtp: {
      type: String,
      default: "",
      select: false,
    },
    twoFactorOtpExpiresAt: {
      type: Date,
      default: null,
    },
    twoFactorEnabled: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const User = mongoose.models.user || mongoose.model("user", userSchema);




















// Now we can use this user model to store data of user in mongoDB database

/* 

mongoose.models holds already-registered models.
So it reuses the model if already defined.
Prevents re-registering and avoids runtime errors.



mongoose model jab database se connect ho jayega toh files automatically run hojati h and database ka ek structure taiyaar hojata h

model User jaise hi database mein jata h toh uska naam users hojata h ( mongoDb standardized practice )


In Mongoose, a schema is a blueprint that defines the structure of documents in MongoDB collections


A schema defines the shape and organization of data, including fields, their types, validation rules, and default values

Mongoose is a JavaScript object-oriented programming library that creates a connection between MongoDB and the Node.js JavaScript runtime environment.


Writing MongoDB validation, casting and business logic boilerplate is a drag

timestamps : true provides us two fields
createdAt , updatedAt

*/

// Now ,To create a new user : we need to create user controller function , using it we will create the API endpoint

// email verification OTP : when user created default value : ""

// expired time of verification OTP

// to check user is verified or not

// when new user created and stored in database by default , it's unverified

// OTP used to reset the password , it's expiryTime

// avoid creating mongoose models , if user model already exist
