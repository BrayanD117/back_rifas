const { Raffle, Coverage, Authority } = require('../models');
const { formatRaffleDatesToColombiaTime } = require('../utils/dateService');
const dayjs = require('dayjs');
const timezone = require('dayjs/plugin/timezone');
const utc = require('dayjs/plugin/utc');
const { Op } = require('sequelize');
const fs = require('fs');
const path = require('path');
const uploadController = require('./uploadController');

dayjs.extend(utc);
dayjs.extend(timezone);

exports.createRaffle = async (req, res) => {
  try {
    const {
      coverageId,
      authorityId,
      authorizationResolution,
      departmentId,
      cityId,
      categoryId,
      name,
      slogan,
      description,
      prize,
      prizeCommercialValuation,
      prizeSpecifications,
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
      active,
      dateTimePublication,
      dateTimeSale,
      imagesUrls,
      managerName,
      managerContact,
      managerAddress,
    } = req.body;

    const sanitizedRaffleName = name.replace(/\s+/g, '_');

    if (req.files && req.files.length > 0) {
      req.body.raffleName = sanitizedRaffleName;
      await uploadController.handleFileUpload(req, res);
    }

    const newRaffle = await Raffle.create({
      coverageId,
      authorityId,
      authorizationResolution,
      departmentId,
      cityId,
      categoryId,
      name,
      slogan,
      description,
      prize,
      prizeCommercialValuation,
      prizeSpecifications,
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
      active,
      dateTimePublication,
      dateTimeSale,
      imagesUrls,
      managerName,
      managerContact,
      managerAddress,
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
    const { coverageId, authorityId, authorizationResolution, departmentId, cityId, categoryId, name, slogan, description, prize, prizeCommercialValuation, prizeSpecifications, baseValue, ivaValue, totalValue, lottery, numberDigits, numberSeries, bearerCheck, gameDate, closeDate, expirationDate, active, dateTimePublication, dateTimeSale, imagesUrls, managerName, managerContact, managerAddress } = req.body;

    const raffle = await Raffle.findByPk(id);

    if (!raffle) {
      return res.status(404).json({ error: 'Rifa no encontrada' });
    }

    const sanitizedRaffleName = name.replace(/\s+/g, '_');

    if (req.files && req.files.length > 0) {
      req.body.raffleName = sanitizedRaffleName;
      uploadController.handleFileUpload(req, res);
    }

    raffle.coverageId = coverageId || raffle.coverageId;
    raffle.authorityId = authorityId || raffle.authorityId;
    raffle.authorizationResolution = authorizationResolution || raffle.authorizationResolution;
    raffle.departmentId = departmentId || raffle.departmentId;
    raffle.cityId = cityId || raffle.cityId;
    raffle.categoryId = categoryId || raffle.categoryId;
    raffle.name = name || raffle.name;
    raffle.slogan = slogan || raffle.slogan;
    raffle.description = description || raffle.description;
    raffle.prize = prize || raffle.prize;
    raffle.prizeCommercialValuation = prizeCommercialValuation || raffle.prizeCommercialValuation;
    raffle.prizeSpecifications = prizeSpecifications || raffle.prizeSpecifications;
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
    raffle.active = active || raffle.active;
    raffle.dateTimePublication = dateTimePublication || raffle.dateTimePublication;
    raffle.dateTimeSale = dateTimeSale || raffle.dateTimeSale;
    raffle.imagesUrls = imagesUrls || raffle.imagesUrls;
    raffle.managerName = managerName || raffle.managerName;
    raffle.managerContact = managerContact || raffle.managerContact;
    raffle.managerAddress = managerAddress || raffle.managerAddress;

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

    const sanitizedRaffleName = raffle.name.replace(/\s+/g, '_');
    const uploadDir = path.join(__dirname, '..', 'uploads', 'raffles', sanitizedRaffleName);

    if (fs.existsSync(uploadDir)) {
      fs.rmSync(uploadDir, { recursive: true, force: true });
      console.log(`Carpeta ${uploadDir} eliminada correctamente.`);
    }

    await raffle.destroy();
    return res.status(200).json({ message: 'Rifa eliminada correctamente junto con su carpeta de imágenes' });
  } catch (error) {
    return res.status(500).json({ error: 'Error eliminando la rifa', details: error.message });
  }
};