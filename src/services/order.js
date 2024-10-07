const User = require("../models/user");
const Order = require("../models/order");

exports.orderPlaced = async (user, body) => {
  try {
    const {
      orderId,
      transactionId,
      recieptNo,
      items,
      orderTime,
      totalPrice,
      status, // 'pending', 'accepted', 'in-progress', 'delivered', 'cancelled'
      paymentMethod, // ''cash', 'card', 'online','upi','netbanking'
      paymentStatus, // 'pending','paid'
    } = body;
    const userId = user._id;
    const existingUser = await User.findById(userId);
    if (!existingUser) {
      return { status: 404, message: "User not found", success: false };
    }
    const order = new Order({
      userId,
      orderId,
      transactionId,
      recieptNo,
      orderTime,
      items,
      totalPrice,
      status,
      deliveryAddress: user.address,
      paymentMethod,
      paymentStatus,
    });
    
    const placedOrder = await order.save();
    if (!placedOrder) {
      return { status: 404, message: "Order not placed", success: false };
    }
    const savedOrder = await User.findByIdAndUpdate(existingUser._id, {
      $push: { orders: placedOrder.orderId },
    });
    if (!savedOrder) {
      return { status: 404, message: "Order not saved", success: false };
    }
    return { status: 200, message: "Order placed successfully", success: true };
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      message: error || "Internal Server Error",
      success: false,
    };
  }
};

exports.updateOrder = async (user, orderId, updates) => {
  try {
    if (user.role !== "admin") {
      return { status: 403, message: "Access denied", success: false };
    }
    // Find the order by orderId
    const order = await Order.findOne({ orderId });

    if (!order) {
      return { status: 404, message: "Order not found", success: false };
    }

    // Destructure the fields that you want to update from the request body
    const {
      status, // Update order status: 'pending', 'accepted', 'in-progress', 'delivered', 'cancelled'
      deliveryAddress, // Update delivery address if needed
      paymentStatus, // Update payment status: 'pending', 'paid'
      paymentMethod, // Optional: Update payment method: 'cash', 'card', 'online', 'upi', 'netbanking'
      items, // Optional: Update order items
      totalPrice, // Optional: Update total price
    } = updates;

    // Update the fields if they are provided
    if (status) order.status = status;
    if (deliveryAddress) order.deliveryAddress = deliveryAddress;
    if (paymentStatus) order.paymentStatus = paymentStatus;
    if (paymentMethod) order.paymentMethod = paymentMethod;
    if (items) order.items = items;
    if (totalPrice) order.totalPrice = totalPrice;

    // Save the updated order
    const updatedOrder = await order.save();

    return {
      status: 200,
      message: "Order updated successfully",
      success: true,
      data: updatedOrder,
    };
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      message: error.message || "Internal Server Error",
      success: false,
    };
  }
};

exports.getAllOrders = async (user) => {
  try {
    if (!user) {
      return { status: 401, message: "Unauthorized", success: false };
    }

    let orders;
    
    if (user.role === "customer") {
      // Retrieve only the orders for the specific customer
      orders = await Order.find({ userId: user._id }).populate({
        path: 'items.id',
        model: 'MenuItem'
      });
    } else if (user.role === "admin") {
      // Admin retrieves all orders
      orders = await Order.find().populate({
        path: 'items.id',
        model: 'MenuItem'
      });
    }

    if (!orders) {
      return { status: 404, message: "No orders found", success: false };
    }

    return {
      status: 200,
      message: "Orders retrieved successfully",
      success: true,
      data: orders,
    };
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      message: error.message || "Internal Server Error",
      success: false,
    };
  }
};
