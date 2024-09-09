const { Raffle, Coverage, Authority } = require('../models');

exports.createRaffle = async (req, res) => {
  try {
    const { coverageId, authorityId, name, description, prize, baseValue, ivaValue, totalValue, lottery, numberDigits, numberSeries, bearerCheck, gameDate, closeDate, expirationDate } = req.body;

    const newRaffle = await Raffle.create({
      coverageId,
      authorityId,
      name,
      description,
      prize,
      baseValue,
      ivaValue,
      totalValue,
      lottery,
      numberDigits,
      numberSeries,
      bearerCheck,
      gameDate,
      closeDate,
      expirationDate
    });

    return res.status(201).json(newRaffle);
  } catch (error) {
    return res.status(500).json({ error: 'Error creando la rifa', details: error.message });
  }
};

exports.getAllRaffles = async (req, res) => {
  try {
    const raffles = await Raffle.findAll({
      include: [
        { model: Coverage, attributes: ['name'] },
        { model: Authority, attributes: ['name'] }
      ]
    });
    return res.status(200).json(raffles);
  } catch (error) {
    return res.status(500).json({ error: 'Error obteniendo las rifas', details: error.message });
  }
};

exports.getRaffleById = async (req, res) => {
  try {
    const { id } = req.params;
    const raffle = await Raffle.findByPk(id, {
      include: [
        { model: Coverage, attributes: ['name'] },
        { model: Authority, attributes: ['name'] }
      ]
    });

    if (!raffle) {
      return res.status(404).json({ error: 'Rifa no encontrada' });
    }

    return res.status(200).json(raffle);
  } catch (error) {
    return res.status(500).json({ error: 'Error obteniendo la rifa', details: error.message });
  }
};

exports.updateRaffle = async (req, res) => {
  try {
    const { id } = req.params;
    const { coverageId, authorityId, name, description, prize, baseValue, ivaValue, totalValue, lottery, numberDigits, numberSeries, bearerCheck, gameDate, closeDate, expirationDate } = req.body;

    const raffle = await Raffle.findByPk(id);

    if (!raffle) {
      return res.status(404).json({ error: 'Rifa no encontrada' });
    }

    raffle.coverageId = coverageId || raffle.coverageId;
    raffle.authorityId = authorityId || raffle.authorityId;
    raffle.name = name || raffle.name;
    raffle.description = description || raffle.description;
    raffle.prize = prize || raffle.prize;
    raffle.baseValue = baseValue || raffle.baseValue;
    raffle.ivaValue = ivaValue || raffle.ivaValue;
    raffle.totalValue = totalValue || raffle.totalValue;
    raffle.lottery = lottery || raffle.lottery;
    raffle.numberDigits = numberDigits || raffle.numberDigits;
    raffle.numberSeries = numberSeries || raffle.numberSeries;
    raffle.bearerCheck = bearerCheck || raffle.bearerCheck;
    raffle.gameDate = gameDate || raffle.gameDate;
    raffle.closeDate = closeDate || raffle.closeDate;
    raffle.expirationDate = expirationDate || raffle.expirationDate;

    await raffle.save();

    return res.status(200).json(raffle);
  } catch (error) {
    return res.status(500).json({ error: 'Error actualizando la rifa', details: error.message });
  }
};

exports.deleteRaffle = async (req, res) => {
  try {
    const { id } = req.params;
    const raffle = await Raffle.findByPk(id);

    if (!raffle) {
      return res.status(404).json({ error: 'Rifa no encontrada' });
    }

    await raffle.destroy();
    return res.status(200).json({ message: 'Rifa eliminada correctamente' });
  } catch (error) {
    return res.status(500).json({ error: 'Error eliminando la rifa', details: error.message });
  }
};
