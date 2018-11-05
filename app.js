var express      = require('express');
var path         = require('path');
var favicon      = require('serve-favicon');
var logger       = require('morgan');
// var bodyParser   = require('body-parser');
// var cookieParser = require('cookie-parser');
//PROXY
var httpProxy    = require('http-proxy');

var app = express();

app.use(logger('dev'));


//PROXY TO API
const apiProxy = httpProxy.createProxyServer({
  // target:"http://127.0.0.1:3001"
  target:"http://localhost:3001"
});

app.use('/api', function(req, res){
  apiProxy.web(req, res);
})
// END PROXY


// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// app.use(logger('dev'));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'jade');


app.get('/about', (req, res) => {
  res.render('pages/about');
});

app.get('*', function(req, res){
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'))
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
