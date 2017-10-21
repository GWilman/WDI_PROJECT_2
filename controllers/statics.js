function home(req, res) {
  res.render('statics/home');
}

function about(req, res) {
  res.render('statics/about');
}

module.exports = {
  home: home,
  about: about
};
