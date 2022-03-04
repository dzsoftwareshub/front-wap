const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const multer = require("multer");
const multipart = multer().none();

const indexRouter = require("./routes/index.routes");
const signupRouter = require("./routes/signup.routes");
const companyRouter = require("./routes/company.routes");
const userRouter = require("./routes/user.routes");


const tokenService = require("./services/token.service");

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(multipart);

app.use("/",indexRouter);
app.use("/api/signup",signupRouter);


// implementing api security
app.use(async (request,response,next)=>{
  const token = await tokenService.verifyToken(request);
  if(token.isVerified){
    // user is valid
    next();
  }
  else{
    response.status(401);
    response.json({
      message: "Permision Denied"
    });
  }
});
app.use("/api/private/company",companyRouter);
app.use("/api/private/user",userRouter);

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

module.exports = app;
