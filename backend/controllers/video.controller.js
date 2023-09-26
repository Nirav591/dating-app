const { pool } = require('../config/sql.config');

// Function to handle database errors and respond with JSON
const handleDatabaseError = (res, err) => {
  console.error('Database error:', err);
  return res.status(400).json({
    message: 'An error occurred',
    error: err.message,
  });
};

exports.addVideo = async (req, res) => {
  try {
    const { title, category } = req.body;
    const { filename: videoFilename } = req.files.video[0];
    const videoFilePath = `uploads/${videoFilename}`;
    const { filename: imageFilename } = req.files.image[0];
    const imageFilePath = `uploads/${imageFilename}`;

    pool.query(
      'INSERT INTO video (title, category, video, image) VALUES (?, ?, ?, ?)',
      [title, category, videoFilePath, imageFilePath],
      (err, result) => {
        if (err) {
          return handleDatabaseError(res, err);
        }
        return res.status(200).json({ message: 'Video added successfully!' });
      }
    );
  } catch (err) {
    return handleDatabaseError(res, err);
  }
};

exports.getVideos = (req, res) => {
  pool.query('SELECT * FROM video', (err, result) => {
    if (err) {
      return handleDatabaseError(res, err);
    }
    return res.status(200).json(result);
  });
};

exports.getVideoById = (req, res) => {
  const videoId = req.params.id;
  pool.query('SELECT * FROM video WHERE id = ?', [videoId], (err, result) => {
    if (err) {
      return handleDatabaseError(res, err);
    }
    return res.status(200).json(result);
  });
};

exports.deleteVideo = (req, res) => {
  const videoId = req.params.id;
  pool.query('DELETE FROM video WHERE id = ?', [videoId], (err, result) => {
    if (err) {
      return handleDatabaseError(res, err);
    }
    return res.status(200).json({ message: 'Video deleted successfully' });
  });
};

exports.updateVideo = async (req, res) => {
  try {
    const { title, category } = req.body;
    const videoId = req.params.id;

    if (req.files) {
      let videoQuery = '';
      const queryParams = [title, category, videoId];

      if (req.files.video) {
        const { filename: videoFilename } = req.files.video[0];
        const videoFilePath = `uploads/${videoFilename}`;
        videoQuery = 'video = ?';
        queryParams.push(videoFilePath);
      }

      if (req.files.image) {
        const { filename: imageFilename } = req.files.image[0];
        const imageFilePath = `uploads/${imageFilename}`;
        videoQuery += videoQuery ? ', ' : '';
        videoQuery += 'image = ?';
        queryParams.push(imageFilePath);
      }

      if (videoQuery) {
        const updateVideoQuery = `UPDATE video SET title = ?, category = ?, ${videoQuery} WHERE id = ?`;
        pool.query(updateVideoQuery, queryParams, (err, result) => {
          if (err) {
            return handleDatabaseError(res, err);
          }
          return res.status(200).json({ message: 'Video updated successfully!' });
        });
      } else {
        // If no files were uploaded, update only title and category
        pool.query('UPDATE video SET title = ?, category = ? WHERE id = ?', queryParams, (err, result) => {
          if (err) {
            return handleDatabaseError(res, err);
          }
          return res.status(200).json({ message: 'Video updated successfully!' });
        });
      }
    } else {
      // If no files were uploaded, update only title and category
      pool.query(
        'UPDATE video SET title = ?, category = ? WHERE id = ?',
        [title, category, videoId],
        (err, result) => {
          if (err) {
            return handleDatabaseError(res, err);
          }
          return res.status(200).json({ message: 'Video updated successfully!' });
        }
      );
    }
  } catch (err) {
    return handleDatabaseError(res, err);
  }
};
