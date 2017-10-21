const express         = require('express');
const morgan          = require('morgan');
const mongoose        = require('mongoose');
const bodyParser      = require('body-parser');
const router          = require('./config/routes');
const expressLayouts  = require('express-ejs-layouts');
const session         = require('express-session');
const User            = require('./models/user');
// const methodOverride = require('method-override');

const app = express();

const { port, dbURI, secret } = require('./config/environment');

// Logging middleware
app.use(morgan('dev'));

app.use(expressLayouts);
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.Promise = require('bluebird');
mongoose.connect(dbURI, { useMongoClient: true });

// Set the view directory to /views
app.set('views', `${__dirname}/views`);
app.set('view engine', 'ejs');

app.use(session({
  secret: secret,
  resave: false,
  saveUninitialized: false
}));

app.use((req, res, next) => {
  if (!req.session.userId) return next();
  User
    .findById(req.session.userId)
    .then((user) => {
      if(!user) {
        return req.session.regenerate(() => {
          res.redirect('/');
        });
      }
      req.session.userId = user._id;
      res.locals.user = user;
      res.locals.isLoggedIn = true;
      next();
    });
});

app.use(router);

// Start it up!
app.listen(port, () => console.log('Express is up and running'));
