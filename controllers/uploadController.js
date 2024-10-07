const fs = require('fs');
const path = require('path');

exports.handleFileUpload = (req, res) => {
  console.log('req.body:', req.body);
  console.log('req.files:', req.files);

  const { raffleName } = req.body;
  const files = req.files;

  if (!raffleName || !files || files.length === 0) {
    return res.status(400).json({ message: 'El nombre de la rifa y los archivos son requeridos' });
  }

  const uploadDir = path.join(__dirname, '..', 'uploads', 'raffles', raffleName);

  if (fs.existsSync(uploadDir)) {
    fs.readdirSync(uploadDir).forEach((file) => {
      fs.unlinkSync(path.join(uploadDir, file));
    });
  } else {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  files.forEach((file, index) => {
    console.log('Procesando archivo:', file.originalname);
    const filePath = path.join(
      uploadDir,
      `${raffleName}-${index + 1}${path.extname(file.originalname)}`
    );

    fs.writeFileSync(filePath, file.buffer);
  });

  return res.status(200).json({ message: 'Archivos subidos con éxito' });
};
