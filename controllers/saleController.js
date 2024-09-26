const { Sale, Transaction } = require('../models');
const { formatDatesToColombiaTime } = require('../utils/dateService');

exports.createSale = async (req, res) => {
  try {
    const { transactionId, invoiceNumber, baseValue, ivaValue, totalValue } = req.body;

    const newSale = await Sale.create({
      transactionId,
      invoiceNumber,
      baseValue,
      ivaValue,
      totalValue
    });

    const formattedSale = formatDatesToColombiaTime(newSale);
    return res.status(201).json(formattedSale);
  } catch (error) {
    return res.status(500).json({ error: 'Error creando la venta', details: error.message });
  }
};

exports.getAllSales = async (req, res) => {
  try {
    const sales = await Sale.findAll({
      include: [
        { model: Transaction, attributes: ['orderNumber'] }
      ]
    });
    const formattedSales = sales.map(sale => formatDatesToColombiaTime(sale));
    return res.status(200).json(formattedSales);
  } catch (error) {
    return res.status(500).json({ error: 'Error obteniendo las ventas', details: error.message });
  }
};

exports.getSaleById = async (req, res) => {
  try {
    const { id } = req.params;
    const sale = await Sale.findByPk(id, {
      include: [
        { model: Transaction, attributes: ['orderNumber'] }
      ]
    });

    if (!sale) {
      return res.status(404).json({ error: 'Venta no encontrada' });
    }

    const formattedSale = formatDatesToColombiaTime(sale);
    return res.status(200).json(formattedSale);
  } catch (error) {
    return res.status(500).json({ error: 'Error obteniendo la venta', details: error.message });
  }
};

exports.updateSale = async (req, res) => {
  try {
    const { id } = req.params;
    const { transactionId, invoiceNumber, baseValue, ivaValue, totalValue } = req.body;

    const sale = await Sale.findByPk(id);

    if (!sale) {
      return res.status(404).json({ error: 'Venta no encontrada' });
    }

    sale.transactionId = transactionId || sale.transactionId;
    sale.invoiceNumber = invoiceNumber || sale.invoiceNumber;
    sale.baseValue = baseValue || sale.baseValue;
    sale.ivaValue = ivaValue || sale.ivaValue;
    sale.totalValue = totalValue || sale.totalValue;

    await sale.save();

    const formattedSale = formatDatesToColombiaTime(sale);
    return res.status(200).json(formattedSale);
  } catch (error) {
    return res.status(500).json({ error: 'Error actualizando la venta', details: error.message });
  }
};

exports.deleteSale = async (req, res) => {
  try {
    const { id } = req.params;
    const sale = await Sale.findByPk(id);

    if (!sale) {
      return res.status(404).json({ error: 'Venta no encontrada' });
    }

    await sale.destroy();
    return res.status(200).json({ message: 'Venta eliminada correctamente' });
  } catch (error) {
    return res.status(500).json({ error: 'Error eliminando la venta', details: error.message });
  }
};