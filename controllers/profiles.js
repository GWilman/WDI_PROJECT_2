const User = require('../models/user');

function editRoute(req, res, next) {
  User
    .findById(req.params.id)
    .exec()
    .then((user) => {
      if(toString(user._id) !== toString(req.session.userId)) {
        return res.unauthorized('/posts', 'You do not have permission to edit that resource');
      }
      return res.render('profiles/edit', { user });
    })
    .catch(next);
}

function updateRoute(req, res, next) {
  User
    .findById(req.params.id)
    .exec()
    .then((user) => {
      if(!user) return res.notFound();
      for(const field in req.body) {
        user[field] = req.body[field];
      }
      return user.save();
    })
    .then(() => {
      req.flash('success', 'Profile updated!');
      res.redirect('/posts');
    })
    .catch((err) => {
      if(err.name === 'ValidationError') return res.badRequest(`/profiles/${req.params.id}/edit`, err.toString());
      next(err);
    });
}

module.exports = {
  edit: editRoute,
  update: updateRoute
};
