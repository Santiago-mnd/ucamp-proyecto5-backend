const Gasto = require('../models/gasto.schema');

const getGastos = async (req, res) => {
  try {
    console.log('Obteniendo gastos');

    const gastos = await Gasto.find({});
    res
      .status(200)
      .json({ message: 'Gastos obtenidos', gastos });
  } catch (error) {
    console.log(error);
  }
};

const createGasto = async (req, res) => {
  const { descripcion, tipo, monto } = req.body;
  try {
    const gasto = await Gasto.create({
      descripcion,
      tipo,
      monto,
    });

    res
      .status(201)
      .json({ message: 'Gasto creado', gasto });
  } catch (error) {
    console.log(error);
  }
};

const updateGasto = async (req, res) => {
  try {
    console.log('Actualizando gasto');
    const gasto = await Gasto.findByIdAndUpdate(
      req.params.id,
      req.body
    );
    res
      .status(200)
      .json({ message: 'Gasto actualizado', gasto });
  } catch (error) {
    console.log(error);
  }
};

const deleteGasto = async (req, res) => {
  try {
    console.log('Borrando gasto');
    const gasto = await Gasto.findByIdAndRemove({
      _id: req.params.id,
    });
    res
      .status(200)
      .json({ message: 'Gasto eliminado', gasto });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getGastos,
  createGasto,
  updateGasto,
  deleteGasto,
};
