const { Drawing, Raffle, DrawType } = require('../models');
const { formatDatesToColombiaTime } = require('../utils/dateService');

exports.createDrawing = async (req, res) => {
  try {
    const { raffleId, drawTypeId, drawDate, description } = req.body;

    const newDrawing = await Drawing.create({
      raffleId,
      drawTypeId,
      drawDate,
      description
    });

    const formattedDrawing = formatDatesToColombiaTime(newDrawing);
    return res.status(201).json(formattedDrawing);
  } catch (error) {
    return res.status(500).json({ error: 'Error creando el sorteo', details: error.message });
  }
};

exports.getAllDrawings = async (req, res) => {
  try {
    const drawings = await Drawing.findAll({
      include: [
        { model: Raffle, attributes: ['name'] },
        { model: DrawType, attributes: ['name'] }
      ]
    });

    const formattedDrawings = drawings.map(drawing => formatDatesToColombiaTime(drawing));
    return res.status(200).json(formattedDrawings);
  } catch (error) {
    return res.status(500).json({ error: 'Error obteniendo los sorteos', details: error.message });
  }
};

exports.getDrawingById = async (req, res) => {
  try {
    const { id } = req.params;
    const drawing = await Drawing.findByPk(id, {
      include: [
        { model: Raffle, attributes: ['name'] },
        { model: DrawType, attributes: ['name'] }
      ]
    });

    if (!drawing) {
      return res.status(404).json({ error: 'Sorteo no encontrado' });
    }

    const formattedDrawing = formatDatesToColombiaTime(drawing);
    return res.status(200).json(formattedDrawing);
  } catch (error) {
    return res.status(500).json({ error: 'Error obteniendo el sorteo', details: error.message });
  }
};

exports.updateDrawing = async (req, res) => {
  try {
    const { id } = req.params;
    const { raffleId, drawTypeId, drawDate, description } = req.body;

    const drawing = await Drawing.findByPk(id);

    if (!drawing) {
      return res.status(404).json({ error: 'Sorteo no encontrado' });
    }

    drawing.raffleId = raffleId || drawing.raffleId;
    drawing.drawTypeId = drawTypeId || drawing.drawTypeId;
    drawing.drawDate = drawDate || drawing.drawDate;
    drawing.description = description || drawing.description;

    await drawing.save();

    const formattedDrawing = formatDatesToColombiaTime(drawing);
    return res.status(200).json(formattedDrawing);
  } catch (error) {
    return res.status(500).json({ error: 'Error actualizando el sorteo', details: error.message });
  }
};

exports.deleteDrawing = async (req, res) => {
  try {
    const { id } = req.params;
    const drawing = await Drawing.findByPk(id);

    if (!drawing) {
      return res.status(404).json({ error: 'Sorteo no encontrado' });
    }

    await drawing.destroy();
    return res.status(200).json({ message: 'Sorteo eliminado correctamente' });
  } catch (error) {
    return res.status(500).json({ error: 'Error eliminando el sorteo', details: error.message });
  }
};