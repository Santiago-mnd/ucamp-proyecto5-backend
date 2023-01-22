const PrivateProduct = require('../models/privateProducts.schema');

const getPrivateProducts = async (req, res) => {
  try {
    const privateProducts = await PrivateProduct.find({});
    res.json(privateProducts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getPrivateProduct = async (req, res) => {
  const { price } = req.params;
  try {
    const privateProduct = await PrivateProduct.findOne({
      price,
    });
    res.json(privateProduct);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'El producto no existe' });
  }
};

module.exports = {
  getPrivateProducts,
  getPrivateProduct,
};
