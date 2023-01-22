const PublicProduct = require('../models/publicProducts.schema');

const getPublicProducts = async (req, res) => {
  try {
    const publicProducts = await PublicProduct.find({});
    res.json(publicProducts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getPublicProducts,
};
