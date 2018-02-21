const express         = require('express');
const morgan          = require('morgan');
const mongoose        = require('mongoose');
const bodyParser      = require('body-parser');
const router          = require('./config/routes');
const authentication  = require('./lib/authentication');
const errorHandler    = require('./lib/errorHandler');
const customResponses = require('./lib/customResponses');
const expressLayouts  = require('express-ejs-layouts');
const session         = require('express-session');
const flash           = require('express-flash');
const methodOverride  = require('method-override');

const app = express();

const { port, dbURI, secret } = require('./config/environment');

app.use(morgan('dev'));

app.use(expressLayouts);
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.Promise = require('bluebird');
mongoose.connect(dbURI, { useMongoClient: true });

app.set('views', `${__dirname}/views`);
app.set('view engine', 'ejs');

app.use(express.static(`${__dirname}/public`));

app.use(session({
  secret: secret,
  resave: false,
  saveUninitialized: false
}));

app.use(flash());

app.use(customResponses);
app.use(bodyParser.urlencoded({ extended: true }));

app.use(methodOverride(function (req) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    const method = req.body._method;
    delete req.body._method;
    return method;
  }
}));

app.use(authentication);
app.use(errorHandler);
app.use(router);

// Start it up!
app.listen(port, () => console.log('Express is up and running'));
