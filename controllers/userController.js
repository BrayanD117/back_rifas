const { User, Role, Customer } = require('../models');
const { formatDatesToColombiaTime } = require('../utils/dateService');

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      include: [
        { model: Role, attributes: ['name'] },
        { model: Customer, attributes: ['name', 'documentNumber'] }
      ]
    });

    const formattedUsers = users.map(user => formatDatesToColombiaTime(user));
    return res.status(200).json(formattedUsers);
  } catch (error) {
    return res.status(500).json({ error: 'Error obteniendo los usuarios', details: error.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id, {
      include: [
        { model: Role, attributes: ['name'] },
        { model: Customer, attributes: ['name', 'documentNumber'] }
      ]
    });

    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    const formattedUser = formatDatesToColombiaTime(user);
    return res.status(200).json(formattedUser);
  } catch (error) {
    return res.status(500).json({ error: 'Error obteniendo el usuario', details: error.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { roleId, email, password } = req.body;

    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    user.roleId = roleId || user.roleId;
    user.email = email || user.email;

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
    }

    await user.save();

    const formattedUser = formatDatesToColombiaTime(user);
    return res.status(200).json(formattedUser);
  } catch (error) {
    return res.status(500).json({ error: 'Error actualizando el usuario', details: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    await user.destroy();
    return res.status(200).json({ message: 'Usuario eliminado correctamente' });
  } catch (error) {
    return res.status(500).json({ error: 'Error eliminando el usuario', details: error.message });
  }
};