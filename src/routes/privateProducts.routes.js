const router = require('express').Router();
const { authToken } = require('../middlewares/authToken');

const {
  getPrivateProducts,
} = require('../controllers/privateProducts.controller');

router.get('/', authToken, getPrivateProducts);

module.exports = router;
