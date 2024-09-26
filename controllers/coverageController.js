const { Coverage } = require('../models');
const { formatDatesToColombiaTime } = require('../utils/dateService');

exports.createCoverage = async (req, res) => {
  try {
    const { name } = req.body;

    const newCoverage = await Coverage.create({ name });

    const formattedCoverage = formatDatesToColombiaTime(newCoverage);
    return res.status(201).json(formattedCoverage);
  } catch (error) {
    return res.status(500).json({ error: 'Error creando la cobertura', details: error.message });
  }
};

exports.getAllCoverages = async (req, res) => {
  try {
    const coverages = await Coverage.findAll();

    const formattedCoverages = coverages.map(coverage => formatDatesToColombiaTime(coverage));
    return res.status(200).json(formattedCoverages);
  } catch (error) {
    return res.status(500).json({ error: 'Error obteniendo las coberturas', details: error.message });
  }
};

exports.getCoverageById = async (req, res) => {
  try {
    const { id } = req.params;
    const coverage = await Coverage.findByPk(id);

    if (!coverage) {
      return res.status(404).json({ error: 'Cobertura no encontrada' });
    }

    const formattedCoverage = formatDatesToColombiaTime(coverage);
    return res.status(200).json(formattedCoverage);
  } catch (error) {
    return res.status(500).json({ error: 'Error obteniendo la cobertura', details: error.message });
  }
};

exports.updateCoverage = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const coverage = await Coverage.findByPk(id);

    if (!coverage) {
      return res.status(404).json({ error: 'Cobertura no encontrada' });
    }

    coverage.name = name || coverage.name;
    await coverage.save();

    const formattedCoverage = formatDatesToColombiaTime(coverage);
    return res.status(200).json(formattedCoverage);
  } catch (error) {
    return res.status(500).json({ error: 'Error actualizando la cobertura', details: error.message });
  }
};

exports.deleteCoverage = async (req, res) => {
  try {
    const { id } = req.params;
    const coverage = await Coverage.findByPk(id);

    if (!coverage) {
      return res.status(404).json({ error: 'Cobertura no encontrada' });
    }

    await coverage.destroy();
    return res.status(200).json({ message: 'Cobertura eliminada correctamente' });
  } catch (error) {
    return res.status(500).json({ error: 'Error eliminando la cobertura', details: error.message });
  }
};