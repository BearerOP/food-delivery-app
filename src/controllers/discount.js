const {
    getDiscounts,
    getAllDiscounts,
    createDiscount,
    updateDiscount,
    deleteDiscount,
  } = require('../services/discount')



exports.createDiscount = async (req, res) => {
  try {
    const data = await createDiscount(req.user, req.body);
    if (data.success) {
      res.status(200).json(data);
    } else {
      res.status(403).json(data);
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

exports.getDiscounts = async (req, res) => {
    try {
      const data = await getDiscounts(req.params.id);
      if (data.success) {
        res.status(200).json(data);
      } else {
        res.status(403).json(data);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  exports.updateDiscount = async (req, res) => {
    try {
      const data = await updateDiscount(req.params.id,req.body);
      if (data.success) {
        res.status(200).json(data);
      } else {
        res.status(403).json(data);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  exports.deleteDiscount = async (req, res) => {
    try {
      const data = await deleteDiscount(req.params.id);
      if (data.success) {
        res.status(200).json(data);
      } else {
        res.status(403).json(data);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  exports.getAllDiscounts = async (req, res) => {
    try {
      const data = await getAllDiscounts();
      if (data.success) {
        res.status(200).json(data);
      } else {
        res.status(403).json(data);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  
  