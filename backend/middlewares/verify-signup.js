const { pool } = require('../config/sql.config');

exports.checkUsernameOrEmail = (req, res, next) => {
  pool.getConnection((err, connection) => {
    if (err) {
      return res.status(500).json({ message: "Database connection error" });
    }

    // Check username
    connection.query('SELECT * FROM users WHERE name = ?', [req.body.name], (err, userByUsername) => {
      if (err) {
        connection.release();
        return res.status(500).json({ error: 'Database query error' });
      }
      if (userByUsername.length) {
        connection.release();
        return res.status(400).json({ message: 'Failed! Username is already in use!' });
      }

      // Check email
      connection.query('SELECT * FROM users WHERE email = ?', [req.body.email], (err, userByEmail) => {
        if (err) {
          connection.release();
          return res.status(500).json({ error: 'Database query error' });
        }
        if (userByEmail.length) {
          connection.release();
          return res.status(400).json({ message: 'Failed! Email is already in use!' });
        }
        
        connection.release();
        next(); // Move to the next middleware or route handler
      });
    });
  });
};
