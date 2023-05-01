// Required modules and Schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// New Schema for courses
const coursesSchema = new Schema ({
  coursename: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  subjectarea: {
    type: String,
    required: true
  },
  credithours: {
    type: Number,
    required: true
  }
});

const Courses = mongoose.model('Courses', coursesSchema);
module.exports = Courses;
