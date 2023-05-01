// Server-side code

// Required modules for the server
const express = require('express'); // necessary web framework
const morgan = require('morgan'); // HTTP request logger middleware
const mongoose = require('mongoose'); // used for database-related things
const Courses = require('./models/courses');
const Students = require('./models/students');
const Teachers = require('./models/teachers');

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
app.use(express.urlencoded({extended:true})); // must use this in order to get data from forms
app.use(morgan('dev'));


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

// Course-related routes
// All Courses page
app.get('/courses', (req, res) => {
  Courses.find()
    .then((result) => {
      res.render('courses', {title: 'All Courses', courses: result})
    })
    .catch((err) => {
      console.log(err);
    });
});

// Create a Course page
app.get('/course-create', (req, res) => {
  res.render('course-create', {title: 'Create a Course'});
})

// Individual/Selected Course :: GET  -  route
app.get('/courses/:id', (req, res) => {
  const id = req.params.id;
  Courses.findById(id)
    .then(result => {
      res.render('course-info', {course: result, title: 'Course Information'});
    })
    .catch((err) => {
      console.log(err);
    });
});

// Edit or Delete a Course page
app.get('/course-edit', (req, res) => {
  res.render('course-edit', {title: 'Edit a Course'});
})

// Create a course :: POST  -  route
app.post('/courses', (req, res) => {
  const course = new Courses(req.body);
  course.save()
    .then((result) => {
      res.redirect('/courses')
    })
    .catch((err) => {
      console.log(err);
    });
});

/* may or may not need this anymore
// Individual-Selected Course page
app.get('/course-info', (req, res) => {
  res.render('course-info', {title: 'Course Information'});
});
*/

// end of course-related routes

// 404 page - if 404, set status to 404
app.get('/error404', (req, res) => {
  res.status(404).render('error404', {title: '404'});
});
