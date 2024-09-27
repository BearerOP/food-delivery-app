const {
  login,
  register,
  logout,
  profile,
  getAll,
  updateProfile,
} = require("../services/userValidation.js");

const { profilePicture } = require("../services/profilePicture.js")

exports.login = async (req, res) => {
  try {
    const data = await login(req, res);
    if (data.success) {
      res.status(200).json(data);
    } else {
      res.status(403).json(data);
    }
  } catch (error) {
    console.log("Error:", error);
  }
};

exports.register = async (req, res) => {
  try {
    const data = await register(req, res);
    if (data.success) {
      res.status(200).json(data);
    } else {
      res.status(403).json(data);
    }
  } catch (error) {
    console.log("Error:", error);
  }
};
exports.logout = async (req, res) => {
  try {
    const data = await logout(req, res);
    if (data.success) {
      res.status(200).json(data);
    }
  } catch (error) {
    console.log("Error: ", error);
  }
};

exports.profile = async (req, res) => {
  try {
    const data = await profile(req, res);
    if (data.success) {
      res.status(200).json(data);
    }
  } catch (error) {
    console.log("Error: ", error);
  }
};

exports.getAll = async (req, res) => {
  try {
    const data = await getAll(req, res);
    if (data.success) {
      res.status(200).json(data);
    } else {
      res.status(403).json(data);
    }
  } catch (error) {
    console.log("Error:", error);
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const data = await updateProfile(req, res);
    if (data.success) {
      res.status(200).json(data);
    } else {
      res.status(403).json(data);
    }
  } catch (error) {
    console.log("Error:", error);
  }
};

exports.profilePicture = async (req, res) => {
  try {
    const data = await profilePicture(req, res);
    if (data.success) {
      res.status(200).json(data);
    } else {
      res.status(403).json(data);
    }
  } catch (error) {
    console.log("Error:", error);
  }
};
