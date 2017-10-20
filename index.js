const express    = require('express');
const morgan     = require('morgan');
// const bodyParser = require("body-parser");
// const port       = process.env.PORT || 3000;
const router     = require('./config/routes');

const app = express();

// Logging middleware
app.use(morgan('dev'));

// Set the view directory to /views
app.set('views', `${__dirname}/views`);
app.set('view engine', 'ejs');

app.use(router);

// Start it up!
app.listen(3000, () => console.log('Express is up and running'));
