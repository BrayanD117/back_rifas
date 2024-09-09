const { DrawType } = require('../models');

exports.createDrawType = async (req, res) => {
  try {
    const { name } = req.body;

    const newDrawType = await DrawType.create({ name });

    return res.status(201).json(newDrawType);
  } catch (error) {
    return res.status(500).json({ error: 'Error creando el tipo de sorteo', details: error.message });
  }
};

exports.getAllDrawTypes = async (req, res) => {
  try {
    const drawTypes = await DrawType.findAll();
    return res.status(200).json(drawTypes);
  } catch (error) {
    return res.status(500).json({ error: 'Error obteniendo los tipos de sorteo', details: error.message });
  }
};

exports.getDrawTypeById = async (req, res) => {
  try {
    const { id } = req.params;
    const drawType = await DrawType.findByPk(id);

    if (!drawType) {
      return res.status(404).json({ error: 'Tipo de sorteo no encontrado' });
    }

    return res.status(200).json(drawType);
  } catch (error) {
    return res.status(500).json({ error: 'Error obteniendo el tipo de sorteo', details: error.message });
  }
};

exports.updateDrawType = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const drawType = await DrawType.findByPk(id);

    if (!drawType) {
      return res.status(404).json({ error: 'Tipo de sorteo no encontrado' });
    }

    drawType.name = name || drawType.name;
    await drawType.save();

    return res.status(200).json(drawType);
  } catch (error) {
    return res.status(500).json({ error: 'Error actualizando el tipo de sorteo', details: error.message });
  }
};

exports.deleteDrawType = async (req, res) => {
  try {
    const { id } = req.params;
    const drawType = await DrawType.findByPk(id);

    if (!drawType) {
      return res.status(404).json({ error: 'Tipo de sorteo no encontrado' });
    }

    await drawType.destroy();
    return res.status(200).json({ message: 'Tipo de sorteo eliminado correctamente' });
  } catch (error) {
    return res.status(500).json({ error: 'Error eliminando el tipo de sorteo', details: error.message });
  }
};
