const router = require('express').Router();
const { check } = require('express-validator');

require('dotenv').config();

const {
  signup,
  login,
} = require('../controllers/auth.controller');

router.post(
  '/signup',
  [
    check('username', 'Username is required')
      .not()
      .isEmpty(),
    check('email', 'Email is required').isEmail(),
    check('password', 'Password is required').isLength({
      min: 6,
    }),
  ],
  signup
);

router.post('/login', login);

module.exports = router;
