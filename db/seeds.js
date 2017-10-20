const mongoose = require('mongoose');
const { dbURI } = require('../config/environment');

mongoose.Promise = require('bluebird');
mongoose.connect(dbURI);

const User = require('../models/user');
const Post = require('../models/user');

User.collection.drop();

User
  .create({
    username: 'GWilman',
    email: 'george@george.com',
    password: 'password',
    passwordConfirmation: 'password'
  })
  .then((users) => {
    return Post
      .create({
        caption: 'What a banger.',
        videoURL: 'https://www.youtube.com/watch?v=GXTV4pYVk20',
        createdBy: users[0]
      });
  })
  .catch((err) => console.log(err))
  .finally(() => mongoose.connection.close());
