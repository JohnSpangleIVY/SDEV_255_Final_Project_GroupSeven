// Required modules and Schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// New Schema for classes
const classesSchema = new Schema {
  classname: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
}

const Classes = mongoose.model('Classes', classesSchema);
module.exports = Classes;
