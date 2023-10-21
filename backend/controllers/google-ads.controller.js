const { pool } = require('../config/sql.config');

const handleDatabaseError = (res, err) => {
  console.error('Database error:', err);
  return res.status(400).json({
    message: 'An error occurred',
    error: err.message,
  });
};

exports.getAllGoogleAds = (req, res) => {
  pool.query('SELECT * FROM google_ads', (err, result) => {
    if (err) {
      return handleDatabaseError(res, err);
    }
    return res.status(200).json(result);
  });
};

exports.updateGoogleAds = (req, res) => {
  const updateGoogleAdsQuery = `
    UPDATE google_ads
    SET
      app_open = ?,
      app_open_status = ?,
      adaptive_banner = ?,
      adaptive_banner_status = ?,
      interstitial = ?,
      interstitial_status = ?,
      interstitial_video = ?,
      interstitial_video_status = ?,
      rewarded = ?,
      rewarded_status = ?,
      rewarded_interstitial = ?,
      rewarded_interstitial_status = ?,
      native_advanced = ?,
      native_advanced_status = ?,
      native_advanced_video = ?,
      native_advanced_video_status = ?,
      google_ads_status = ?`;

  try {
    const { googleAds } = req.body;
    const {
      app_open,
      app_open_status,
      adaptive_banner,
      adaptive_banner_status,
      interstitial,
      interstitial_status,
      interstitial_video,
      interstitial_video_status,
      rewarded,
      rewarded_status,
      rewarded_interstitial,
      rewarded_interstitial_status,
      native_advanced,
      native_advanced_status,
      native_advanced_video,
      native_advanced_video_status,
      google_ads_status,
    } = googleAds;

    pool.query(
      updateGoogleAdsQuery,
      [
        app_open,
        app_open_status ? 'true' : 'false',
        adaptive_banner,
        adaptive_banner_status ? 'true' : 'false',
        interstitial,
        interstitial_status ? 'true' : 'false',
        interstitial_video,
        interstitial_video_status ? 'true' : 'false',
        rewarded,
        rewarded_status ? 'true' : 'false',
        rewarded_interstitial,
        rewarded_interstitial_status ? 'true' : 'false',
        native_advanced,
        native_advanced_status ? 'true' : 'false',
        native_advanced_video,
        native_advanced_video_status ? 'true' : 'false',
        google_ads_status ? 'true' : 'false',
      ],
      (err, result) => {
        if (err) {
          return handleDatabaseError(res, err);
        }
        return res.status(200).json({ message: 'Google ads updated successfully!' });
      }
    );
  } catch (err) {
    return handleDatabaseError(res, err);
  }
};
