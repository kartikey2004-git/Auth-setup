// function to register , login , logout , verify account  and password reset

import { asyncHandler } from "../utils/asyncHandler.js";

export const register = asyncHandler(async (req, res) => {
  // Get user details from frontend ( extract all data points ) : we need email,password ,name which we get from req.body

  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.json();
  }
});
