const passport = require('passport');

const User = require('../models/User');

passport.serializeUser((user, done) => {
  done(null, user.id)
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => done(err, user))
});

/**
 * Login Required middleware.
 */
exports.isAuthenticated = (req, res, next) => {
  console.log('check auth');
  if (req.isAuthenticated()) return next()
  res.redirect('/login');
};