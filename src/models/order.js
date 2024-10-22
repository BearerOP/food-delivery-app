const mongoose = require("mongoose");
const { Schema } = mongoose;

const orderSchema = new Schema(
  {
    orderId: {
      type: String,
      required: true,
    },
    transactionId: {
      type: String,
      required: true,
    },
    recieptNo: {
      type: Number,
      required: true,
    },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    items: [
      {
        id: {
          type: Schema.Types.ObjectId,
          ref: "MenuItem",
          required: true,
        },
        quantity: { type: Number, required: true },
      },
    ],
    totalPrice: { type: Number, required: true },
    status: {
      type: String,
      enum: ["pending", "accepted", "in-progress", "delivered", "cancelled"],
      default: "pending",
    },
    deliveryAddress: {
      houseNo: { type: String },
      street: { type: String },
      city: { type: String },
      state: { type: String },
      zip: { type: Number },
      latitude: { type: Number },
      longitude: { type: Number },
    },
    userContact: {
      type: Number,
      required: true,
    },
    orderTime: {
      type: String,
      required: true,
    }, // Set when order is initiated
    paymentMethod: {
      type: String,
      enum: ["cash", "card", "online", "upi", "netbanking"],
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid"],
      default: "pending",
    },
    deliveryPerson: { type: Schema.Types.ObjectId, ref: "User" }, // Added delivery person
  },
  { timestamps: true }
);

const deliveryChargeSchema = new Schema(
  {
    deliveryCharge: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = {
  Order: mongoose.model("Order", orderSchema),
  DeliveryCharge: mongoose.model("DeliveryCharge", deliveryChargeSchema),
};
