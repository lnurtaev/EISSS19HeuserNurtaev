var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');

var users = require('./routes/user');
var products = require('./routes/products');
var type = require('./routes/type');
var orders = require('./routes/orders');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/user', users);
app.use('/products', products);
app.use('/type', type);
app.use('/orders', orders);

module.exports = app;
