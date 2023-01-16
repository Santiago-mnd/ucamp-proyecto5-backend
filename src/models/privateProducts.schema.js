const mongoose = require('mongoose');

const privateProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    image: { type: String, required: true, unique: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
  },
  { timestamps: true }
);

const PrivateProduct = mongoose.model(
  'privateProduct',
  privateProductSchema
);
module.exports = PrivateProduct;
