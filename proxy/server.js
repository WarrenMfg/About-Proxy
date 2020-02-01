const path = require('path');
const express = require('express');
const app = express();
const morgan = require('morgan');

app.use(morgan('dev'));

app.use('/:id', express.static(__dirname + '/public'));

app.listen(process.env.PORT || 314, console.log('Listening on port 314'));