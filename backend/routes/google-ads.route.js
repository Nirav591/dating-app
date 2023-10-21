const express = require('express');
const { getAllGoogleAds, updateGoogleAds } = require('../controllers/google-ads.controller');
const router = express.Router();


router.get('/', getAllGoogleAds);
router.put('/', updateGoogleAds);

module.exports = router;
