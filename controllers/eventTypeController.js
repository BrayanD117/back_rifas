const { EventType } = require('../models');
const { formatDatesToColombiaTime } = require('../utils/dateService');

exports.createEventType = async (req, res) => {
  try {
    const { name } = req.body;

    const newEventType = await EventType.create({ name });

    const formattedEventType = formatDatesToColombiaTime(newEventType);
    return res.status(201).json(formattedEventType);
  } catch (error) {
    return res.status(500).json({ error: 'Error creando el tipo de evento', details: error.message });
  }
};

exports.getAllEventTypes = async (req, res) => {
  try {
    const eventTypes = await EventType.findAll();
    const formattedEventTypes = eventTypes.map(eventType => formatDatesToColombiaTime(eventType));
    return res.status(200).json(formattedEventTypes);
  } catch (error) {
    return res.status(500).json({ error: 'Error obteniendo los tipos de eventos', details: error.message });
  }
};

exports.getEventTypeById = async (req, res) => {
  try {
    const { id } = req.params;
    const eventType = await EventType.findByPk(id);

    if (!eventType) {
      return res.status(404).json({ error: 'Tipo de evento no encontrado' });
    }

    const formattedEventType = formatDatesToColombiaTime(eventType);
    return res.status(200).json(formattedEventType);
  } catch (error) {
    return res.status(500).json({ error: 'Error obteniendo el tipo de evento', details: error.message });
  }
};

exports.updateEventType = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const eventType = await EventType.findByPk(id);

    if (!eventType) {
      return res.status(404).json({ error: 'Tipo de evento no encontrado' });
    }

    eventType.name = name || eventType.name;
    await eventType.save();

    const formattedEventType = formatDatesToColombiaTime(eventType);
    return res.status(200).json(formattedEventType);
  } catch (error) {
    return res.status(500).json({ error: 'Error actualizando el tipo de evento', details: error.message });
  }
};

exports.deleteEventType = async (req, res) => {
  try {
    const { id } = req.params;
    const eventType = await EventType.findByPk(id);

    if (!eventType) {
      return res.status(404).json({ error: 'Tipo de evento no encontrado' });
    }

    await eventType.destroy();
    return res.status(200).json({ message: 'Tipo de evento eliminado correctamente' });
  } catch (error) {
    return res.status(500).json({ error: 'Error eliminando el tipo de evento', details: error.message });
  }
};