const { Category } = require('../models');
const { formatDatesToColombiaTime } = require('../utils/dateService');

exports.createCategory = async (req, res) => {
  try {
    const { name } = req.body;

    const newCategory = await Category.create({ name });

    const formattedCategory = formatDatesToColombiaTime(newCategory);
    return res.status(201).json(formattedCategory);
  } catch (error) {
    return res.status(500).json({ error: 'Error creando la categoría', details: error.message });
  }
};

exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();
    const formattedCategories = categories.map(category => formatDatesToColombiaTime(category));
    return res.status(200).json(formattedCategories);
  } catch (error) {
    return res.status(500).json({ error: 'Error obteniendo las categorías', details: error.message });
  }
};

exports.getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findByPk(id);

    if (!category) {
      return res.status(404).json({ error: 'Categoría no encontrada' });
    }

    const formattedCategory = formatDatesToColombiaTime(category);
    return res.status(200).json(formattedCategory);
  } catch (error) {
    return res.status(500).json({ error: 'Error obteniendo la categoría', details: error.message });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const category = await Category.findByPk(id);

    if (!category) {
      return res.status(404).json({ error: 'Categoría no encontrada' });
    }

    category.name = name || category.name;
    await category.save();

    const formattedCategory = formatDatesToColombiaTime(category);
    return res.status(200).json(formattedCategory);
  } catch (error) {
    return res.status(500).json({ error: 'Error actualizando la categoría', details: error.message });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findByPk(id);

    if (!category) {
      return res.status(404).json({ error: 'Categoría no encontrada' });
    }

    await category.destroy();
    return res.status(200).json({ message: 'Categoría eliminada correctamente' });
  } catch (error) {
    return res.status(500).json({ error: 'Error eliminando la categoría', details: error.message });
  }
};