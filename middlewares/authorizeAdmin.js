// Middleware untuk mengautorisasi pengguna dengan peran 'admin'
function authorizeAdmin(req, res, next) {
  // Memeriksa apakah peran pengguna dalam request adalah 'admin'
  if (req.user.role === "admin") {
    // Jika peran adalah 'admin', lanjutkan ke middleware berikutnya
    next();
  } else {
    // Jika bukan 'admin', kembalikan status 403 (Forbidden) dengan pesan error
    res.status(403).json({ error: "Forbidden" });
  }
}

// Mengekspor middleware untuk digunakan di tempat lain
module.exports = { authorizeAdmin };
