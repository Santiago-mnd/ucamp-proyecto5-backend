const router = require('express').Router();
const { check } = require('express-validator');

require('dotenv').config();

const {
  signup,
  login,
  logWithToken,
  logout,
} = require('../controllers/auth.controller');

router.post(
  '/signup',
  [
    check('username', 'Username is required')
      .not()
      .isEmpty(),
    check('email', 'El email no es válido.').isEmail(),
    check(
      'password',
      'La constraseña debe tener mínimo 6 caracteres.'
    ).isLength({
      min: 6,
    }),
  ],
  signup
);
router.post('/login', login);
router.post('/token', logWithToken);
router.delete('/logout', logout);

module.exports = router;
