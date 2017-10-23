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
  // const user = req.user;
  //
  // User
  //   .find({'req.params.id': {$in: user.userPlaylist}})
  //   .then((track) => {
  //     // console.log(user.userPlaylist);
  //     // const song = user.userPlaylist.findById(req.params.id);
  //     console.log(track);
  //     // req.flash('info', 'Post deleted from your playlist!');
  //     // res.redirect('/posts');
  //   })
  //   .catch(next);
}

module.exports = {
  add: addRoute,
  show: showRoute,
  remove: removeRoute
};
