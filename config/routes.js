const express = require('express');
const router = express.Router();

const staticsController = require('../controllers/statics');
const sessionsController = require('../controllers/sessions');
const registrationsController = require('../controllers/registrations');
const postsController = require('../controllers/posts');
const notFoundController = require('../controllers/404');

const secureRoute = require('../lib/secureRoute');

// Home Route
router.route('/')
  .get(staticsController.home);

// About Route
router.route('/about')
  .get(staticsController.about);

// Index/Create Route
router.route('/posts')
  .get(postsController.index)
  .post(postsController.create);

// Show/Create/Delete Route
router.route('/posts/:id')
  .get(postsController.show)
  .put(secureRoute, postsController.update)
  .delete(secureRoute, postsController.delete);

// Edit Route
router.route('/posts/:id/edit')
  .get(secureRoute, postsController.edit);

// Login Routes
router.route('/login')
  .get(sessionsController.new)
  .post(sessionsController.create);

// Logout Routes
router.route('/logout')
  .get(sessionsController.delete);

// New User Routes
router.route('/register')
  .get(registrationsController.new)
  .post(registrationsController.create);

// Add Comment Route
router.route('/posts/:id/comments')
  .post(secureRoute, postsController.createComment);

// Delete Comment Route
router.route('/posts/:id/comments/:commentId')
  .delete(secureRoute, postsController.deleteComment);

// Catch All 404 Route
router.get('*')
  .get(notFoundController.notFound);

module.exports = router;
