const express        = require('express');
const morgan         = require('morgan');
const mongoose       = require('mongoose');
// const bodyParser = require("body-parser");
const port           = process.env.PORT || 3000;
const router         = require('./config/routes');
const dbURI          = process.env.MONGODB_URI || 'mongodb://localhost/p-cont';
const expressLayouts = require('express-ejs-layouts');

const app = express();

// Logging middleware
app.use(morgan('dev'));

app.use(expressLayouts);

mongoose.Promise = require('bluebird');
mongoose.connect(dbURI, { useMongoClient: true });

// Set the view directory to /views
app.set('views', `${__dirname}/views`);
app.set('view engine', 'ejs');

app.use(router);

// Start it up!
app.listen(port, () => console.log('Express is up and running'));
