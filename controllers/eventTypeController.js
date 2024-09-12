const { EventType } = require('../models');

exports.createEventType = async (req, res) => {
  try {
    const { name } = req.body;

    const newEventType = await EventType.create({ name });

    return res.status(201).json(newEventType);
  } catch (error) {
    return res.status(500).json({ error: 'Error creando el tipo de evento', details: error.message });
  }
};

exports.getAllEventTypes = async (req, res) => {
  try {
    const eventTypes = await EventType.findAll();
    return res.status(200).json(eventTypes);
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

    return res.status(200).json(eventType);
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

    return res.status(200).json(eventType);
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
