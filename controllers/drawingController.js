const { Drawing, Raffle, DrawType } = require('../models');

exports.createDrawing = async (req, res) => {
  try {
    const { raffleId, drawTypeId, drawDate, description } = req.body;

    const newDrawing = await Drawing.create({
      raffleId,
      drawTypeId,
      drawDate,
      description
    });

    return res.status(201).json(newDrawing);
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
    return res.status(200).json(drawings);
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

    return res.status(200).json(drawing);
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

    return res.status(200).json(drawing);
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
