const express = require("express");
const router = express.Router();

const auth = require("../../middleware/auth");

const {
    addItem,
    getItems,
    getItem,
    updateItem,
    deleteItem,
} = 
require("../controllers/menu");

router.post("/add", auth, addItem);

router.get("/getAll", auth, getItems);

router.get("/get/:id", auth, getItem);

router.put("/update/:id", auth, updateItem);

router.delete("/delete/:id", auth, deleteItem);

module.exports = router;
