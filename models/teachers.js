// Required modules and Schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// New Schema for teachers
const teachersSchema = new Schema ({
  teachername: {
    type: String,
    required: true
  },
  instructing: {
  }
});

const Teachers = mongoose.model('Teachers', teachersSchema);
module.exports = Teachers;
