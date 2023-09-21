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
    const { title } = req.body;
    const { filename } = req.file;
    const filePath = `uploads/${filename}`;

    pool.query('INSERT INTO video (title, video) VALUES (?, ?)', [title, filePath], (err, result) => {
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
    const { title } = req.body;
    const videoId = req.params.id;

    if (req.file) {
      const { filename } = req.file;
      const filePath = `uploads/${filename}`;

      pool.query('UPDATE video SET title = ?, video = ? WHERE id = ?', [title, filePath, videoId], (err, result) => {
        if (err) {
          return handleDatabaseError(res, err);
        }
        return res.status(200).json({ message: 'Video updated successfully!' });
      });
    } else {
      pool.query('UPDATE video SET title = ? WHERE id = ?', [title, videoId], (err, result) => {
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
