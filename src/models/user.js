const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    mobile: {
      type: String,
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
      houseNo: { type: String, required: true },
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      zip: { type: Number, required: true },
      latitude: { type: Number },
      longitude: { type: Number },
    },
    picture: {
      type: String,
      default: "",
    },
    authKey: {
      type: String,
      default: null,
    },
    notificationToken: {
      type: String,
      default: null,
    },
    orders: [{ type: Schema.Types.ObjectId, ref: "Order" }],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
