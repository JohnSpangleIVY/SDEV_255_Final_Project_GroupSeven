// Required modules
const express = require('express');
const authController = require('../controllers/authController');

// Required routes and Authorization
const courseRoutes = require('../routes/courseRoutes');
const userRoutes = require('../routes/userRoutes');
const {requireAuth} = require('../middleware/authMiddleware');

// Express router
const router = express.Router();


// Authorization-related Routes
router.get('/signup', authController.signup_get);

router.post('/signup', authController.signup_post);

router.get('/login', authController.login_get);

router.post('/login', authController.login_post);

router.get('/logout', authController.logout_get);


// Export router
module.exports = router;
