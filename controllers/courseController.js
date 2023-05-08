// Required
const Courses = require('../models/courses');


// List of functions: course_all , course_info , course_create_get , course_create_post , course_delete

const course_all = (req, res) => {
  Courses.find()
    .then((result) => {
      res.render('courses/courses', {title: 'All Courses', courses: result})
    })
    .catch((err) => {
      console.log(err);
    })
}

const course_info = (req, res) => {
  const id = req.params.id;
  Courses.findById(id)
    .then(result => {
      res.render('courses/course-info', {course: result, title: 'Course Information'});
    })
    .catch((err) => {
      console.log(err);
    });
}

const course_create_get = (req, res) => {
  res.render('courses/course-create', {title: 'Create a Course'});
}

const course_create_post = (req, res) => {
  const course = new Courses(req.body);
  course.save()
    .then((result) => {
      res.redirect('/courses')
    })
    .catch((err) => {
      console.log(err);
    });
}

const course_delete = (req, res) => {
  const id = req.params.id;
  Courses.findByIdAndDelete(id)
    .then(result => {
      res.json({redirect: '/courses'})
    })
    .catch((err) => {
      console.log(err);
    });
}


// Export functions
module.exports = {
  course_all,
  course_info,
  course_create_get,
  course_create_post,
  course_delete
}
