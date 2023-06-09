// Required modules and Schema
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { isEmail } = require('validator');
const Schema = mongoose.Schema;

// New Schema for users
const userSchema = new Schema ({
  email: {
    type: String,
    required: [true, 'Please enter an email address.'],
    unique: true,
    lowercase: true,
    validate: [isEmail, 'Please enter a valid email address.']
  },
  password: {
    type: String,
    required: [true, 'Please enter a password. Your password needs to be at least 10 characters in length.'],
    minlength: [10, 'Your password needs to be at least 10 characters in length.']
  },
  role: {
    type: String,
    required: [true, 'Please select if you are a student or a teacher.']
  },
  schedule: {
  },
  courses: {
  }
});

// Fire a function BEFORE the document has been saved to the database
// Hash the user's password
userSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
})

// Static method to login the user
userSchema.statics.login = async function (email, password, role) {
  const user = await this.findOne({email});
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error('Incorrect Password')
  }
  throw Error('Incorrect Email');
}


// Export
const User = mongoose.model('user', userSchema);
module.exports = User;
