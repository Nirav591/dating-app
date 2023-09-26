const { pool } = require('../config/sql.config');

const handleDatabaseError = (res, err) => {
  console.error('Database error:', err);
  return res.status(400).json({
    message: 'An error occurred',
    error: err.message,
  });
};

exports.addGoogleAds = (req,res) =>{    
    try {
      const {googleAds} = req.body.googleAds;   
      const appOpenStatus = googleAds.app_open_status ? 'true' : 'false';
      const adaptiveBannerStatus = googleAds.adaptive_banner_status ? 'true' : 'false';
      const interstitialStatus = googleAds.interstitial_status ? 'true' : 'false';
      const interstitialVideoStatus = googleAds.interstitial_video_status ? 'true' : 'false';
      const rewardedStatus = googleAds.rewarded_status ? 'true' : 'false';
      const rewardedInterstitialStatus = googleAds.rewarded_interstitial_status ? 'true' : 'false';
      const nativeAdvancedStatus = googleAds.native_advanced_status ? 'true' : 'false';
      const nativeAdvancedVideoStatus = googleAds.native_advanced_video_status ? 'true' : 'false';
      const googleAdsStatus = googleAds.google_ads_status ? 'true' : 'false';
      
      pool.query('INSERT INTO google_ads (app_open, app_open_status, adaptive_banner, adaptive_banner_status, interstitial, interstitial_status, interstitial_video, interstitial_video_status, rewarded, rewarded_status, rewarded_interstitial, rewarded_interstitial_status, native_advanced, native_advanced_status, native_advanced_video, native_advanced_video_status, google_ads_status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', 
      [
        googleAds.app_open,
        appOpenStatus,
        googleAds.adaptive_banner,
        adaptiveBannerStatus,
        googleAds.interstitial,
        interstitialStatus,
        googleAds.interstitial_video,
        interstitialVideoStatus,
        googleAds.rewarded, 
        rewardedStatus,
        googleAds.rewarded_interstitial,
        rewardedInterstitialStatus,
        googleAds.native_advanced,
        nativeAdvancedStatus,
        googleAds.native_advanced_video,
        nativeAdvancedVideoStatus,
        googleAdsStatus,
      ],  
       (err, result) => {
        if (err) {
          return handleDatabaseError(res, err);
        }
        return res.status(200).json({ message: "Google ads added successfully" });
      });
    } catch (err) {
      return handleDatabaseError(res, err);
    }
}

exports.getAllGoogleAds = (req,res) => { 
  pool.query('SELECT * FROM google_ads', (err, result) => {
    if (err) {
      return handleDatabaseError(res, err);
    }
    return res.status(200).json(result);
  });
}; 

exports.updateGoogleAds = (req,res) =>{   
  const updateGoogleAdsQuery = `UPDATE google_ads
    SET
      app_open = ?, app_open_status = ?, adaptive_banner = ?,
      adaptive_banner_status = ?, interstitial = ?, interstitial_status = ?,
      interstitial_video = ?, interstitial_video_status = ?, rewarded = ?,
      rewarded_status = ?, rewarded_interstitial = ?, rewarded_interstitial_status = ?,
      native_advanced = ?, native_advanced_status = ?, native_advanced_video = ?,
      native_advanced_video_status = ?, google_ads_status = ?`;
  try {
    const googleAds = req.body.googleAds;  
    const appOpenStatus = googleAds.app_open_status ? 'true' : 'false';
    const adaptiveBannerStatus = googleAds.adaptive_banner_status ? 'true' : 'false';
    const interstitialStatus = googleAds.interstitial_status ? 'true' : 'false';
    const interstitialVideoStatus = googleAds.interstitial_video_status ? 'true' : 'false';
    const rewardedStatus = googleAds.rewarded_status ? 'true' : 'false';
    const rewardedInterstitialStatus = googleAds.rewarded_interstitial_status ? 'true' : 'false';
    const nativeAdvancedStatus = googleAds.native_advanced_status ? 'true' : 'false';
    const nativeAdvancedVideoStatus = googleAds.native_advanced_video_status ? 'true' : 'false';
    const googleAdsStatus = googleAds.google_ads_status ? 'true' : 'false';     

    pool.query(updateGoogleAdsQuery, 
      [
        googleAds.app_open,
        appOpenStatus,
        googleAds.adaptive_banner,
        adaptiveBannerStatus,
        googleAds.interstitial,
        interstitialStatus,
        googleAds.interstitial_video,
        interstitialVideoStatus,
        googleAds.rewarded, 
        rewardedStatus,
        googleAds.rewarded_interstitial,
        rewardedInterstitialStatus,
        googleAds.native_advanced,
        nativeAdvancedStatus,
        googleAds.native_advanced_video,
        nativeAdvancedVideoStatus,
        googleAdsStatus,
      ],
      (err, result) => {
      if (err) {
        return handleDatabaseError(res, err);
      }
      return res.status(200).json({ message: "Google ads updated successfully!" });
    });
  } catch (err) {
    return handleDatabaseError(res, err);
  }
}