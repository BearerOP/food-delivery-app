const Discount = require("../models/discount");
const {DeliveryCharge} = require('../models/order')

const createDiscount = async (admin, discount) => {
  try {
    if (admin.role !== "admin") {
      return {
        success: false,
        message: "Only admin can add menu item",
        status: 400,
      };
    }

    const { discountCode, discountPercent, discountDescription } = discount;
    const existingDiscount = await Discount.findOne({ discountCode });
    
    if (existingDiscount) {
      return {
        success: false,
        message: "Discount code already exists",
        status: 400,
      };
    }
    const newDiscount = new Discount({
      discountCode,
      discountPercent,
      discountDescription,
      adminId: admin._id,
    });
    const savedDiscount = await newDiscount.save();
    return {
      success: true,
      message: "Discount created successfully",
      status: 200,
      data: savedDiscount,
    };
  } catch (error) {
    return {
      success: false,
      message: "Failed to create discount",
      status: 500,
      error: error.message,
    };
  }
};

const getDiscounts = async (discountId) => {
  try {
    if (!discountId) {
      return {
        success: false,
        message: "Discount id is required",
        status: 400,
      };
    }
    const deliveryCharge = await DeliveryCharge.find();


    if (discountId) {
      const discount = await Discount.findById(discountId);
      if (!discount) {
        return {
          success: false,
          message: "Discount not found",
          status: 404,
        };
      }
      return {
        success: true,
        message: "Discount found",
        status: 200,
        discount: discount,
        deliveryCharge:deliveryCharge
      };
    }
  } catch (error) {
    return {
      success: false,
      message: "Failed to get discounts",
      status: 500,
      error: error.message,
    };
  }
};

const getAllDiscounts = async () => {
  try {
    const deliveryCharge = await DeliveryCharge.find();
    const discounts = await Discount.find();
    return {
      success: true,
      message: "All Discounts retrieved successfully",
      discounts: discounts,
      deliveryCharge: deliveryCharge,
      status: 200,
    };
  } catch (err) {
    return {
      success: false,
      message: "Failed to get all discounts",
      data: err.message,
      status: 500,
    };
  }
};

const updateDiscount = async (discountId, updatedDiscount) => {
    try {
        if(!discountId || !updateDiscount){
            return {
                success: false,
                status: 400,
                message: "Invalid request: discountId & updatedDiscount is required"
            }
        }
      const discount = await Discount.findByIdAndUpdate(
        discountId,
        updatedDiscount,
        {
          new: true,        
          runValidators: true,
        }
      );
  
      if (!discount) {
        return {
          success: false,
          message: "Discount not found",
          status: 404,
        };
      }
  
      return {
        success: true,
        message: "Discount updated successfully",
        status: 200,
        data: discount,
      };
    } catch (error) {
      return {
        success: false,
        message: "Failed to update discount",
        status: 500,
        error: error.message,
      };
    }
  };

  const deleteDiscount = async (discountId) => {
    try {
      if (!discountId) {
        return {
          success: false,
          status: 400,
          message: "Invalid request: discountId is required",
        };
      }
  
      const discount = await Discount.findByIdAndDelete(discountId);
  
      if (!discount) {
        return {
          success: false,
          status: 404,
          message: "Discount not found",
        };
      }
      return {
        success: true,
        status: 200,
        message: "Discount deleted successfully",
      };
      
    } catch (error) {
      return {
        success: false,
        message: "Failed to delete discount",
        status: 500,
        error: error.message,
      };
    }
  };
  
  

module.exports = {
  createDiscount,
  getDiscounts,
  getAllDiscounts,
  updateDiscount,
  deleteDiscount
};
