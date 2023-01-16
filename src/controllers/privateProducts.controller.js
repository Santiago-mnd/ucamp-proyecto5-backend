const PrivateProduct = require('../models/privateProducts.schema');

const getPrivateProducts = async (req, res) => {
  try {
    const privateProducts = await PrivateProduct.find({});
    res.json(privateProducts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getPrivateProducts,
};
