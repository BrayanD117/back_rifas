const { Raffle, Coverage, Authority } = require('../models');
const { formatRaffleDatesToColombiaTime } = require('../utils/dateService');
const dayjs = require('dayjs');
const timezone = require('dayjs/plugin/timezone');
const utc = require('dayjs/plugin/utc');
const { Op } = require('sequelize');

dayjs.extend(utc);
dayjs.extend(timezone);

exports.createRaffle = async (req, res) => {
  try {
    const { coverageId, authorityId, name, description, prize, baseValue, ivaValue, totalValue, lottery, numberDigits, numberSeries, bearerCheck, gameDate, closeDate, expirationDate, imageUrl, active, dateTimePublication } = req.body;
    
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
      expirationDate,
      imageUrl,
      active,
      dateTimePublication
    });

    const formattedRaffle = formatRaffleDatesToColombiaTime(newRaffle);
    return res.status(201).json(formattedRaffle);
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
    const formattedRaffles = raffles.map(raffle => formatRaffleDatesToColombiaTime(raffle));
    return res.status(200).json(formattedRaffles);
  } catch (error) {
    return res.status(500).json({ error: 'Error obteniendo las rifas', details: error.message });
  }
};

exports.getActiveRaffles = async (req, res) => {
  try {
    const currentDateColombia = dayjs().tz('America/Bogota').format('YYYY-MM-DD HH:mm:ss');

    const raffles = await Raffle.findAll({
      where: {
        active: true,
        dateTimePublication: {
          [Op.lte]: currentDateColombia,
        },
      },
      include: [
        { model: Coverage, attributes: ['name'] },
        { model: Authority, attributes: ['name'] }
      ]
    });
    const formattedRaffles = raffles.map(raffle => formatRaffleDatesToColombiaTime(raffle));
    return res.status(200).json(formattedRaffles);
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

    const formattedRaffle = formatRaffleDatesToColombiaTime(raffle);
    return res.status(200).json(formattedRaffle);
  } catch (error) {
    return res.status(500).json({ error: 'Error obteniendo la rifa', details: error.message });
  }
};

exports.updateRaffle = async (req, res) => {
  try {
    const { id } = req.params;
    const { coverageId, authorityId, name, description, prize, baseValue, ivaValue, totalValue, lottery, numberDigits, numberSeries, bearerCheck, gameDate, closeDate, expirationDate, imageUrl, active, dateTimePublication } = req.body;

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
    raffle.imageUrl = imageUrl || raffle.imageUrl;
    raffle.active = active || raffle.active;
    raffle.dateTimePublication = dateTimePublication || raffle.dateTimePublication;

    await raffle.save();

    const formattedRaffle = formatRaffleDatesToColombiaTime(raffle);
    return res.status(200).json(formattedRaffle);
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