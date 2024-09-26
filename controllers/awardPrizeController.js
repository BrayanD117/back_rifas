const { AwardPrize, Customer, Prize } = require('../models');
const { formatDatesToColombiaTime } = require('../utils/dateService');

exports.createAwardPrize = async (req, res) => {
  try {
    const { customerId, prizeId, deliveryDate } = req.body;

    const newAwardPrize = await AwardPrize.create({
      customerId,
      prizeId,
      deliveryDate
    });

    const formattedAwardPrize = formatDatesToColombiaTime(newAwardPrize);
    return res.status(201).json(formattedAwardPrize);
  } catch (error) {
    return res.status(500).json({ error: 'Error creando la entrega de premio', details: error.message });
  }
};

exports.getAllAwardPrizes = async (req, res) => {
  try {
    const awardPrizes = await AwardPrize.findAll({
      include: [
        { model: Customer, attributes: ['name', 'documentNumber'] },
        { model: Prize, attributes: ['name'] }
      ]
    });
    const formattedAwardPrizes = awardPrizes.map(awardPrize => formatDatesToColombiaTime(awardPrize));
    return res.status(200).json(formattedAwardPrizes);
  } catch (error) {
    return res.status(500).json({ error: 'Error obteniendo las entregas de premios', details: error.message });
  }
};

exports.getAwardPrizeById = async (req, res) => {
  try {
    const { id } = req.params;
    const awardPrize = await AwardPrize.findByPk(id, {
      include: [
        { model: Customer, attributes: ['name', 'documentNumber'] },
        { model: Prize, attributes: ['name'] }
      ]
    });

    if (!awardPrize) {
      return res.status(404).json({ error: 'Entrega de premio no encontrada' });
    }

    const formattedAwardPrize = formatDatesToColombiaTime(awardPrize);
    return res.status(200).json(formattedAwardPrize);
  } catch (error) {
    return res.status(500).json({ error: 'Error obteniendo la entrega de premio', details: error.message });
  }
};

exports.updateAwardPrize = async (req, res) => {
  try {
    const { id } = req.params;
    const { customerId, prizeId, deliveryDate } = req.body;

    const awardPrize = await AwardPrize.findByPk(id);

    if (!awardPrize) {
      return res.status(404).json({ error: 'Entrega de premio no encontrada' });
    }

    awardPrize.customerId = customerId || awardPrize.customerId;
    awardPrize.prizeId = prizeId || awardPrize.prizeId;
    awardPrize.deliveryDate = deliveryDate || awardPrize.deliveryDate;

    await awardPrize.save();

    const formattedAwardPrize = formatDatesToColombiaTime(awardPrize);
    return res.status(200).json(formattedAwardPrize);
  } catch (error) {
    return res.status(500).json({ error: 'Error actualizando la entrega de premio', details: error.message });
  }
};

exports.deleteAwardPrize = async (req, res) => {
  try {
    const { id } = req.params;
    const awardPrize = await AwardPrize.findByPk(id);

    if (!awardPrize) {
      return res.status(404).json({ error: 'Entrega de premio no encontrada' });
    }

    await awardPrize.destroy();
    return res.status(200).json({ message: 'Entrega de premio eliminada correctamente' });
  } catch (error) {
    return res.status(500).json({ error: 'Error eliminando la entrega de premio', details: error.message });
  }
};