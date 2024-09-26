const { Authority } = require('../models');
const { formatDatesToColombiaTime } = require('../utils/dateService');

exports.createAuthority = async (req, res) => {
  try {
    const { name } = req.body;

    const newAuthority = await Authority.create({ name });

    const formattedAuthority = formatDatesToColombiaTime(newAuthority);
    return res.status(201).json(formattedAuthority);
  } catch (error) {
    return res.status(500).json({ error: 'Error creando la autoridad', details: error.message });
  }
};

exports.getAllAuthorities = async (req, res) => {
  try {
    const authorities = await Authority.findAll();
    const formattedAuthorities = authorities.map(authority => formatDatesToColombiaTime(authority));
    return res.status(200).json(formattedAuthorities);
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

    const formattedAuthority = formatDatesToColombiaTime(authority);
    return res.status(200).json(formattedAuthority);
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

    const formattedAuthority = formatDatesToColombiaTime(authority);
    return res.status(200).json(formattedAuthority);
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
