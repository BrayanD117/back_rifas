const { City, Department } = require('../models');
const { formatDatesToColombiaTime } = require('../utils/dateService');

exports.createCity = async (req, res) => {
  try {
    const { id, departmentId, name } = req.body;

    const department = await Department.findByPk(departmentId);
    if (!department) {
      return res.status(404).json({ error: 'Departamento no encontrado' });
    }

    const newCity = await City.create({ id, departmentId, name });
    const formattedCity = formatDatesToColombiaTime(newCity);
    
    return res.status(201).json(formattedCity);
  } catch (error) {
    return res.status(500).json({ error: 'Error creando la ciudad', details: error.message });
  }
};

exports.getAllCities = async (req, res) => {
  try {
    const cities = await City.findAll({ include: [Department] });
    const formattedCities = cities.map(city => formatDatesToColombiaTime(city));
    
    return res.status(200).json(formattedCities);
  } catch (error) {
    return res.status(500).json({ error: 'Error obteniendo las ciudades', details: error.message });
  }
};

exports.getCityById = async (req, res) => {
  try {
    const { id } = req.params;
    const city = await City.findByPk(id, { include: [Department] });

    if (!city) {
      return res.status(404).json({ error: 'Ciudad no encontrada' });
    }

    const formattedCity = formatDatesToColombiaTime(city);
    return res.status(200).json(formattedCity);
  } catch (error) {
    return res.status(500).json({ error: 'Error obteniendo la ciudad', details: error.message });
  }
};

exports.updateCity = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, departmentId } = req.body;

    const city = await City.findByPk(id);

    if (!city) {
      return res.status(404).json({ error: 'Ciudad no encontrada' });
    }

    if (departmentId) {
      const department = await Department.findByPk(departmentId);
      if (!department) {
        return res.status(404).json({ error: 'Departamento no encontrado' });
      }
      city.departmentId = departmentId;
    }

    city.name = name || city.name;
    await city.save();

    const formattedCity = formatDatesToColombiaTime(city);
    return res.status(200).json(formattedCity);
  } catch (error) {
    return res.status(500).json({ error: 'Error actualizando la ciudad', details: error.message });
  }
};

exports.deleteCity = async (req, res) => {
  try {
    const { id } = req.params;
    const city = await City.findByPk(id);

    if (!city) {
      return res.status(404).json({ error: 'Ciudad no encontrada' });
    }

    await city.destroy();
    return res.status(200).json({ message: 'Ciudad eliminada correctamente' });
  } catch (error) {
    return res.status(500).json({ error: 'Error eliminando la ciudad', details: error.message });
  }
};