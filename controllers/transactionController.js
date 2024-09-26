const { Transaction, Customer, Raffle, TransactionStatus } = require('../models');
const { formatDatesToColombiaTime } = require('../utils/dateService');

exports.createTransaction = async (req, res) => {
  try {
    const { customerId, raffleId, orderNumber, transactionStatusId, purchasePlace, reservationDate, purchaseDate } = req.body;

    const newTransaction = await Transaction.create({
      customerId,
      raffleId,
      orderNumber,
      transactionStatusId,
      purchasePlace,
      reservationDate,
      purchaseDate
    });

    const formattedTransaction = formatDatesToColombiaTime(newTransaction);
    return res.status(201).json(formattedTransaction);
  } catch (error) {
    return res.status(500).json({ error: 'Error creando la transacción', details: error.message });
  }
};

exports.getAllTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.findAll({
      include: [
        { model: Customer, attributes: ['name', 'documentNumber'] },
        { model: Raffle, attributes: ['name'] },
        { model: TransactionStatus, attributes: ['name'] }
      ]
    });

    const formattedTransactions = transactions.map(transaction => formatDatesToColombiaTime(transaction));
    return res.status(200).json(formattedTransactions);
  } catch (error) {
    return res.status(500).json({ error: 'Error obteniendo las transacciones', details: error.message });
  }
};

exports.getTransactionById = async (req, res) => {
  try {
    const { id } = req.params;
    const transaction = await Transaction.findByPk(id, {
      include: [
        { model: Customer, attributes: ['name', 'documentNumber'] },
        { model: Raffle, attributes: ['name'] },
        { model: TransactionStatus, attributes: ['name'] }
      ]
    });

    if (!transaction) {
      return res.status(404).json({ error: 'Transacción no encontrada' });
    }

    const formattedTransaction = formatDatesToColombiaTime(transaction);
    return res.status(200).json(formattedTransaction);
  } catch (error) {
    return res.status(500).json({ error: 'Error obteniendo la transacción', details: error.message });
  }
};

exports.updateTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const { customerId, raffleId, orderNumber, transactionStatusId, purchasePlace, reservationDate, purchaseDate } = req.body;

    const transaction = await Transaction.findByPk(id);

    if (!transaction) {
      return res.status(404).json({ error: 'Transacción no encontrada' });
    }

    transaction.customerId = customerId || transaction.customerId;
    transaction.raffleId = raffleId || transaction.raffleId;
    transaction.orderNumber = orderNumber || transaction.orderNumber;
    transaction.transactionStatusId = transactionStatusId || transaction.transactionStatusId;
    transaction.purchasePlace = purchasePlace || transaction.purchasePlace;
    transaction.reservationDate = reservationDate || transaction.reservationDate;
    transaction.purchaseDate = purchaseDate || transaction.purchaseDate;

    await transaction.save();

    const formattedTransaction = formatDatesToColombiaTime(transaction);
    return res.status(200).json(formattedTransaction);
  } catch (error) {
    return res.status(500).json({ error: 'Error actualizando la transacción', details: error.message });
  }
};

exports.deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const transaction = await Transaction.findByPk(id);

    if (!transaction) {
      return res.status(404).json({ error: 'Transacción no encontrada' });
    }

    await transaction.destroy();
    return res.status(200).json({ message: 'Transacción eliminada correctamente' });
  } catch (error) {
    return res.status(500).json({ error: 'Error eliminando la transacción', details: error.message });
  }
};