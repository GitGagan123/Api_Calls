const express = require('express');
const app = express();
const port = 3000;

const cors = require("cors");

app.use(cors());

// Disable cache for debugging
app.use((req, res, next) => {
  res.set('Cache-Control', 'no-store');
  next();
});

// Import routes
const userRoutes = require('./routes/user');
// const productRoutes = require('./routes/product');

// Use routes
app.use('/user', userRoutes);
// app.use('/product', productRoutes);

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
