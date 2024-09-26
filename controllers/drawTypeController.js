const { DrawType } = require('../models');
const { formatDatesToColombiaTime } = require('../utils/dateService');

exports.createDrawType = async (req, res) => {
  try {
    const { name } = req.body;

    const newDrawType = await DrawType.create({ name });

    const formattedNewDrawType = formatDatesToColombiaTime(newDrawType);
    return res.status(201).json(formattedNewDrawType);
  } catch (error) {
    return res.status(500).json({ error: 'Error creando el tipo de sorteo', details: error.message });
  }
};

exports.getAllDrawTypes = async (req, res) => {
  try {
    const drawTypes = await DrawType.findAll();
    const formattedDrawTypes = drawTypes.map(drawType => formatDatesToColombiaTime(drawType));
    
    return res.status(200).json(formattedDrawTypes);
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

    const formattedDrawType = formatDatesToColombiaTime(drawType);
    return res.status(200).json(formattedDrawType);
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

    const formattedDrawType = formatDatesToColombiaTime(drawType);
    return res.status(200).json(formattedDrawType);
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