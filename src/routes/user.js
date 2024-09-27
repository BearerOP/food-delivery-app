const express = require("express");
const router = express.Router();
const multer = require("multer");

const auth = require("../../middleware/auth");

const storageMulter = multer.memoryStorage();
const upload = multer({ storage: storageMulter });

const {
  login,
  register,
  logout,
  profile,
  getAll,
  updateProfile,
  profilePicture
} = require("../controllers/user.js");

router.post("/login", login);

router.post("/register", register);

router.post("/logout", auth, logout);

router.get("/profile", auth, profile);

router.get("/getAll", auth, getAll);

router.put("/profile/update", auth, updateProfile);

router.post("/profile/picture", auth, upload.single("file"), profilePicture);

module.exports = router;
