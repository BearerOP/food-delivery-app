const mongoose = require("mongoose");
const { Schema } = mongoose;

const orderSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    items: [{
      menuItem: { type: Schema.Types.ObjectId, ref: 'MenuItem', required: true },
      quantity: { type: Number, required: true }
    }],
    totalPrice: { type: Number, required: true },
    status: { 
      type: String, 
      enum: ['pending', 'accepted', 'in-progress', 'delivered', 'cancelled'], 
      default: 'pending' 
    },
    deliveryAddress: {
      street: String,
      city: String,
      state: String,
      country: String,
      zip: String,
    },
    deliveryTime: { type: Date }, // Set when delivery is initiated
    paymentMethod: { type: String, enum: ['cash', 'card', 'online'], required: true },
    paymentStatus: { type: String, enum: ['pending', 'paid'], default: 'pending' },
    deliveryPerson: { type: Schema.Types.ObjectId, ref: 'User' } // Added delivery person
  }, 
  { timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);
