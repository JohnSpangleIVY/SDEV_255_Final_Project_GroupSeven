// Server-side code

// Required modules for the server
const express = require('express'); // necessary web framework
const morgan = require('morgan'); // HTTP request logger middleware
const mongoose = require('mongoose'); // used for database-related things
const cookieParser = require('cookie-parser'); // used for parsing cookie data
// Required models
const Courses = require('./models/courses');
const User = require('./models/User');
// Required route files
const courseRoutes = require('./routes/courseRoutes');
const authRoutes = require('./routes/authRoutes');


// Express app
const app = express();


// Connect to MongoDB
const dbURI = 'mongodb+srv://testuser123:jt3QhYVIheU2WYLk@node-tuts.kjiohpd.mongodb.net/groupseven';  // need to see how we can handle multiple users; might be covered in next module?
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology:true})
  .then ((result) => app.listen(3000)) // 3000 can be changed to fit ones' needs
  .catch ((err) => console.log(err)); // log errors related to connecting


// Register the view engine (so we can use EJS files instead of HTML)
app.set('view engine', 'ejs');


// Use middleware to access our CSS and JS, which are static files
app.use(express.static('public'));
app.use(express.json()); // passes JSON data into a JS object
app.use(express.urlencoded({extended:true})); // must use this in order to get data from forms
app.use(morgan('dev'));
app.use(cookieParser()); // allows us to access a cookie method on a response object


//
// Routes - work in progress
// Welcome page
app.get('/', (req, res) => {
  res.render('index', {title: 'Welcome'});
});

// Login page
app.get('/login', (req, res) => {
  res.render('login', {title: 'Login'});
});

// Course routes
app.use(courseRoutes);

// Authorization routes (signup, login, logout)
app.use(authRoutes);

// 404 page - if 404, set status to 404
app.get('/error404', (req, res) => {
  res.status(404).render('error404', {title: '404'});
});
//
