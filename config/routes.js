const express = require('express');
const router = express.Router();

const staticsController = require('../controllers/statics');
const sessionsController = require('../controllers/sessions');
const registrationsController = require('../controllers/registrations');
const profilesController = require('../controllers/profiles');
const postsController = require('../controllers/posts');
const playlistsController = require('../controllers/playlists');
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
  .get(secureRoute, postsController.index)
  .post(secureRoute, postsController.create);

// Update/Delete Route
router.route('/posts/:id')
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

// Edit User Route
router.route('/profiles/:id/edit')
  .get(secureRoute, profilesController.edit);

// Update User Route
router.route('/profiles/:id')
  .put(secureRoute, profilesController.update);

// Add Comment Route
router.route('/posts/:id/comments')
  .post(secureRoute, postsController.createComment);

// Delete Comment Route
router.route('/posts/:id/comments/:commentId')
  .delete(secureRoute, postsController.deleteComment);

// Add to Playlist Route
router.route('/playlist/:id/add')
  .get(secureRoute, playlistsController.add);

// Remove from playlist route
router.route('/playlist/:id/remove')
  .get(secureRoute, playlistsController.remove);

// Show Playlist Route
router.route('/playlist')
  .get(secureRoute, playlistsController.show);

// Catch All 404 Route
router.route('*')
  .get(notFoundController.notFound);

module.exports = router;
