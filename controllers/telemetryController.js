const { Telemetry, User, Raffle, EventType } = require('../models');
const { formatDatesToColombiaTime } = require('../utils/dateService');

exports.createTelemetry = async (req, res) => {
  try {
    const { userId, raffleId, eventTypeId, ubication } = req.body;

    const newTelemetry = await Telemetry.create({
      userId,
      raffleId,
      eventTypeId,
      ubication
    });

    const formattedTelemetry = formatDatesToColombiaTime(newTelemetry);
    return res.status(201).json(formattedTelemetry);
  } catch (error) {
    return res.status(500).json({ error: 'Error creando la telemetría', details: error.message });
  }
};

exports.getAllTelemetries = async (req, res) => {
  try {
    const telemetries = await Telemetry.findAll({
      include: [
        { model: User, attributes: ['email'] },
        { model: Raffle, attributes: ['name'] },
        { model: EventType, attributes: ['name'] }
      ]
    });

    const formattedTelemetries = telemetries.map(telemetry => formatDatesToColombiaTime(telemetry));
    return res.status(200).json(formattedTelemetries);
  } catch (error) {
    return res.status(500).json({ error: 'Error obteniendo las telemetrías', details: error.message });
  }
};

exports.getTelemetryById = async (req, res) => {
  try {
    const { id } = req.params;
    const telemetry = await Telemetry.findByPk(id, {
      include: [
        { model: User, attributes: ['email'] },
        { model: Raffle, attributes: ['name'] },
        { model: EventType, attributes: ['name'] }
      ]
    });

    if (!telemetry) {
      return res.status(404).json({ error: 'Telemetría no encontrada' });
    }

    const formattedTelemetry = formatDatesToColombiaTime(telemetry);
    return res.status(200).json(formattedTelemetry);
  } catch (error) {
    return res.status(500).json({ error: 'Error obteniendo la telemetría', details: error.message });
  }
};

exports.updateTelemetry = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId, raffleId, eventTypeId, ubication } = req.body;

    const telemetry = await Telemetry.findByPk(id);

    if (!telemetry) {
      return res.status(404).json({ error: 'Telemetría no encontrada' });
    }

    telemetry.userId = userId || telemetry.userId;
    telemetry.raffleId = raffleId || telemetry.raffleId;
    telemetry.eventTypeId = eventTypeId || telemetry.eventTypeId;
    telemetry.ubication = ubication || telemetry.ubication;

    await telemetry.save();

    const formattedTelemetry = formatDatesToColombiaTime(telemetry);
    return res.status(200).json(formattedTelemetry);
  } catch (error) {
    return res.status(500).json({ error: 'Error actualizando la telemetría', details: error.message });
  }
};

exports.deleteTelemetry = async (req, res) => {
  try {
    const { id } = req.params;
    const telemetry = await Telemetry.findByPk(id);

    if (!telemetry) {
      return res.status(404).json({ error: 'Telemetría no encontrada' });
    }

    await telemetry.destroy();
    return res.status(200).json({ message: 'Telemetría eliminada correctamente' });
  } catch (error) {
    return res.status(500).json({ error: 'Error eliminando la telemetría', details: error.message });
  }
};