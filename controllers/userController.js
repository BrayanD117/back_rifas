const { User, Role, Customer } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Generar el token con duración de 24 horas
const generateToken = (user) => {
  const payload = { id: user.id, email: user.email, roleId: user.roleId };
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '24h' });
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    const token = generateToken(user);

    // Guardar el token en una cookie segura
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Solo en producción se habilita `secure`
      maxAge: 24 * 60 * 60 * 1000 // 24 horas
    });

    return res.status(200).json({ user: { id: user.id, email: user.email, roleId: user.roleId } });
  } catch (error) {
    return res.status(500).json({ error: 'Error iniciando sesión', details: error.message });
  }
};

// Método para crear usuario (registro)
exports.createUser = async (req, res) => {
  try {
    const { roleId, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      roleId,
      email,
      password: hashedPassword
    });

    const token = generateToken(newUser);

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 24 * 60 * 60 * 1000
    });

    return res.status(201).json({ user: { id: newUser.id, email: newUser.email, roleId: newUser.roleId } });
  } catch (error) {
    return res.status(500).json({ error: 'Error creando el usuario', details: error.message });
  }
};


exports.createUser = async (req, res) => {
  try {
    const { roleId, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      roleId,
      email,
      password: hashedPassword
    });

    return res.status(201).json(newUser);
  } catch (error) {
    return res.status(500).json({ error: 'Error creando el usuario', details: error.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      include: [
        { model: Role, attributes: ['name'] },
        { model: Customer, attributes: ['name', 'documentNumber'] }
      ]
    });
    return res.status(200).json(users);
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

    return res.status(200).json(user);
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

    return res.status(200).json(user);
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
