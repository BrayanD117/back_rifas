const express = require('express');
const router = express.Router();
const multer = require('multer');
const { handleFileUpload } = require('../controllers/uploadController');
const uploadController = require('../controllers/uploadController');

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/files', upload.array('files', 10), handleFileUpload);
router.delete('/file', uploadController.deleteFile);

module.exports = router;
