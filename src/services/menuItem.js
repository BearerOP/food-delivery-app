const MenuItem = require("../models/menuItem");
const mongoose = require('mongoose')
const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


const uploadToCloudinary = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream({ folder: 'menu_items' }, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });

    // Use streamifier to convert the file buffer into a readable stream
    streamifier.createReadStream(fileBuffer).pipe(uploadStream);
  });
};

const addItem = async (admin, body, file) => {
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
    const { name, price, description, category, isAvailable,veg } = body;

    // Validation checks
    if (!name || typeof name !== "string") {
      return {
        success: false,
        message: "Name is required and must be a string",
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

    // Upload image to Cloudinary if file is provided
    let imageUrl = '';
    if (file) {
      const result = await uploadToCloudinary(file.buffer);
      imageUrl = result.secure_url; // Get Cloudinary URL
    }
    
    // Create new menu item
    const newItem = new MenuItem({
      owner: admin._id,
      name,
      price,
      description,
      category,
      veg,
      picture: imageUrl,
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

// Update availability of menu item by ID
const updateAvailability = async (id, updateData) => {
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
    const { isAvailable } = updateData; // Add veg to destructure
    
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

const updateItem = async (id, updateData, file) => {
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

    let imageUrl = '';
    if (file) {
      // If a file is provided, upload it to Cloudinary
      const result = await uploadToCloudinary(file.buffer);
      imageUrl = result.secure_url; // Get Cloudinary URL
    }
    // Validate the fields to be updated
    const { name, price, description, category, isAvailable, veg } = updateData; // Add veg to destructure

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
    item.isAvailable = isAvailable;
    item.veg = veg; // Ensure veg is defined

    // If imageUrl is provided (i.e., a new image was uploaded), update the picture field
    if (imageUrl) {
      item.picture = imageUrl;
    }

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
  updateAvailability
};
