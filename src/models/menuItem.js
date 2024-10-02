const mongoose = require("mongoose");
const { Schema } = mongoose;

const menuItemSchema = new Schema(
  {
    owner:{
      type: Schema.Types.ObjectId, // restaurantId for admin
      ref: "User",
    },
    name: {
      type: String,
      required: true,
    },
    picture: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    veg:{
      type: Boolean,
      default: true,
    },
    rating: {
      type: Number,
      default: 0,
      },
  },
  { timestamps: true }
);

module.exports = mongoose.model("MenuItem", menuItemSchema);
