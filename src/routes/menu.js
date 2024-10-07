const express = require("express");
const router = express.Router();

const auth = require("../../middleware/auth");
const upload = require("../utils/multer");

const {
    addItem,
    getItems,
    getItem,
    updateItem,
    deleteItem,
    updateAvailability
} = 
require("../controllers/menu");

router.post("/add", auth,upload.single('picture'),  addItem);

router.get("/getAll", auth, getItems);

router.get("/get/:id", auth, getItem);

router.put("/update/:id", auth,upload.single('picture'), updateItem);

router.delete("/delete/:id", auth, deleteItem);

router.put("/update/available/:id", auth, updateAvailability);

module.exports = router;
