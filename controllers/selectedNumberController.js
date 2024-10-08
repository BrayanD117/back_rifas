const { SelectedNumber, Transaction, NumberStatus } = require('../models');
const { formatDatesToColombiaTime } = require('../utils/dateService');

exports.createSelectedNumber = async (req, res) => {
  try {
    const { transactionId, number, numberStatusId } = req.body;

    const newSelectedNumber = await SelectedNumber.create({
      transactionId,
      number,
      numberStatusId
    });

    const formattedSelectedNumber = formatDatesToColombiaTime(newSelectedNumber);
    return res.status(201).json(formattedSelectedNumber);
  } catch (error) {
    return res.status(500).json({ error: 'Error creando el número seleccionado', details: error.message });
  }
};

exports.getAllSelectedNumbers = async (req, res) => {
  try {
    const selectedNumbers = await SelectedNumber.findAll({
      include: [
        { model: Transaction, attributes: ['orderNumber'] },
        { model: NumberStatus, attributes: ['name'] }
      ]
    });
    const formattedSelectedNumbers = selectedNumbers.map(selectedNumber => formatDatesToColombiaTime(selectedNumber));
    return res.status(200).json(formattedSelectedNumbers);
  } catch (error) {
    return res.status(500).json({ error: 'Error obteniendo los números seleccionados', details: error.message });
  }
};

exports.getSelectedNumberById = async (req, res) => {
  try {
    const { id } = req.params;
    const selectedNumber = await SelectedNumber.findByPk(id, {
      include: [
        { model: Transaction, attributes: ['orderNumber'] },
        { model: NumberStatus, attributes: ['name'] }
      ]
    });

    if (!selectedNumber) {
      return res.status(404).json({ error: 'Número seleccionado no encontrado' });
    }

    const formattedSelectedNumber = formatDatesToColombiaTime(selectedNumber);
    return res.status(200).json(formattedSelectedNumber);
  } catch (error) {
    return res.status(500).json({ error: 'Error obteniendo el número seleccionado', details: error.message });
  }
};

exports.updateSelectedNumber = async (req, res) => {
  try {
    const { id } = req.params;
    const { transactionId, number, numberStatusId } = req.body;

    const selectedNumber = await SelectedNumber.findByPk(id);

    if (!selectedNumber) {
      return res.status(404).json({ error: 'Número seleccionado no encontrado' });
    }

    selectedNumber.transactionId = transactionId || selectedNumber.transactionId;
    selectedNumber.number = number || selectedNumber.number;
    selectedNumber.numberStatusId = numberStatusId || selectedNumber.numberStatusId;

    await selectedNumber.save();

    const formattedSelectedNumber = formatDatesToColombiaTime(selectedNumber);
    return res.status(200).json(formattedSelectedNumber);
  } catch (error) {
    return res.status(500).json({ error: 'Error actualizando el número seleccionado', details: error.message });
  }
};

exports.deleteSelectedNumber = async (req, res) => {
  try {
    const { id } = req.params;
    const selectedNumber = await SelectedNumber.findByPk(id);

    if (!selectedNumber) {
      return res.status(404).json({ error: 'Número seleccionado no encontrado' });
    }

    await selectedNumber.destroy();
    return res.status(200).json({ message: 'Número seleccionado eliminado correctamente' });
  } catch (error) {
    return res.status(500).json({ error: 'Error eliminando el número seleccionado', details: error.message });
  }
};