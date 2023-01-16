const router = require('express').Router();

const {
  getPublicProducts,
} = require('../controllers/publicProducts.controller');

router.get('/', getPublicProducts);

module.exports = router;
