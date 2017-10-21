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
    .populate('createdBy')
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

function createRoute(req, res, next) {
  req.body.createdBy = req.user;
  Post
    .create(req.body)
    .then(() => res.redirect('/posts'))
    .catch((err) => {
      if(err.name === 'ValidationError') return res.badRequest(`/posts/${req.params.id}/edit`, err.toString());
      next(err);
    });
}

function showRoute(req, res, next) {
  Post
    .findById(req.params.id)
    .populate('createdBy')
    .exec()
    .then((post) => {
      if(!post) return res.notFound();
      return res.render('posts/show', { post, youtubeParser });
    })
    .catch(next);
}

function editRoute(req, res, next) {
  Post
    .findById(req.params.id)
    .exec()
    .then((post) => {
      if(!post.belongsTo(req.user)) return res.unauthorized(`/posts/${post.id}`, 'You do not have permission to edit that resource');
      return res.render('posts/edit', { post, youtubeParser });
    })
    .catch(next);
}

function updateRoute(req, res, next) {
  Post
    .findById(req.params.id)
    .exec()
    .then((post) => {
      if(!post) return res.notFound();
      if(!post.belongsTo(req.user)) return res.unauthorized(`/posts/${post.id}`, 'You do not have permission to edit that resource');
      for(const field in req.body) {
        post[field] = req.body[field];
      }

      return post.save();
    })
    .then(() => res.redirect(`/posts/${req.params.id}`))
    .catch((err) => {
      if(err.name === 'ValidationError') return res.badRequest(`/posts/${req.params.id}/edit`, err.toString());
      next(err);
    });
}

function deleteRoute(req, res, next) {
  Post
    .findById(req.params.id)
    .exec()
    .then((post) => {
      if(!post) return res.notFound();
      if(!post.belongsTo(req.user)) return res.unauthorized(`/hotels/${post.id}`, 'You do not have permission to edit that resource');
      return post.remove();
    })
    .then(() => res.redirect('/posts'))
    .catch(next);
}

module.exports = {
  index: indexRoute,
  new: newRoute,
  create: createRoute,
  show: showRoute,
  edit: editRoute,
  update: updateRoute,
  delete: deleteRoute
};
