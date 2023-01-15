require('dotenv').config();
const mongoose = require('mongoose');
mongoose.set('strictQuery', true);

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_CNN);
    console.log('DB Online');
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  dbConnection,
};
