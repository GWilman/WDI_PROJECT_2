// const User = require('User');
const Post = require('../models/post');

function youtubeParser(url) {
  const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match&&match[2].length === 11) ? match[2] : false;
}

function indexRoute(req, res) {
  Post
    .find()
    .exec()
    .then(posts => {
      console.log(posts);
      res.render('posts/posts', { posts, youtubeParser });
    })
    .catch(err => {
      res.status(500).end(err);
    });
}

function newRoute(req, res) {
  res.render('posts/new');
}

function createRoute(req, res) {
  Post
    .create(req.body)
    .then(() => {
      res.redirect('/posts');
    });
}
// req.body.createdBy = req.user;
// Post
//   .create(req.body)
//   .then(() => res.redirect('/posts'))
//   .catch((err) => {
//     if(err.name === 'ValidationError') return res.badRequest('/posts/new', err.toString());
//     next(err);
//   });
// }

function showRoute(req, res) {
  res.render('posts/show');
}

function editRoute(req, res, next) {
  Post
    .findById(req.params.id)
    .exec()
    .then((post) => {
      if(!post.belongsTo(req.user)) return res.unauthorized(`/posts/${post.id}`, 'You do not have permission to edit that resource');
      return res.render('posts/edit', { post });
    })
    .catch(next);
}

function updateRoute(req, res) {
  res.send('Update!');
}

function deleteRoute(req, res) {
  res.send('Delete!');
}

module.exports = {
  index: indexRoute,
  new: newRoute,
  create: createRoute,
  show: showRoute,
  edit: editRoute,
  update: updateRoute,
  delete: deleteRoute
  // createComment: createCommentRoute,
  // deleteComment: deleteCommentRoute
};
