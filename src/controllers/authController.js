const db = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = (req, res) => {
  const { username, password, fullname } = req.body;
  if (!username || !password)
    return res.status(400).json({ message: 'Username dan password wajib diisi!' });

  const hashedPassword = bcrypt.hashSync(password, 10);
  const query = 'INSERT INTO users (username, password, fullname) VALUES (?, ?, ?)';

  db.query(query, [username, hashedPassword, fullname], (err) => {
    if (err) {
      if (err.code === 'ER_DUP_ENTRY')
        return res.status(400).json({ message: 'Username sudah digunakan!' });
      return res.status(500).json({ message: 'Gagal register user!' });
    }
    res.status(201).json({ message: 'Registrasi berhasil!' });
  });
};

exports.login = (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).json({ message: 'Username dan password wajib diisi!' });

  db.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
    if (err) return res.status(500).json({ message: 'Terjadi kesalahan server.' });
    if (results.length === 0)
      return res.status(404).json({ message: 'User tidak ditemukan.' });

    const user = results[0];
    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid)
      return res.status(401).json({ message: 'Password salah.' });

    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({
      message: 'Login berhasil!',
      token
    });
  });
};
