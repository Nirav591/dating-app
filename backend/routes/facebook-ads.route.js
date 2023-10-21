const express = require('express');
const { getAllFacebookAds, updateFacebookAds } = require('../controllers/facebook-ads.controller');
const router = express.Router();


router.get('/', getAllFacebookAds);
router.put('/', updateFacebookAds);

module.exports = router;
