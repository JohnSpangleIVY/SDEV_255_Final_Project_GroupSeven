// Server-side code

// Required modules for the server
const express = require("express"); // necessary web framework
// const fs = require("fs"); //   may not be needed anymore...? the tutorial videos suggest not
// const http = require("http"); //   may not be needed anymore...? the tutorial videos suggest not
const mongoose = require("mongoose"); // used for database-related things
const morgan = require("morgan"); // HTTP request logger middleware


// Express app
const app = express();


// Connect to MongoDB
const dbURI = 'mongodb+srv://testuser123:jt3QhYVIheU2WYLk@node-tuts.kjiohpd.mongodb.net/groupseven';  // need to see how we can handle multiple users; might be covered in next module?
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology:true})
  .then ((result) => app.listen(3000)) // 3000 can be changed to fit ones' needs
  .catch ((err) => console.log(err)); // log errors related to connecting


// Register the view engine (so we can use EJS files instead of HTML)
app.set("view engine", "ejs");


// Use middleware to access our CSS and JS, which are static files
app.use(express.static('public'));
app.use(express.urlencoded({extended:true})); // extended must be true!
app.use(morgan("dev"));


//
// Routes - work in progress
// Default to index.ejs aka Welcome page
app.get('/', (req, res) => {
  res.redirect('/index');
});

// Login page
app.get('/login', (req, res) => {
  res.render('login');
});

// 404 page - if 404, set status to 404
app.get('/error404', (req, res) => {
  res.status(404).render('error404');
});
