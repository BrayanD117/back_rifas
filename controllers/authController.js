require('dotenv').config();
const { User, Role } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const generateToken = (user) => {
  const payload = { id: user.id, email: user.email, roleId: user.roleId };
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '24h' });
};

exports.checkSession = (req, res) => {
  if (req.user) {
    return res.status(200).json({ message: 'Sesión válida', user: req.user });
  } else {
    return res.status(401).json({ error: 'Sesión no válida' });
  }
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

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 24 * 60 * 60 * 1000
    });

    return res.status(200).json({ user: { id: user.id, email: user.email, roleId: user.roleId } });
  } catch (error) {
    return res.status(500).json({ error: 'Error iniciando sesión', details: error.message });
  }
};

exports.logout = (req, res) => {
  res.clearCookie('token');
  return res.status(200).json({ message: 'Sesión cerrada exitosamente' });
};

exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'El correo ya está registrado' });
    }

    const role = await Role.findOne({ where: { name: 'USUARIO' } });
    if (!role) {
      return res.status(500).json({ error: 'No se encontró el rol USUARIO' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      roleId: role.id,
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
    return res.status(500).json({ error: 'Error registrando el usuario', details: error.message });
  }
};
