// Required modules and Schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// New Schema for students
const studentsSchema = new Schema ({
  studentname: {
    type: String,
    required: true
  },
  schedule: {
  }
});

const Students = mongoose.model('Students', studentsSchema);
module.exports = Students;
