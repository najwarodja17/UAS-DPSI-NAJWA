// Import jwt untuk memverifikasi token JWT
const jwt = require("jsonwebtoken");
// Memuat variabel lingkungan dari file .env
require("dotenv").config();

// Middleware untuk mengautentikasi token JWT
function authenticateToken(req, res, next) {
  // Mendapatkan header Authorization dari permintaan
  const authHeader = req.headers["authorization"];
  // Mendapatkan token dari header Authorization, jika ada
  const token = authHeader && authHeader.split(" ")[1];

  // Jika token tidak ada, kembalikan status 401 (Unauthorized) dengan pesan error
  if (token == null) return res.status(401).json({ error: "Unauthorized" });

  // Memverifikasi token menggunakan secret key
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    // Jika token tidak valid, kembalikan status 403 (Forbidden) dengan pesan error
    if (err) return res.status(403).json({ error: "Forbidden" });
    // Menyimpan informasi pengguna dari token ke dalam request
    req.user = user;
    // Melanjutkan ke middleware berikutnya
    next();
  });
}

// Mengekspor middleware untuk digunakan di tempat lain
module.exports = { authenticateToken };
