// Required
const Courses = require('../models/courses');
const User = require('../models/User');


// List of functions:  shopping_cart_get ,

const shopping_cart_get = (req, res) => {
  res.render('user/shopping-cart', {title: 'My Shopping Cart'});
  /* userCourses = User.courses;
  userCourses.find()
    .then((result) => {
      res.render('courses/shopping-cart', {title: 'My Shopping Cart'});
    })
    .catch((err) => {
      console.log(err);
    })
  */
}

// Export router
module.exports = {
  shopping_cart_get
}
