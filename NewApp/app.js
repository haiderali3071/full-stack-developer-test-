var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var dotenv = require('dotenv')
const mongoose = require('mongoose')


dotenv.config({ path: path.resolve(__dirname, './.env') })


var authRouter = require('./app_server/routes/auth');
var catRouter = require('./app_server/routes/category');

var app = express();
 
// view engine setup 
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));    

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/auth', authRouter);
app.use('/load_categories', catRouter);
 
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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

global.sendResponse = (res, code, json) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.status(code)
  res.json(json)
}
 
mongoose.connect(process.env.DB_PATH,(err)=>{
   if(err){
     console.error(err)
   }
})

module.exports = app;
