const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
  try {
    const { mobile, password, notificationToken } = req.body;
    const existingUser = await User.findOne({ mobile });
    if (!existingUser) {
      return {
        success: false,
        message: "Invalid mobile number or not registered!",
      };
    }
    if (!notificationToken) {
      return res.json({ message: "Notification Token not provided!" });
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordValid) {
      return res.status(403).json({
        success: false,
        message: "Invalid mobile number or password",
      });
    }

    const token = jwt.sign({ user: existingUser._id }, process.env.SECRET_KEY);
    if (!token) {
      return res.json({ message: " Token generation failed" });
    }
    // Set the token to cookies
    res.cookie("token", token);
    res.cookie("role", existingUser.role);
    const authKeyInsertion = await User.findOneAndUpdate(
      { _id: existingUser._id },
      {
        authKey: token,
        notificationToken: notificationToken,
      },
      { new: true }
    );

    if (!authKeyInsertion) {
      return res.json({ message: "Token updation failed!" });
    }

    return {
      message: "User logged in successfully",
      success: true,
      token,
      role: existingUser.role,
    };
  } catch (error) {
    console.log(error);
    return {
      message: error.message || "Internal server error",
      success: false,
    };
  }
};

exports.register = async (req, res) => {
  const { username, mobile, role, password } = req.body;
  try {
    const existingUser = await User.findOne({ mobile });
    if (existingUser) {
      return {
        message: "User already exists",
        success: false,
      };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      mobile,
      role,
      password: hashedPassword,
    });

    if (newUser) {
      return {
        message: "User created successfully",
        success: true,
      };
    } else {
      return {
        message: "User creation failed",
        success: false,
      };
    }
  } catch (error) {
    console.log(error);
    return {
      message: error.message || "Internal server error",
      success: false,
    };
  }
};

exports.logout = async (req, res) => {
  let user = req.user;
  try {
    const currentUser = await User.findOneAndUpdate(
      { _id: user._id },
      { authKey: null, notificationToken: null }
    );
    res.clearCookie("token");
    if (currentUser) {
      return {
        success: true,
        message: "User logged out successfully",
      };
    } else {
      return {
        success: false,
        message: "User logout failed",
      };
    }
  } catch (error) {
    console.log(error);
    return {
      message: error.message || "Internal server error",
      success: false,
    };
  }
};

exports.profile = async (req, res) => {
  const user = req.user;
  try {
    if (!user) {
      return {
        success: false,
        message: "User not found",
      };
    }

    return {
      success: true,
      data: user,
    };
  } catch (error) {
    console.error("Error: ", error);
    return {
      success: false,
      message: "An unexpected error occurred",
      error: error,
    };
  }
};

exports.getAll = async (req, res) => {
  const user = req.user;
  try {
    if (!user) {
      return {
        success: false,
        message: "User not found",
      };
    }
    const users = await User.find({}).select("-password -authKey").exec();

    if (!users) {
      return {
        success: false,
        message: "Users not fetched",
      };
    }
    return {
      success: true,
      message: "Users data fetched",
      data: users,
    };
  } catch (error) {
    console.error("Error: ", error);
    return {
      success: false,
      message: "An unexpected error occurred",
      error: error,
    };
  }
};

exports.updateProfile = async (req, res) => {
  const user = req.user;
  if (!user) {
    return {
      success: false,
      message: "User not found",
    };
  }
  const { username } = req.body;

  try {
    if (username) {
      const existingUser = await User.findOne({ username: username });
      if (existingUser) {
        return {
          success: false,
          message: "Username already exists, try something else",
        };
      }
    }
    const updatedFields = {};
    if (username) updatedFields.username = username;

    updatedFields.updated_at = new Date();

    let updatedData = await User.findByIdAndUpdate(user._id, updatedFields, {
      new: true,
    });
    if (!updatedData) {
      return {
        success: false,
        message: "User not found",
      };
    }
    return {
      success: true,
      message: "Profile updated successfully",
    };
  } catch (err) {
    return {
      success: false,
      message: "An error occurred while updating the profile",
      error: err.message,
    };
  }
};

exports.updateAddress = async (user, address) => {
  try {
    if (!address) {
      return {
        status: 400,
        message: "Address is required",
        success: false,
      };
    }
    let existingUser = await User.findById(user._id);
    if (!existingUser) {
      return {
        success: false,
        message: "User not found",
        status: 404,
      };
    }
    existingUser.address = address;
    await existingUser.save();
    return {
      success: true,
      message: "User's Address updated successfully",
      status: 200,
    };
  } catch (err) {
    return {
      success: false,
      message: "Server error",
      status: 500,
    };
  }
};

exports.getAddress = async (user) => {
  try {
    let existingUser = await User.findById(user._id);
    if (!existingUser) {
      return {
        success: false,
        message: "User not found",
        status: 404,
      };
    }
    return {
      success: true,
      address: existingUser.address,
      status: 200,
    };
  } catch (err) {
    return {
      success: false,
      message: "Server error",
      status: 500,
    };
  }
};
