const mongoose = require('mongoose');
const { dbURI } = require('../config/environment');

mongoose.Promise = require('bluebird');
mongoose.connect(dbURI, { useMongoClient: true });

const User = require('../models/user');
const Post = require('../models/post');

User.collection.drop();
Post.collection.drop();

User
  .create([{
    username: 'GWilman',
    email: 'george@george.com',
    imageURL: 'https://pbs.twimg.com/profile_images/910460746022182912/RmWoku_Z_400x400.jpg',
    password: 'password',
    passwordConfirmation: 'password'
  }, {
    username: 'ChrisD',
    email: 'chris@chris.com',
    imageURL: 'https://media-exp1.licdn.com/media/p/5/000/239/0b5/030b17a.jpg',
    password: 'password',
    passwordConfirmation: 'password'
  }, {
    username: 'JDono',
    email: 'james@james.com',
    imageURL: 'https://media-exp1.licdn.com/media/AAEAAQAAAAAAAAU0AAAAJDllZDJjOTFiLTc1MDktNGU4OS05NGVkLWU1YzYxNzZiYTUzZg.jpg',
    password: 'password',
    passwordConfirmation: 'password'
  }])
  .then((users) => {
    console.log(`${users.length} users created`);
    return Post
      .create([{
        caption: 'Big tune.',
        videoURL: 'https://www.youtube.com/watch?v=GXTV4pYVk20',
        createdBy: users[0]
      }, {
        caption: 'This album is great.',
        videoURL: 'https://www.youtube.com/watch?v=J1kzMFnFSh0',
        createdBy: users[1],
        comments: [{
          content: 'Love it.',
          createdBy: users[2]
        }]
      }, {
        caption: 'Old but still great.',
        videoURL: 'https://www.youtube.com/watch?v=J1kzMFnFSh0',
        createdBy: users[1],
        comments: [{
          content: 'Belter',
          createdBy: users[0]
        }]
      }, {
        caption: 'Four tet magic',
        videoURL: 'https://www.youtube.com/watch?v=E6wllpw5udk&feature=youtu.be',
        createdBy: users[2],
        comments: [{
          content: 'Very nice',
          createdBy: users[1]
        }]
      }]);
  })
  .catch((err) => console.log(err))
  .finally(() => mongoose.connection.close());
