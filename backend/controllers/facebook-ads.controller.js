const { pool } = require('../config/sql.config');

const handleDatabaseError = (res, err) => {
  console.error('Database error:', err);
  return res.status(400).json({
    message: 'An error occurred',
    error: err.message,
  });
};

exports.addFacebookAds = (req,res) =>{    
    try {
      const {facebookAds} = req.body.facebookAds;
      const bannerStatus = facebookAds.banner_status ? 'true' : 'false';
      const interstitialStatus = facebookAds.interstitial_status ? 'true' : 'false';
      const nativeAdvancedStatus = facebookAds.native_advanced_status ? 'true' : 'false';
      const nativeBannerStatus = facebookAds.native_banner_status ? 'true' : 'false';
      const facebookAdsStatus = facebookAds.facebook_ads_status ? 'true' : 'false';

      pool.query(
        'INSERT INTO facebook_ads (banner, banner_status, interstitial, interstitial_status, native_advanced, native_advanced_status, native_banner, native_banner_status, facebook_ads_status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [
          facebookAds.banner,
          bannerStatus,
          facebookAds.interstitial,
          interstitialStatus,
          facebookAds.native_advanced,
          nativeAdvancedStatus,
          facebookAds.native_banner,
          nativeBannerStatus,
          facebookAdsStatus,
        ],
        (err, result) => {
          if (err) {
            return handleDatabaseError(res, err);
          }
          return res.status(200).json({ message: 'Facebook ads added successfully'});
        }
      );
    }
     catch (err) {
      return handleDatabaseError(res, err);
    }
}

exports.getAllFacebookAds = (req,res) => { 
  pool.query('SELECT * FROM facebook_ads', (err, result) => {
    if (err) {
      return handleDatabaseError(res, err);
    }
    return res.status(200).json(result);
  });
}; 

exports.updateFacebookAds = (req,res) =>{   
  const updateFacebookAdsQuery = `
  UPDATE facebook_ads
  SET
    banner = ?, banner_status = ?, interstitial = ?,
    interstitial_status = ?, native_advanced = ?, native_advanced_status = ?,
    native_banner = ?, native_banner_status = ?, facebook_ads_status = ?`;

  try {
    const facebookAds = req.body.facebookAds;   
      const bannerStatus = facebookAds.banner_status ? 'true' : 'false';
      const interstitialStatus = facebookAds.interstitial_status ? 'true' : 'false';
      const nativeAdvancedStatus = facebookAds.native_advanced_status ? 'true' : 'false';
      const nativeBannerStatus = facebookAds.native_banner_status ? 'true' : 'false';
      const facebookAdsStatus = facebookAds.facebook_ads_status ? 'true' : 'false';   
     pool.query(updateFacebookAdsQuery, 
      [
        facebookAds.banner,
        bannerStatus,
        facebookAds.interstitial,
        interstitialStatus,
        facebookAds.native_advanced,
        nativeAdvancedStatus,
        facebookAds.native_banner,
        nativeBannerStatus,
        facebookAdsStatus,        
    ],
     (err, result) => {
      if (err) {
        return handleDatabaseError(res, err);
      }
      return res.status(200).json({ message: "Facebook ads updated successfully!" });
    });
  } catch (err) {
    return handleDatabaseError(res, err);
  }
}