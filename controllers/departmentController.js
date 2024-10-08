const { Department } = require('../models');
const { formatDatesToColombiaTime } = require('../utils/dateService');

exports.createDepartment = async (req, res) => {
  try {
    const { id, name } = req.body;

    const newDepartment = await Department.create({ id, name });

    const formattedDepartment = formatDatesToColombiaTime(newDepartment);
    return res.status(201).json(formattedDepartment);
  } catch (error) {
    return res.status(500).json({ error: 'Error creando el departamento', details: error.message });
  }
};

exports.getAllDepartments = async (req, res) => {
  try {
    const departments = await Department.findAll();
    const formattedDepartments = departments.map(department => formatDatesToColombiaTime(department));
    return res.status(200).json(formattedDepartments);
  } catch (error) {
    return res.status(500).json({ error: 'Error obteniendo los departamentos', details: error.message });
  }
};

exports.getDepartmentById = async (req, res) => {
  try {
    const { id } = req.params;
    const department = await Department.findByPk(id);

    if (!department) {
      return res.status(404).json({ error: 'Departamento no encontrado' });
    }

    const formattedDepartment = formatDatesToColombiaTime(department);
    return res.status(200).json(formattedDepartment);
  } catch (error) {
    return res.status(500).json({ error: 'Error obteniendo el departamento', details: error.message });
  }
};

exports.updateDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const department = await Department.findByPk(id);

    if (!department) {
      return res.status(404).json({ error: 'Departamento no encontrado' });
    }

    department.name = name || department.name;
    await department.save();

    const formattedDepartment = formatDatesToColombiaTime(department);
    return res.status(200).json(formattedDepartment);
  } catch (error) {
    return res.status(500).json({ error: 'Error actualizando el departamento', details: error.message });
  }
};

exports.deleteDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    const department = await Department.findByPk(id);

    if (!department) {
      return res.status(404).json({ error: 'Departamento no encontrado' });
    }

    await department.destroy();
    return res.status(200).json({ message: 'Departamento eliminado correctamente' });
  } catch (error) {
    return res.status(500).json({ error: 'Error eliminando el departamento', details: error.message });
  }
};