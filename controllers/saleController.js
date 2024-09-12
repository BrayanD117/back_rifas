const { Sale, Transaction } = require('../models');

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

    return res.status(201).json(newSale);
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
    return res.status(200).json(sales);
  } catch (error) {
    return res.status(500).json({ error: 'Error obteniendo las ventas', details: error.message });
  }
};

// Obtener Sale por ID
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

    return res.status(200).json(sale);
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

    return res.status(200).json(sale);
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
