const { Customer, User } = require('../models');
const { formatDatesToColombiaTime } = require('../utils/dateService');

exports.createCustomer = async (req, res) => {
  try {
    const { userId, name, documentNumber, birthday, phoneNumber, email } = req.body;
    
    const newCustomer = await Customer.create({
      userId,
      name,
      documentNumber,
      birthday,
      phoneNumber,
      email
    });

    const formattedCustomer = formatDatesToColombiaTime(newCustomer);
    return res.status(201).json(formattedCustomer);
  } catch (error) {
    return res.status(500).json({ error: 'Error creando el cliente', details: error.message });
  }
};

exports.getAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.findAll({
      include: [
        { model: User, attributes: ['email'] }
      ]
    });

    const formattedCustomers = customers.map(customer => formatDatesToColombiaTime(customer));
    return res.status(200).json(formattedCustomers);
  } catch (error) {
    return res.status(500).json({ error: 'Error obteniendo los clientes', details: error.message });
  }
};

exports.getCustomerById = async (req, res) => {
  try {
    const { id } = req.params;
    const customer = await Customer.findByPk(id, {
      include: [
        { model: User, attributes: ['email'] }
      ]
    });

    if (!customer) {
      return res.status(404).json({ error: 'Cliente no encontrado' });
    }

    const formattedCustomer = formatDatesToColombiaTime(customer);
    return res.status(200).json(formattedCustomer);
  } catch (error) {
    return res.status(500).json({ error: 'Error obteniendo el cliente', details: error.message });
  }
};

exports.updateCustomer = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId, name, documentNumber, birthday, phoneNumber, email } = req.body;

    const customer = await Customer.findByPk(id);

    if (!customer) {
      return res.status(404).json({ error: 'Cliente no encontrado' });
    }

    customer.userId = userId || customer.userId;
    customer.name = name || customer.name;
    customer.documentNumber = documentNumber || customer.documentNumber;
    customer.birthday = birthday || customer.birthday;
    customer.phoneNumber = phoneNumber || customer.phoneNumber;
    customer.email = email || customer.email;

    await customer.save();

    const formattedCustomer = formatDatesToColombiaTime(customer);
    return res.status(200).json(formattedCustomer);
  } catch (error) {
    return res.status(500).json({ error: 'Error actualizando el cliente', details: error.message });
  }
};

exports.deleteCustomer = async (req, res) => {
  try {
    const { id } = req.params;
    const customer = await Customer.findByPk(id);

    if (!customer) {
      return res.status(404).json({ error: 'Cliente no encontrado' });
    }

    await customer.destroy();
    return res.status(200).json({ message: 'Cliente eliminado correctamente' });
  } catch (error) {
    return res.status(500).json({ error: 'Error eliminando el cliente', details: error.message });
  }
};