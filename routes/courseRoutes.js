// Required modules
const express = require('express');
const courseController = require('../controllers/courseController');

// Required routes
const courseRoutes = require('../routes/courseRoutes');

// Express router
const router = express.Router();


// Course-related routes
// All Courses page
router.get('/courses', courseController.course_all);

// Create a Course page :: GET
router.get('/course-create', courseController.course_create_get)

// Individual/Selected Course :: GET
router.get('/courses/:id', courseController.course_info);

// Individual/Selected Course :: DELETE
router.delete('/courses/:id', courseController.course_delete);

// Create a course :: POST  -  route
router.post('/courses', courseController.course_create_post);


/* Possibly scrap - need to decided later ... edit functionality may be added to the course-info page instead

Edit a Course page   [POSSIBLY SCRAP]
router.get('/course-edit', (req, res) => {
  res.render('course-edit', {title: 'Edit a Course'});
})

Edit Individual/Selected Course :: GET  -  route   [POSSIBLY SCRAP]
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
*/

// end of course-related routes

// Export router
module.exports = router;
