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
    .then(() => {
      req.flash('info', 'Post added to your playlist!');
      res.redirect('/posts');
    })
    .catch(next);
}

function showRoute(req, res) {
  return res.render('playlists/show', { user: req.user, youtubeParser });
}

// DOESN'T WORK
function removeRoute(req, res, next) {
  console.log(req.params.id);
  const user = req.user;
  User
    .findById(user.id)
    .then((user) => {
      const track = user.userPlaylist.find(song => song._id == req.params.id);
      user.userPlaylist.splice(user.userPlaylist.indexOf(track), 1);
      user.save();
      req.flash('info', 'Post deleted from your playlist!');
      res.redirect('/posts');
    })
    .catch(next);
}

module.exports = {
  add: addRoute,
  show: showRoute,
  remove: removeRoute
};
