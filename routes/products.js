const express = require("express");
const router = express.Router();
const Product = require("../models/product");
const { authorizeAdmin } = require("../middlewares/authorizeAdmin");
const { authenticateToken } = require("../middlewares/authenticateToken");

// Get all products
router.get("/", authenticateToken, async (req, res) => {
  const products = await Product.findAll();
  res.json(products);
});
// Route untuk menambahkan produk baru (hanya Admin)
router.post("/", authenticateToken, authorizeAdmin, async (req, res) => {
  // Mengambil data produk dari body request
  const { name, description, price, stock } = req.body;
  // Membuat produk baru dalam database
  const product = await Product.create({ name, description, price, stock });
  // Mengirimkan respons dengan data produk yang baru dibuat
  res.json(product);
});

// Route untuk memperbarui produk yang sudah ada (hanya Admin)
router.put("/:id", authenticateToken, authorizeAdmin, async (req, res) => {
  // Mengambil id produk dari parameter request
  const { id } = req.params;
  // Mengambil data yang diperbarui dari body request
  const { name, description, price, stock } = req.body;
  // Mencari produk berdasarkan id
  const product = await Product.findByPk(id);
  // Jika produk ditemukan
  if (product) {
    // Memperbarui data produk
    await product.update({ name, description, price, stock });
    // Mengirimkan respons dengan data produk yang diperbarui
    res.json(product);
  } else {
    // Jika produk tidak ditemukan, mengirimkan status 404 (Not Found) dengan pesan error
    res.status(404).json({ error: "Product not found" });
  }
});

// Route untuk menghapus produk (hanya Admin)
router.delete("/:id", authenticateToken, authorizeAdmin, async (req, res) => {
  // Mengambil id produk dari parameter request
  const { id } = req.params;
  // Mencari produk berdasarkan id
  const product = await Product.findByPk(id);
  // Jika produk ditemukan
  if (product) {
    // Menghapus produk dari database
    await product.destroy();
    // Mengirimkan respons dengan pesan bahwa produk telah dihapus
    res.json({ message: "Product deleted" });
  } else {
    // Jika produk tidak ditemukan, mengirimkan status 404 (Not Found) dengan pesan error
    res.status(404).json({ error: "Product not found" });
  }
});

module.exports = router;
