const { Router } = require('express');
const router = Router();

const {
  getUsers,
  createUser,
  loginUser,
} = require('../controllers/users.controller');

router.get('/', getUsers);
router.post('/create', createUser);
router.post('/login', loginUser);

module.exports = router;
