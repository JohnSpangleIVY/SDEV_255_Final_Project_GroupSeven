// Required modules
const User = require('../models/User');
const jwt = require('jsonwebtoken');


// Handle errors
const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = {email: '', password: ''};

  // If the email address is incorrect
  if (err.message === 'Incorrect Email') {
    errors.email = 'The email address that you have entered is incorrect.';
  }

  // If the password is incorrect
  if (err.message === 'Incorrect Password') {
    errors.password = 'The password you have entered is incorrect.';
  }

  // Duplicate error code
  if (err.code === 11000) {
    errors.email = 'The email address that you have entered has already been registered.';
    return errors;
  }

  // Validation errors
  if (err.message.includes('user validation failed')) {
    Object.values(err.errors).forEach(({properties}) => {
      errors[properties.path] = properties.message;
    })
  }

  return errors;
}


// Create JSON Web Token
const maxAge = 1 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({id}, 'This secret belongs to group seven... insert secret here ... do not tell it to anyone else!', {
    expiresIn: maxAge
  });
};


// List of functions: signup_get , signup_post , login_get , login_post , logout_get

// Signup functions
const signup_get = (req, res) => {
  res.render('signup', {title: "Sign Up"});
}

const signup_post = async (req, res) => {
  const {email, password, role} = req.body;

  try {
    const user = await User.create({email, password, role});
    const token = createToken(user._id);
    res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge * 1000});
    res.status(201).json({user: user._id, userrole: user.role});
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({errors});
  }
}

// Log In functions
const login_get = (req, res) => {
  res.render('login', {title: "Login"});
}

const login_post = async (req, res) => {
  const {email, password, role} = req.body;

  try {
    const user = await User.login(email, password, role);
    const token = createToken(user._id);
    res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge * 1000});
    res.status(200).json({user: user._id, userrole: user.role});
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({errors});
  }
}


// Log Out function
const logout_get = (req, res) => {
  res.cookie('jwt', '', {maxAge: 1});
  res.redirect('/');
}


// Export functions
module.exports = {
  signup_get,
  signup_post,
  login_get,
  login_post,
  logout_get
}
