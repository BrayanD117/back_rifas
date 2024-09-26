const { Prize, Drawing } = require('../models');
const { formatDatesToColombiaTime } = require('../utils/dateService');

exports.createPrize = async (req, res) => {
  try {
    const { drawingId, name, description } = req.body;

    const newPrize = await Prize.create({
      drawingId,
      name,
      description
    });

    const formattedPrize = formatDatesToColombiaTime(newPrize);
    return res.status(201).json(formattedPrize);
  } catch (error) {
    return res.status(500).json({ error: 'Error creando el premio', details: error.message });
  }
};

exports.getAllPrizes = async (req, res) => {
  try {
    const prizes = await Prize.findAll({
      include: [
        { model: Drawing, attributes: ['description'] }
      ]
    });

    const formattedPrizes = prizes.map(prize => formatDatesToColombiaTime(prize));
    return res.status(200).json(formattedPrizes);
  } catch (error) {
    return res.status(500).json({ error: 'Error obteniendo los premios', details: error.message });
  }
};

exports.getPrizeById = async (req, res) => {
  try {
    const { id } = req.params;
    const prize = await Prize.findByPk(id, {
      include: [
        { model: Drawing, attributes: ['description'] }
      ]
    });

    if (!prize) {
      return res.status(404).json({ error: 'Premio no encontrado' });
    }

    const formattedPrize = formatDatesToColombiaTime(prize);
    return res.status(200).json(formattedPrize);
  } catch (error) {
    return res.status(500).json({ error: 'Error obteniendo el premio', details: error.message });
  }
};

exports.updatePrize = async (req, res) => {
  try {
    const { id } = req.params;
    const { drawingId, name, description } = req.body;

    const prize = await Prize.findByPk(id);

    if (!prize) {
      return res.status(404).json({ error: 'Premio no encontrado' });
    }

    prize.drawingId = drawingId || prize.drawingId;
    prize.name = name || prize.name;
    prize.description = description || prize.description;

    await prize.save();

    const formattedPrize = formatDatesToColombiaTime(prize);
    return res.status(200).json(formattedPrize);
  } catch (error) {
    return res.status(500).json({ error: 'Error actualizando el premio', details: error.message });
  }
};

exports.deletePrize = async (req, res) => {
  try {
    const { id } = req.params;
    const prize = await Prize.findByPk(id);

    if (!prize) {
      return res.status(404).json({ error: 'Premio no encontrado' });
    }

    await prize.destroy();
    return res.status(200).json({ message: 'Premio eliminado correctamente' });
  } catch (error) {
    return res.status(500).json({ error: 'Error eliminando el premio', details: error.message });
  }
};