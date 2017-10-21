function notFound(req, res) {
  res.render('statics/404');
}

module.exports = {
  notFound: notFound
};
