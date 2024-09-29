const MenuItem = require("../models/menuItem"); // Assuming MenuItem model is imported
const mongoose = require('mongoose')

// Add a new menu item
const addItem = async (admin, body) => {
  try {
    // Check if the user is an admin
    if (admin.role !== "admin") {
      return {
        success: false,
        message: "Only admin can add menu item",
        status: 400,
      };
    }

    // Destructure the body
    const { name, price, description, category, picture, isAvailable } = body;

    // Validation checks
    if (!name || typeof name !== "string") {
      return {
        success: false,
        message: "Name is required and must be a string",
        status: 400,
      };
    }

    if (typeof price !== "number" || price <= 0) {
      return {
        success: false,
        message: "Price must be a positive number",
        status: 400,
      };
    }

    if (!category || typeof category !== "string") {
      return {
        success: false,
        message: "Category is required and must be a string",
        status: 400,
      };
    }

    // Check for existing menu item
    const existingItem = await MenuItem.findOne({ name });
    if (existingItem) {
      return {
        success: false,
        message: "Menu item with this name already exists",
        status: 400,
      };
    }

    // Create new menu item
    const newItem = new MenuItem({
      owner: admin._id,
      name,
      price,
      description,
      category,
      picture, // Changed from `image` to `picture` to match your schema
      isAvailable: isAvailable !== undefined ? isAvailable : true, // Default to true if not provided
    });

    const result = await newItem.save();
    if (!result) {
      return {
        success: false,
        message: "Failed to add menu item",
        status: 400,
      };
    }

    return {
      success: true,
      message: "Menu item added successfully",
      data: newItem,
      status: 200, // Add status for successful addition
    };
  } catch (err) {
    return {
      success: false,
      message: "Server error",
      data: err.message,
      status: 500, // Add status for server error
    };
  }
};

// Get all menu items
const getItems = async () => {
  try {
    const items = await MenuItem.find();
    return {
      success: true,
      message: "Menu items retrieved successfully",
      data: items,
      status: 200,
    };
  } catch (err) {
    return {
      success: false,
      message: "Server error",
      data: err.message,
      status: 500,
    };
  }
};

const getItem = async (id) => {
  try {
    // Check if ID is provided
    if (!id) {
      return {
        success: false,
        message: "Menu item ID is required",
        status: 400,
      };
    }

    // Attempt to find the menu item by ID
    const item = await MenuItem.findById(id);

    // Check if the item was found
    if (!item) {
      return {
        success: false,
        message: "Menu item not found",
        data: null,
        status: 404, // Use 404 for not found
      };
    }

    // Return the found item
    return {
      success: true,
      message: "Menu item retrieved successfully",
      data: item,
      status: 200,
    };
  } catch (err) {
    return {
      success: false,
      message: "Server error",
      data: err.message,
      status: 500,
    };
  }
};

// Update a menu item by ID
const updateItem = async (id, updateData) => {
  try {
    // Check if ID is provided
    if (!id) {
      return {
        success: false,
        message: "Menu item ID is required",
        status: 400,
      };
    }

    // Validate the ID format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return {
        success: false,
        message: "Invalid Menu item ID format",
        status: 400,
      };
    }

    // Check if the item exists
    const item = await MenuItem.findById(id);
    if (!item) {
      return {
        success: false,
        message: "Menu item not found",
        data: null,
        status: 404,
      };
    }

    // Validate the fields to be updated
    const { name, price, description, category, picture, isAvailable } = updateData;

    // Check for required fields
    if (!name || !price || !category) {
      return {
        success: false,
        message: "Name, price, and category are required",
        status: 400,
      };
    }

    // Perform the update
    item.name = name;
    item.price = price;
    item.description = description;
    item.category = category;
    item.picture = picture;
    item.isAvailable = isAvailable;

    const updatedItem = await item.save(); // Save the updated item

    return {
      success: true,
      message: "Menu item updated successfully",
      data: updatedItem,
      status: 200,
    };
  } catch (err) {
    return {
      success: false,
      message: "Server error",
      data: err.message,
      status: 500,
    };
  }
};


// Delete a menu item by ID
const deleteItem = async (id) => {
  try {
    // Check if ID is provided
    if (!id) {
      return {
        success: false,
        message: "Menu item ID is required",
        status: 400,
      };
    }

    // Validate the ID format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return {
        success: false,
        message: "Invalid Menu item ID format",
        status: 400,
      };
    }

    // Attempt to delete the menu item
    const deletedItem = await MenuItem.findByIdAndDelete(id);

    // Check if the item was found and deleted
    if (!deletedItem) {
      return {
        success: false,
        message: "Menu item not found",
        data: null,
        status: 404,
      };
    }

    return {
      success: true,
      message: "Menu item deleted successfully",
      data: deletedItem,
      status: 200,
    };
  } catch (err) {
    return {
      success: false,
      message: "Server error",
      data: err.message,
      status: 500,
    };
  }
};

module.exports = {
  addItem,
  getItems,
  getItem,
  updateItem,
  deleteItem,
};
