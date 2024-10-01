const express = require("express");
const router = express.Router();

const auth = require("../../middleware/auth");

const {
    updateOrder,
    orderPlaced,
    getAllOrders,
} = require('../controllers/order')

router.post('/placed', auth, orderPlaced);

router.put('/update/:orderId', auth, updateOrder)

router.get('/all', auth, getAllOrders)

module.exports = router;