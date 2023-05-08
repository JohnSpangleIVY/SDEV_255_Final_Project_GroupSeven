// Required modules
const User = require('../models/User');


// Handle errors
const handleErrors = (err) => {
  console.log(err.message, err.code);
  let error = {email: '', password: ''};

  // Duplicate error code
  if (err.code === 11000) {
    errors.email = 'The email address that you have entered has already been registered.';
    return errors;
  }

  // Validation errors
  if (err.message.includes('user validation failed')) {
    Object.values(err.errors).forEach(({properties}) => {
      error[properties.path] = properties.message;
    })
  }

  return errors;
}

// List of functions: signup_get , signup_post , login_get , login_post , logout_get

// Signup functions
const signup_get = (req, res) => {
  res.render('signup', {title: "Sign Up"});
}

const signup_post = async (req, res) => {
  const {email, password} = req.body;

  try {
    const user = await User.create({email, password});
    res.status(201).json(user);
  } catch (err) {
    console.log(err);
    res.status(400).json({errors});
  }
}

// Login functions
const login_get = (req, res) => {
  res.render('login', {title: "Login"});
}

const login_post = async (req, res) => {
  const {email, password} = req.body;

  console.log(email, password);
  res.send('user login');
}

// Logout function
const logout_get = (req, res) => {

}

// Export functions
module.exports = {
  signup_get,
  signup_post,
  login_get,
  login_post,
  logout_get
}
