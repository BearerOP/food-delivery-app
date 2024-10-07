const {
  login,
  register,
  logout,
  profile,
  getAll,
  updateProfile,
  updateAddress,
  getAddress
} = require("../services/userValidation.js");


exports.login = async (req, res) => {
  try {
    const data = await login(req, res);
    if (data.success) {
      res.status(200).json(data);
    } else {
      res.status(403).json(data);
    }
  } catch (error) {
    console.error("Error:", error);
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
    console.error("Error:", error);
  }
};
exports.logout = async (req, res) => {
  try {
    const data = await logout(req, res);
    if (data.success) {
      res.status(200).json(data);
    }
  } catch (error) {
    console.error("Error: ", error);
  }
};

exports.profile = async (req, res) => {
  try {
    const data = await profile(req, res);
    if (data.success) {
      res.status(200).json(data);
    }
  } catch (error) {
    console.error("Error: ", error);
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
    console.error("Error:", error);
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
    console.error("Error:", error);
  }
};

exports.updateAddress = async (req, res) => {
  try {
    const data = await updateAddress(req.user,req.body);
    if (data.success) {
      res.status(200).json(data);
    } else {
      res.status(403).json(data);
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

exports.getAddress = async (req, res) => {
  try {
    const data = await getAddress(req.user);
    if (data.success) {
      res.status(200).json(data);
    } else {
      res.status(403).json(data);
    }
  } catch (error) {
    console.error("Error:", error);
  }
};