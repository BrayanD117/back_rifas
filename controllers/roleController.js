const { Role } = require('../models');

exports.createRole = async (req, res) => {
  try {
    const { name } = req.body;
    const newRole = await Role.create({ name });
    return res.status(201).json(newRole);
  } catch (error) {
    return res.status(500).json({ error: 'Error creando el rol', details: error.message });
  }
};

exports.getAllRoles = async (req, res) => {
  try {
    const roles = await Role.findAll();
    return res.status(200).json(roles);
  } catch (error) {
    return res.status(500).json({ error: 'Error obteniendo los roles', details: error.message });
  }
};

exports.getRoleById = async (req, res) => {
  try {
    const { id } = req.params;
    const role = await Role.findByPk(id);

    if (!role) {
      return res.status(404).json({ error: 'Rol no encontrado' });
    }

    return res.status(200).json(role);
  } catch (error) {
    return res.status(500).json({ error: 'Error obteniendo el rol', details: error.message });
  }
};

exports.updateRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const role = await Role.findByPk(id);

    if (!role) {
      return res.status(404).json({ error: 'Rol no encontrado' });
    }

    role.name = name;
    await role.save();

    return res.status(200).json(role);
  } catch (error) {
    return res.status(500).json({ error: 'Error actualizando el rol', details: error.message });
  }
};

exports.deleteRole = async (req, res) => {
  try {
    const { id } = req.params;
    const role = await Role.findByPk(id);

    if (!role) {
      return res.status(404).json({ error: 'Rol no encontrado' });
    }

    await role.destroy();
    return res.status(200).json({ message: 'Rol eliminado correctamente' });
  } catch (error) {
    return res.status(500).json({ error: 'Error eliminando el rol', details: error.message });
  }
};