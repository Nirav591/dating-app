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

    pool.query('INSERT INTO video (title, category, video, image) VALUES (?, ?, ?, ?)', [title, category, videoFilePath, imageFilePath], (err, result) => {
      if (err) {
        return handleDatabaseError(res, err);
      }
      return res.status(200).json({ message: 'Video added successfully!' });
    });
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

    if (req.files && req.files.video && req.files.image) {
      const { filename: videoFilename } = req.files.video[0];
      const videoFilePath = `uploads/${videoFilename}`;
      const { filename: imageFilename } = req.files.image[0];
      const imageFilePath = `uploads/${imageFilename}`;

      pool.query('UPDATE video SET title = ?, category = ?, video = ?, image = ? WHERE id = ?', [title, category, videoFilePath, imageFilePath, videoId], (err, result) => {
        if (err) {
          return handleDatabaseError(res, err);
        }
        return res.status(200).json({ message: 'Video updated successfully!' });
      });

    } else if (req.files && req.files.video && !req.files.image) {
      const { filename: videoFilename } = req.files.video[0];
      const videoFilePath = `uploads/${videoFilename}`;

      pool.query(
        'UPDATE video SET title = ?, category = ?, video = ? WHERE id = ?',
        [title, category, videoFilePath, videoId],
        (err, result) => {
          if (err) {
            return handleDatabaseError(res, err);
          }
          return res.status(200).json({ message: 'Video updated successfully!' });
        }
      );

    } else if (req.files && req.files.image && !req.files.video) {
      const { filename: imageFilename } = req.files.image[0];
      const imageFilePath = `uploads/${imageFilename}`;

      pool.query(
        'UPDATE video SET title = ?, category = ?, image = ? WHERE id = ?',
        [title, category, imageFilePath, videoId],
        (err, result) => {
          if (err) {
            return handleDatabaseError(res, err);
          }
          return res.status(200).json({ message: 'Video updated successfully!' });
        }
      );      
    } else {
      pool.query('UPDATE video SET title = ?, category = ? WHERE id = ?', [title, category, videoId], (err, result) => {
        if (err) {
          return handleDatabaseError(res, err);
        }
        return res.status(200).json({ message: 'Video updated successfully!' });
      });
    }
  } catch (err) {
    return handleDatabaseError(res, err);
  }
};
