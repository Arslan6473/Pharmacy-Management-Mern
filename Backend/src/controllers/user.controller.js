import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";

const generateAccessTokenAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new Error("Something went wrong while generating refresh and access token");
  }
};

const registerUser = asyncHandler(async (req, res) => {
  // Get user data from frontend
  const { email, password, confirmPassword, fullName } = req.body;

  // Validate not empty
  if ([email, password, fullName, confirmPassword].some(field => !field?.trim())) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Validate password and confirm password
  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Password and confirm password do not match" });
  }

  // Validate email
  if (!email.includes("@")) {
    return res.status(400).json({ message: "Email requires @ symbol" });
  }

  // Check if user already exists
  const existedUser = await User.findOne({ email });
  if (existedUser) {
    return res.status(409).json({ message: "User with the email or username already exists" });
  }

  // Create user object - create entry in db
  const user = await User.create({
    fullName,
    email,
    password,
  });

  const createdUser = await User.findById(user.id).select("-password -refreshToken");
  if (!createdUser) {
    return res.status(500).json({ message: "Something went wrong while registering the user" });
  }

  // Return response
  return res.status(201).json(createdUser);
});

const loginUser = asyncHandler(async (req, res) => {
  // Get user data from frontend
  const { email, password } = req.body;

  if (!(email && password)) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  // Check password
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const isValidPassword = await user.isPasswordCorrect(password);
  if (!isValidPassword) {
    return res.status(401).json({ message: "Invalid user credentials" });
  }

  // Generate access token and refresh token
  const { accessToken, refreshToken } = await generateAccessTokenAndRefreshToken(user._id);

  const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

  const option = {
    httpOnly: true,
    secure: true,
  };

  // Send cookie response
  return res
    .status(200)
    .cookie("accessToken", accessToken, option)
    .cookie("refreshToken", refreshToken, option)
    .json(loggedInUser);
});

const signoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user?._id,
    {
      $unset: {
        refreshToken: 1,
      },
    },
    { new: true }
  );

  const option = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", option)
    .clearCookie("refreshToken", option)
    .json({});
});

export { registerUser, loginUser, signoutUser };
