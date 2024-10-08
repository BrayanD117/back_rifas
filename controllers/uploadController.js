const fs = require('fs');
const path = require('path');

exports.handleFileUpload = (req, res) => {
  console.log('req.body:', req.body);
  console.log('req.files:', req.files);

  const { raffleName } = req.body;
  const files = req.files;

  if (!raffleName || !files || files.length === 0) {
    return res
      .status(400)
      .json({ message: 'El nombre de la rifa y los archivos son requeridos' });
  }

  const sanitizedRaffleName = raffleName.replace(/\s+/g, '_');

  const uploadDir = path.join(
    __dirname,
    '..',
    'uploads',
    'raffles',
    sanitizedRaffleName
  );

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  files.forEach((file) => {
    const filePath = path.join(uploadDir, file.originalname);
    fs.writeFileSync(filePath, file.buffer);
  });

  return res.status(200).json({ message: 'Archivos subidos con éxito' });
};

exports.deleteFile = (req, res) => {
  const { imagePath } = req.body;

  if (!imagePath) {
    return res.status(400).json({ message: 'La ruta de la imagen es requerida' });
  }

  const filePath = path.join(__dirname, '..', 'uploads', 'raffles', imagePath);

  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
    return res.status(200).json({ message: 'Imagen eliminada con éxito' });
  } else {
    return res.status(404).json({ message: 'Imagen no encontrada' });
  }
};

