import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import { User } from "../Model/userSchema.js";
import { sendToken } from "../utils/jwtToken.js";

// ----REGISTER-----
export const register = catchAsyncErrors(async (req, res) => {
  const { name, email, phone, password, role } = req.body;

  if (!name || !email || !phone || !password || !role) {
    return res.status(400).json({
         success: false, 
         message: "Please fill full form!" });
  }

  const isEmail = await User.findOne({ email });
  if (isEmail) {
    return res.status(400).json({
     success: false,
     message: "Email already registered!" });
  }

  const user = await User.create({
    name,
    email,
    phone,
    password,
    role,
  });

  sendToken(user, 201, res, "User Registered Successfully!");
});
