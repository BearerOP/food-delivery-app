const mongoose = require("mongoose");
const { Schema } = mongoose;

const discountSchema = new Schema(
  {
    adminId:{
      type: Schema.Types.ObjectId,
      ref: "Admin",
      required: true
    },
    discountCode: { 
      type: String, 
      default: "",
      required: true,
    },
    discountPercent: {
      type: Number,
      default: 0,
      required: true,
    },
    discountDescription:{
      type: String,
      default: "",
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Discount", discountSchema);

