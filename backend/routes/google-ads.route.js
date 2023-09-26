const express = require('express');
const { addGoogleAds, getAllGoogleAds, updateGoogleAds } = require('../controllers/google-ads.controller');
const router = express.Router();


router.post('/', addGoogleAds);
router.get('/', getAllGoogleAds);
router.put('/', updateGoogleAds);

module.exports = router;
