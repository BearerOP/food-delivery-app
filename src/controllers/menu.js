const {
  addItem,
  getItems,
  getItem,
  updateItem,
  deleteItem,
  updateAvailability
} = require("../services/menuItem");

exports.addItem = async (req, res) => {
  try {
    const data = await addItem(req.user, req.body, req.file);
    if (data.success) {
      res.status(200).json(data);
    } else {
      res.status(403).json(data);
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

exports.getItem = async (req, res) => {
  try {
    const data = await getItem(req.params.id);
    if (data.success) {
      res.status(200).json(data);
    } else {
      res.status(403).json(data);
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

exports.updateItem = async (req, res) => {
  try {
    const data = await updateItem(req.params.id,req.body,req.file);
    if (data.success) {
      res.status(200).json(data);
    } else {
      res.status(403).json(data);
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

exports.updateAvailability = async (req, res) => {
  try {
    const data = await updateAvailability(req.params.id,req.body);
    if (data.success) {
      res.status(200).json(data);
    } else {
      res.status(403).json(data);
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

exports.deleteItem = async (req, res) => {
  try {
    const data = await deleteItem(req.params.id);
    if (data.success) {
      res.status(200).json(data);
    } else {
      res.status(403).json(data);
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

exports.getItems = async (req, res) => {
  try {
    const data = await getItems();
    if (data.success) {
      res.status(200).json(data);
    } else {
      res.status(403).json(data);
    }
  } catch (error) {
    console.error("Error:", error);
  }
};
