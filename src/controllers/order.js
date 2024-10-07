const {
  orderPlaced,
  updateOrder,
  getAllOrders,
} = require("../services/order.js");

exports.orderPlaced = async (req, res) => {
  try {
    const data = await orderPlaced(req.user, req.body);
    if (data.success) {
      res.status(200).json(data);
    } else {
      res.status(403).json(data);
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

exports.updateOrder = async (req, res) => {
  try {
    const data = await updateOrder(req.user,req.params.orderId, req.body);
    if (data.success) {
      res.status(200).json(data);
    } else {
      res.status(403).json(data);
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const data = await getAllOrders(req.user);
    if (data.success) {
      res.status(200).json(data);
    } else {
      res.status(403).json(data);
    }
  } catch (error) {
    console.error("Error:", error);
  }
};
