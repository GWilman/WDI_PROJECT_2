// const User = require('User');
// const Post = require('Post');

function indexRoute(req, res) {
  res.render('posts/posts');
}

function createRoute(req, res) {
  res.send('Create!');
}

function showRoute(req, res) {
  res.render('posts/show');
}

function editRoute(req, res) {
  res.render('/posts/:id/edit');
}

function updateRoute(req, res) {
  res.send('Update!');
}

function deleteRoute(req, res) {
  res.send('Delete!');
}

module.exports = {
  index: indexRoute,
  create: createRoute,
  show: showRoute,
  edit: editRoute,
  update: updateRoute,
  delete: deleteRoute
  // createComment: createCommentRoute,
  // deleteComment: deleteCommentRoute
};
