const express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser');

let app = express();
app.use(cors());

app.use(bodyParser.urlencoded({extended : true}))
.use(bodyParser.json());

require('./configs/database');

const usersController = require('./controllers/usersController');
app.use('/api/users', usersController);

const moviesController = require('./controllers/moviesController');
app.use('/api/movies', moviesController);

const membersController = require('./controllers/membersController');
app.use('/api/members', membersController);

const subscriptionsController = require('./controllers/subscriptionsController');
app.use('/api/subscriptions', subscriptionsController);


app.listen(8000);
console.log("server is up and running...");