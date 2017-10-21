const User = require('../models/user');

function authentication(req, res, next) {
  if (!req.session.isLoggedIn) return next();
  User
    .findById(req.session.userId)
    .then((user) => {
      if(!user) {
        return req.session.regenerate(() => {
          req.flash('danger', 'You must be logged in.');
          res.redirect('/');
        });
      }
      req.session.userId = user._id;
      res.locals.user = user;
      res.locals.isLoggedIn = true;
      req.user = user;
      next();
    });
}

module.exports = authentication;
