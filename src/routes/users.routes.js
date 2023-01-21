const { Router } = require('express');
const router = Router();

const {
  getUsers,
  createUser,
  loginUser,
  getSingleUser,
  getSingleUserById,
} = require('../controllers/users.controller');

router.get('/', getUsers);
router.post('/create', createUser);
router.post('/auth', loginUser);
router.get('/single-user/:email', getSingleUser);
router.get('/user-id/:id', getSingleUserById);

module.exports = router;
