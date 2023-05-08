// Required modules
const User = require('../models/User');
const jwt = require('jsonwebtoken');


const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  // Check to see if JSON Web Token exists and verify it
  if (token) {
    jwt.verify(token, 'This secret belongs to group seven... insert secret here ... do not tell it to anyone else!', (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.redirect('/login');
      } else {
        console.log(decodedToken);
        next();
      }
    });
  } else {
    res.redirect('/login');
  }
}

// Check current user
const checkUser = (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, 'This secret belongs to group seven... insert secret here ... do not tell it to anyone else!', async (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.locals.user = null;
        next();
      } else {
        console.log(decodedToken);
        let user = await User.findById(decodedToken.id);
        res.locals.user = user;
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
}



// Export requireAuth function
module.exports = {requireAuth, checkUser};
