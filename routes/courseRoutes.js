// Required modules
const express = require('express');
const Courses = require('../models/courses');

// Express router
const router = express.Router();


// Course-related routes
// All Courses page
router.get('/courses', (req, res) => {
  Courses.find()
    .then((result) => {
      res.render('courses', {title: 'All Courses', courses: result})
    })
    .catch((err) => {
      console.log(err);
    });
});

// Create a Course page
router.get('/course-create', (req, res) => {
  res.render('course-create', {title: 'Create a Course'});
})

// Individual/Selected Course :: GET  -  route
router.get('/courses/:id', (req, res) => {
  const id = req.params.id;
  Courses.findById(id)
    .then(result => {
      res.render('course-info', {course: result, title: 'Course Information'});
    })
    .catch((err) => {
      console.log(err);
    });
});

// Individual/Selected Course :: DELETE  -  route
router.delete('/courses/:id', (req, res) => {
  const id = req.params.id;
  Courses.findByIdAndDelete(id)
    .then(result => {
      res.json({redirect: '/courses'})
    })
    .catch((err) => {
      console.log(err);
    });
});

// Edit a Course page   [POSSIBLY SCRAP]
router.get('/course-edit', (req, res) => {
  res.render('course-edit', {title: 'Edit a Course'});
})

// Edit Individual/Selected Course :: GET  -  route   [POSSIBLY SCRAP]
router.get('/courses/:id', (req, res) => {
  const id = req.params.id;
  Courses.findById(id)
    .then(result => {
      res.render('course-edit', {course: result, title: 'Edit Course Information'});
    })
    .catch((err) => {
      console.log(err);
    });
});

// Create a course :: POST  -  route
router.post('/courses', (req, res) => {
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

// Export router
module.exports = router;
