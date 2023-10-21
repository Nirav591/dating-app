const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { addPremiumVideo, getPremiumVideoById, getPremiumVideos, deletePremiumVideo, updatePremiumVideo } = require('../controllers/premium-video.controller');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve(__dirname, '../uploads/'));
  },
  filename: (req, file, cb) => {
    const fileExtension = path.extname(file.originalname);
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const fileName = uniqueSuffix + fileExtension;
    cb(null, fileName);
  },
});

const upload = multer({ storage });

router.post('/', upload.fields([{ name: 'video', maxCount: 1 }, { name: 'image', maxCount: 1 }]), addPremiumVideo);
router.get('/:id', getPremiumVideoById);
router.get('/', getPremiumVideos);
router.delete('/:id', deletePremiumVideo);
router.put('/:id', upload.fields([{ name: 'video', maxCount: 1 }, { name: 'image', maxCount: 1 }]), updatePremiumVideo);

module.exports = router;
