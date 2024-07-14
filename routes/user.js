const express = require('express');
const router = express.Router();

// Define user routes
router.get('/api', (req, res) => {
  res.status(200).send('User route');
});

// router.get('/:id', (req, res) => {
//   res.send(`User with ID: ${req.params.id}`);
// });

module.exports = router;
