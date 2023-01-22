const router = require('express').Router();
const { authToken } = require('../middlewares/authToken');

const {
  getPrivateProducts,
  getPrivateProduct,
} = require('../controllers/privateProducts.controller');

router.get('/', authToken, getPrivateProducts);
router.get('/:price', getPrivateProduct);

module.exports = router;
