const express = require('express');
const router = express.Router();

// const statics = require('../controllers/posts');

// Home Route
router.get('/', (req, res) => {
  res.render('statics/home');
});

// About Route
router.get('/about', (req, res) => {
  res.render('statics/about');
});

// Index Route
router.get('/posts', (req, res) => {
  res.render('posts/posts');
});

// Update Route
router.put('/posts', (req, res) => {
  res.send('Update!');
});

// Show Route
router.get('/posts/:id', (req, res) => {
  res.render('posts/show');
});

// Edit Route
router.get('/posts/:id/edit', (req, res) => {
  res.render('posts/edit');
});

// Delete Route
router.delete('/posts/:id', (req, res) => {
  res.send('Delete!');
});

// Catch All 404 Route
router.get('*', (req, res) => {
  res.render('statics/404');
});

module.exports = router;
