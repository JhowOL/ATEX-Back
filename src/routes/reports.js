const express = require('express');
const multer = require('multer');
const reportsController = require('../controllers/reportsController');

const router = express.Router();

const upload = multer({
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (['image/jpeg', 'image/png'].includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Apenas JPEG e PNG são aceitos'));
    }
  },
});

router.post('/', upload.single('foto'), reportsController.create);
router.get('/', reportsController.list);

module.exports = router;
