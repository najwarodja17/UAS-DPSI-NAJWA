const express = require("express");
const router = express.Router();
const Order = require("../models/order");
const Product = require("../models/product");
const OrderProducts = require("../models/orderProducts");
const { authenticateToken } = require("../middlewares/authenticateToken");
const { authorizeAdmin } = require("../middlewares/authorizeAdmin");

// Create an order
router.post("/", authenticateToken, async (req, res) => {
  const { products } = req.body; // [{ productId, quantity }]
  let total = 0;
  const productDetails = await Promise.all(
    products.map(async (p) => {
      const product = await Product.findByPk(p.productId);
      if (product) {
        console.log("Found product:", product);
        console.log("Product price:", product.price, "Quantity:", p.quantity);
        total += product.price * p.quantity;
        return { product, quantity: p.quantity };
      }
      return null;
    })
  );

  // Filter out null values
  const validProductDetails = productDetails.filter((p) => p !== null);

  const order = await Order.create({
    status: "pending",
    total,
    UserId: req.user.id,
  });

  await Promise.all(
    validProductDetails.map((p) =>
      OrderProducts.create({
        OrderId: order.id,
        ProductId: p.product.id,
        quantity: p.quantity,
      })
    )
  );

  res.json(order);
});

// Get all orders (Admin only)
router.get("/", authenticateToken, authorizeAdmin, async (req, res) => {
  const orders = await Order.findAll({});
  res.json(orders);
});

// Get user orders
router.get("/my-orders", authenticateToken, async (req, res) => {
  const orders = await Order.findAll({
    where: { UserId: req.user.id },
  });
  res.json(orders);
});

// Update order status (Admin only)
router.put("/:id", authenticateToken, authorizeAdmin, async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const order = await Order.findByPk(id);
  if (order) {
    order.update({ status });
    res.json(order);
  } else {
    res.status(404).json({ error: "Order not found" });
  }
});

module.exports = router;
