const User = require('../models/user');

function newRoute(req, res) {
  res.render('registrations/new');
}

function createRoute(req, res){
  User
    .create(req.body)
    .then((user) => {
      console.log(user);
      res.redirect('/');
    })
    .catch((err) => res.status(500).end(err));
}

module.exports = {
  new: newRoute,
  create: createRoute
};
