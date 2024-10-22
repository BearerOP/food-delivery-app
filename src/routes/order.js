const express = require("express");
const router = express.Router();

const auth = require("../../middleware/auth");

const {
    updateOrder,
    orderPlaced,
    getAllOrders,
    deliveryCharge
} = require('../controllers/order')

router.post('/placed', auth, orderPlaced);

router.put('/update/:orderId', auth, updateOrder)

router.get('/all', auth, getAllOrders)

router.put('/deliveryCharge', auth, deliveryCharge)

module.exports = router;