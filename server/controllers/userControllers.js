import userModel from "../models/userModel.js";

export const getUserData = async(req,res) => {
  try {

    // first we have to find the user on the basis of userId (userId added by userAuth middleware in req.body) 

    const { userId } = req.body

    // find the user in database on basis of userId

    const user = await userModel.findById(userId)

    if(!user){
      return res.json({ success: false , message: "User not found"})
    }

    res.json({
      success: true, // coz we get the user's details

      userData: {
        name: user.name,
        isAccountVerified: user.isAccountVerified
      }
    })

  } catch (error) {
    res.json({success: false , message: error.message})
  }
}