// Required modules
const express = require('express');
const userController = require('../controllers/userController');

// Required routes and Authorization
const authRoutes = require('../routes/authRoutes');
const courseRoutes = require('../routes/courseRoutes');
const {requireAuth} = require('../middleware/authMiddleware');

// Express router
const router = express.Router();


// User-related Routes
// Shopping Cart (for students) :: GET
router.get('/shopping-cart', requireAuth, userController.shopping_cart_get);


// Export functions
module.exports = router;
