// controller function to find token from cookie and from token it will find the userId

import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const userAuth = asyncHandler(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    throw new ApiError(401, "Unauthorized. Please log in again.");
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  if (!decoded?.id) {
    throw new ApiError(401, "Invalid token. Please log in again.");
  }

  const user = await User.findById(decoded.id).select("-password");
  if (!user) {
    throw new ApiError(401, "User not found");
  }

  req.user = user;
  next();
});

export default userAuth;





/*

this middleware function will be executed whenever we'll hit the API endpoint 
  
    - it will get the token from cookie 
    - after that we'll get the decoded token by jwt verify

    - from decoded token , we'll get the userId
    - then added it into req.body

*/

/*

Middleware ek function hota hai jo HTTP request aur response ke beech mein kaam karta hai.

    Ye function kuch kaam kar sakta hai jaise:

      - Request data ko check karna (e.g. authentication)

      - Request ko modify karna

      - Response bhejne se pehle kuch kaam karna


next() function kya karta hai?

    next() middleware ka ek built-in function hota hai. Iska kaam hota hai:
       
       - Control ko agle middleware ya route handler tak forward karna.


Agar tum next() nahi call karte ho, to request wahi ruk jaata hai, aur Express samajhta hai ki response abhi complete nahi hua hai.



Note: Agar tum response khud bhej doge (e.g., res.send()), to next() zaroori nahi hota — kyunki ab response complete ho gaya.

 */

// So from request , it will try to find the token that is stored in cookie

// so firstly we have to decode the token which we are getting from cookies using JWT

// Synchronously verify given token using a secret or a public key to get a decoded token

// JWT string to verify secretOrPublicKey - Either the secret for HMAC algorithms, or the PEM encoded public key for RSA and ECDSA.

// returns - The decoded token.

// now from this decode token , we'll need to find id because for creating token , we have used the userId

// then we'll add this id in request body with the property userId

// Ensure req.body is not undefined

// it will call or try to execute our controller function after this function
