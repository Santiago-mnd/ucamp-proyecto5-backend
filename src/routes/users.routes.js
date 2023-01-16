const { Router } = require('express');
const router = Router();

const {
  getUsers,
  createUser,
  loginUser,
} = require('../controllers/users.controller');

router.get('/', getUsers);
router.post('/create', createUser);
router.post('/auth', loginUser);

module.exports = router;
