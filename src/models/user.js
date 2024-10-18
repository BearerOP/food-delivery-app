const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    mobile: {
      type: Number,
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: ["customer", "admin"],
      default: "customer",
    },
    password: {
      type: String,
      required: true,
    },
    address: {
      houseNo: { type: String, default: "" },
      street: { type: String, default: "" },
      city: { type: String, default: "" },
      state: { type: String, default: "" },
      zip: { type: Number, default: 0 },
      latitude: { type: Number, default: 0 },
      longitude: { type: Number, default: 0 },
    },
    picture: {
      type: String,
      default:
        "https://firebasestorage.googleapis.com/v0/b/theslugproject.appspot.com/o/usre.png?alt=media&token=0e70b4f5-bb5c-438d-9607-81a632867209",
    },
    authKey: {
      type: String,
      default: null,
    },
    notificationToken: {
      type: String,
      default: null,
    },
    orders: [{ type: String, ref: "Order" }],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
