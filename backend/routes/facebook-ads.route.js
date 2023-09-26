const express = require('express');
const { addFacebookAds, getAllFacebookAds, updateFacebookAds } = require('../controllers/facebook-ads.controller');
const router = express.Router();


router.post('/', addFacebookAds);
router.get('/', getAllFacebookAds);
router.put('/', updateFacebookAds);

module.exports = router;
