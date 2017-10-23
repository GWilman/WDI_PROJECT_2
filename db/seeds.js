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
        caption: 'This album is great.',
        videoURL: 'https://www.youtube.com/watch?v=J1kzMFnFSh0',
        createdBy: users[1],
        comments: [{
          content: 'Love it.',
          createdBy: users[2]
        }, {
          content: 'Agreed, was listening to this the other day.',
          createdBy: users[0]
        }, {
          content: 'Playing soon in London, should get tickets.',
          createdBy: users[1]
        }]
      }, {
        caption: 'Big tune.',
        videoURL: 'https://www.youtube.com/watch?v=GXTV4pYVk20',
        createdBy: users[0]
      }, {
        caption: 'Four tet magic.',
        videoURL: 'https://www.youtube.com/watch?v=E6wllpw5udk&feature=youtu.be',
        createdBy: users[2],
        comments: [{
          content: 'Very nice.',
          createdBy: users[1]
        }]
      }, {
        caption: 'Bit of Aretha...',
        videoURL: 'https://www.youtube.com/watch?v=EFTWYAmgxcM',
        createdBy: users[1],
        comments: [{
          content: 'Belter',
          createdBy: users[0]
        }]
      }, {
        caption: 'Heard this one yet? It\'s great.',
        videoURL: 'https://www.youtube.com/watch?v=NLLDQ_K6fCE',
        createdBy: users[0],
        comments: [{
          content: 'Yes yes.',
          createdBy: users[2]
        }, {
          content: 'Really nice.',
          createdBy: users[0]
        }]
      }, {
        caption: 'Best youtube music vid ever.',
        videoURL: 'https://www.youtube.com/watch?v=OxMJvdC9yoc',
        createdBy: users[1],
        comments: [{
          content: 'Haha so good.',
          createdBy: users[0]
        }]
      }, {
        caption: 'Vibes.',
        videoURL: 'https://www.youtube.com/watch?v=7Ej6g3KhinM',
        createdBy: users[2],
        comments: [{
          content: 'Enjoying this one.',
          createdBy: users[0]
        }]
      }, {
        caption: 'Here\'s that one from the end of Saturday night',
        videoURL: 'https://www.youtube.com/watch?v=8tKKNV5sXUs',
        createdBy: users[2],
        comments: [{
          content: 'Yes! Great find.',
          createdBy: users[1]
        }]
      }, {
        caption: 'One of my favourites at the moment.',
        videoURL: 'https://www.youtube.com/watch?v=NckpLXj5q7s',
        createdBy: users[1]
      }]);
  })
  .catch((err) => console.log(err))
  .finally(() => mongoose.connection.close());
