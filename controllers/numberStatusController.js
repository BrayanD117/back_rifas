const { NumberStatus } = require('../models');

exports.createNumberStatus = async (req, res) => {
  try {
    const { name } = req.body;

    const newNumberStatus = await NumberStatus.create({ name });

    return res.status(201).json(newNumberStatus);
  } catch (error) {
    return res.status(500).json({ error: 'Error creando el estado del número', details: error.message });
  }
};

exports.getAllNumberStatuses = async (req, res) => {
  try {
    const numberStatuses = await NumberStatus.findAll();
    return res.status(200).json(numberStatuses);
  } catch (error) {
    return res.status(500).json({ error: 'Error obteniendo los estados de números', details: error.message });
  }
};

exports.getNumberStatusById = async (req, res) => {
  try {
    const { id } = req.params;
    const numberStatus = await NumberStatus.findByPk(id);

    if (!numberStatus) {
      return res.status(404).json({ error: 'Estado de número no encontrado' });
    }

    return res.status(200).json(numberStatus);
  } catch (error) {
    return res.status(500).json({ error: 'Error obteniendo el estado del número', details: error.message });
  }
};

exports.updateNumberStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const numberStatus = await NumberStatus.findByPk(id);

    if (!numberStatus) {
      return res.status(404).json({ error: 'Estado de número no encontrado' });
    }

    numberStatus.name = name || numberStatus.name;
    await numberStatus.save();

    return res.status(200).json(numberStatus);
  } catch (error) {
    return res.status(500).json({ error: 'Error actualizando el estado del número', details: error.message });
  }
};

exports.deleteNumberStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const numberStatus = await NumberStatus.findByPk(id);

    if (!numberStatus) {
      return res.status(404).json({ error: 'Estado de número no encontrado' });
    }

    await numberStatus.destroy();
    return res.status(200).json({ message: 'Estado de número eliminado correctamente' });
  } catch (error) {
    return res.status(500).json({ error: 'Error eliminando el estado del número', details: error.message });
  }
};
