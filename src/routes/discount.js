const express = require("express");
const router = express.Router();

const auth = require("../../middleware/auth");

const {
  getDiscounts,
  getAllDiscounts,
  createDiscount,
  updateDiscount,
  deleteDiscount,
} = require("../controllers/discount");

router.post("/create", auth, createDiscount);
router.put("/update/:id", auth, updateDiscount);
router.delete("/delete/:id", auth, deleteDiscount);
router.get("/get/:id", auth, getDiscounts);
router.get("/getAll", auth, getAllDiscounts);

module.exports = router;
