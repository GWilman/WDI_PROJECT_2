const express = require('express');
const router = express.Router();

const staticsController = require('../controllers/statics');
const sessionsController = require('../controllers/sessions');
const registrationsController = require('../controllers/registrations');


// Home Route
router.route('/')
  .get(staticsController.home);

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

// Login Routes
router.route('/login')
  .get(sessionsController.new)
  .post(sessionsController.create);

// New User Routes
router.route('/register')
  .get(registrationsController.new)
  .post(registrationsController.create);

// Catch All 404 Route
router.get('*', (req, res) => {
  res.render('statics/404');
});

module.exports = router;
