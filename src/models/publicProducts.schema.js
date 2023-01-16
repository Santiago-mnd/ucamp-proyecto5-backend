const mongoose = require('mongoose');

const publicProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    image: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

const PublicProduct = mongoose.model(
  'publicProduct',
  publicProductSchema
);
module.exports = PublicProduct;
