const express      = require('express');
// var path = require('path');
// var favicon = require('serve-favicon');
const logger       = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser   = require('body-parser');
const session      = require('express-session');
const MongoStore   = require('connect-mongo')(session);

const app = express();


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


// APIs
const mongoose = require('mongoose');
const databaseUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/bookshop';

mongoose.connect(databaseUri, { useNewUrlParser: true })
  .then(() => console.log("DB connected"))
  .catch(err => console.log(`DB connection error: ${err.message}`));


// --->>> SET UP SESSIONS <<<---
const db = mongoose.connection;
db.on('error', console.error.bind(console, '# MongoDB - connection error: '));

app.use(session({
  secret: 'mySecretString',
  saveUninitialized: false,
  resave: false,
  cookie: { maxAge: 1000 * 60 * 60 * 24 * 2 },
  store: new MongoStore({ mongooseConnection: db, ttl: 2 * 24 * 60 * 60 })
  // time to leave: 2d * 24h * 60m * 60s
}));


// Save session cart API
app.post('/cart', (req, res) => {
  const cart = req.body;
  req.session.cart = cart;
  req.session.save(err => {
    if(err) {
      throw err;
    }
    res.json(req.session.cart);
  })
});

// GET session cart API
app.get('/cart', (req, res) => {
  if(typeof req.session.cart !== 'undefined') {
    res.json(req.session.cart);
  }
});
// --->>> EDN SESSION SET UP <<<---


var Books = require('./models/books.js');

// POST books
app.post('/books', function(req, res) {
  var book = req.body;

  Books.create(book, function(err, books) {
    if (err) {
      throw err;
    }
    res.json(books);
  });
});

// GET books
app.get('/books', (req, res) => {
  Books.find(function(err, books) {
    if (err) {
      throw err;
    }
    res.json(books);
  });
});

// DELETE books
app.delete('/books/:_id', function(req, res) {
  var query = { _id: req.params._id };

  Books.remove(query, function(err, books) {
    if (err) {
      console.log("# API DELETE BOOKS", err);
    }
    res.json(books);
  });
});

// UPDATE books
app.put('/books/:_id', function(req, res) {
  var book = req.body;
  var query = { _id: req.params._id };

  // if the field does not exist $set will set a new field
  var update = {
    '$set': {
      title: book.title,
      description: book.description,
      image: book.image,
      price: book.price
    }
  };

  // when true, returns the updated document
  var options = {new: true};

  Books.findOneAndUpdate(query, update, options, function(err, books) {
    if (err) {
      throw err;
    }
    res.json(books);
  });
});

// --->>> GET BOOKS IMAGES API <<<---
app.get('/images', (req, res) => {
  const imgFolder = __dirname + '/public/images/';
  // require file system
  const fs = require('fs');
  // read all files in the directory
  fs.readdir(imgFolder, (err, files) => {
    if(err) {
      return console.error(err);
    }
    // create an empty arr
    const filesArr = [];
    files.forEach(file => {
      filesArr.push({ name: file });
    });
    // send the json response with the arr
    res.json(filesArr);
  })
});

// END APIs


app.listen(3001, function(err){
  if(err){
    return console.log(err);
  }
  console.log('API Sever is listening on http://localhost:3001');
});