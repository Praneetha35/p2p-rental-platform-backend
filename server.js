const express = require('express');
const bodyParser = require('body-parser');
const itemRoutes = require('./routes/items');

const app = express();
const PORT = 3000;

// Middleware to parse JSON requests
app.use(bodyParser.json());

// Use item routes for /api/items
app.use('/api/items', itemRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});