const User = require('../models/user');
const Post = require('../models/post');

function youtubeParser(url) {
  const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match&&match[2].length === 11) ? match[2] : false;
}

function addRoute(req, res, next) {
  const user = req.user;
  Post
    .findById(req.params.id)
    .exec()
    .then((post) => {
      if(!post) return res.notFound();
      user.userPlaylist.push(post);
      return user.save();
    })
    .then(user => {
      req.flash('info', 'Post added to your playlist!');
      console.log(user.userPlaylist);
      res.redirect('/posts');
    })
    .catch(next);
}

function showRoute(req, res) {
  console.log(req.user);
  return res.render('playlists/show', { user: req.user, youtubeParser });
}

function removeRoute(req, res) {

}

module.exports = {
  add: addRoute,
  show: showRoute,
  remove: removeRoute
};
