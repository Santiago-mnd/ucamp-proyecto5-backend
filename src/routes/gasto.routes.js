const { Router } = require('express');
const {
  getGastos,
  createGasto,
  updateGasto,
  deleteGasto,
} = require('../controllers/gasto.controller');
const router = Router();

router.get('/', getGastos);
router.post('/', createGasto);
router.put('/:id', updateGasto);
router.delete('/:id', deleteGasto);

module.exports = router;
