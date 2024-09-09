const { Authority } = require('../models');

exports.createAuthority = async (req, res) => {
  try {
    const { name } = req.body;

    const newAuthority = await Authority.create({ name });

    return res.status(201).json(newAuthority);
  } catch (error) {
    return res.status(500).json({ error: 'Error creando la autoridad', details: error.message });
  }
};

exports.getAllAuthorities = async (req, res) => {
  try {
    const authorities = await Authority.findAll();
    return res.status(200).json(authorities);
  } catch (error) {
    return res.status(500).json({ error: 'Error obteniendo las autoridades', details: error.message });
  }
};

exports.getAuthorityById = async (req, res) => {
  try {
    const { id } = req.params;
    const authority = await Authority.findByPk(id);

    if (!authority) {
      return res.status(404).json({ error: 'Autoridad no encontrada' });
    }

    return res.status(200).json(authority);
  } catch (error) {
    return res.status(500).json({ error: 'Error obteniendo la autoridad', details: error.message });
  }
};

exports.updateAuthority = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const authority = await Authority.findByPk(id);

    if (!authority) {
      return res.status(404).json({ error: 'Autoridad no encontrada' });
    }

    authority.name = name || authority.name;
    await authority.save();

    return res.status(200).json(authority);
  } catch (error) {
    return res.status(500).json({ error: 'Error actualizando la autoridad', details: error.message });
  }
};

exports.deleteAuthority = async (req, res) => {
  try {
    const { id } = req.params;
    const authority = await Authority.findByPk(id);

    if (!authority) {
      return res.status(404).json({ error: 'Autoridad no encontrada' });
    }

    await authority.destroy();
    return res.status(200).json({ message: 'Autoridad eliminada correctamente' });
  } catch (error) {
    return res.status(500).json({ error: 'Error eliminando la autoridad', details: error.message });
  }
};
