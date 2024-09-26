const { TransactionStatus } = require('../models');
const { formatDatesToColombiaTime } = require('../utils/dateService');

exports.createTransactionStatus = async (req, res) => {
  try {
    const { name } = req.body;

    const newTransactionStatus = await TransactionStatus.create({ name });

    const formattedTransactionStatus = formatDatesToColombiaTime(newTransactionStatus);
    return res.status(201).json(formattedTransactionStatus);
  } catch (error) {
    return res.status(500).json({ error: 'Error creando el estado de la transacción', details: error.message });
  }
};

exports.getAllTransactionStatuses = async (req, res) => {
  try {
    const transactionStatuses = await TransactionStatus.findAll();
    const formattedTransactionStatuses = transactionStatuses.map(transactionStatus => formatDatesToColombiaTime(transactionStatus));
    return res.status(200).json(formattedTransactionStatuses);
  } catch (error) {
    return res.status(500).json({ error: 'Error obteniendo los estados de transacción', details: error.message });
  }
};

exports.getTransactionStatusById = async (req, res) => {
  try {
    const { id } = req.params;
    const transactionStatus = await TransactionStatus.findByPk(id);

    if (!transactionStatus) {
      return res.status(404).json({ error: 'Estado de transacción no encontrado' });
    }

    const formattedTransactionStatus = formatDatesToColombiaTime(transactionStatus);
    return res.status(200).json(formattedTransactionStatus);
  } catch (error) {
    return res.status(500).json({ error: 'Error obteniendo el estado de transacción', details: error.message });
  }
};

exports.updateTransactionStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const transactionStatus = await TransactionStatus.findByPk(id);

    if (!transactionStatus) {
      return res.status(404).json({ error: 'Estado de transacción no encontrado' });
    }

    transactionStatus.name = name || transactionStatus.name;
    await transactionStatus.save();

    const formattedTransactionStatus = formatDatesToColombiaTime(transactionStatus);
    return res.status(200).json(formattedTransactionStatus);
  } catch (error) {
    return res.status(500).json({ error: 'Error actualizando el estado de transacción', details: error.message });
  }
};

exports.deleteTransactionStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const transactionStatus = await TransactionStatus.findByPk(id);

    if (!transactionStatus) {
      return res.status(404).json({ error: 'Estado de transacción no encontrado' });
    }

    await transactionStatus.destroy();
    return res.status(200).json({ message: 'Estado de transacción eliminado correctamente' });
  } catch (error) {
    return res.status(500).json({ error: 'Error eliminando el estado de transacción', details: error.message });
  }
};