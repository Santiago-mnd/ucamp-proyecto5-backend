const mongoose = require('mongoose');

const tokensSchema = new mongoose.Schema(
  {
    token: { type: String, required: true },
  },
  { timestamps: true }
);

const Token = mongoose.model('token', tokensSchema);
module.exports = Token;
