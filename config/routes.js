const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('statics/index');
});

router.get('/about', (req, res) => {
  res.render('statics/about');
});

router.get('/posts', (req, res) => {
  res.send('posts/posts.ejs');
});

router.get('*', (req, res) => {
  res.status(404).send('404!');
});

module.exports = router;
