require("dotenv").config();
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require('cors')

const indexRouter = require("./src/routes/index");
const dbConnection = require("./src/lib/mongo.connection");
const { expressjwt: expressJwt } = require("express-jwt");
const { response } = require('./src/common/response')
const UserSession = require("./src/models/userSession");
const authRouter = require('./src/routes/auth/auth')
const userRouter = require('./src/routes/auth/user')
const categoryRouter = require('./src/routes/category')
const productRouter = require('./src/routes/product')
const tableRouter = require('./src/routes/table')
const dailySellRouter = require('./src/routes/dailySell')
const invoiceRouter = require('./src/routes/invoice')
const roleBaseRouter = require('./src/routes/auth/role-base/create-user')
const firebase= require('./src/lib/firebase.storage')
const app = express();

// db connection start
dbConnection();

firebase()

//cors origin 
app.use(cors({
  origin: '*'
}));
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));


const WHITE_LIST_URL = [
  "/auth/signup",
  "/auth/login",
];

const jwt = () => {
  return expressJwt({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"],
  }).unless({ path: WHITE_LIST_URL });
};

const auth = async (req, res, next) => {
  if (WHITE_LIST_URL.indexOf(req.originalUrl) >= 0) {
    return next();
  }
  const token = req.get("authorization").split(" ")[1];
  const user = await UserSession.findOne({ token });
  !user ? next(createError.Unauthorized()) : next();
};
// role check 

const role = function(role){
  return (req,res,next)=>{
    const roleUser = req.auth.role
    if(roleUser!=role){
      return res.status(401).send(response(`Unauthorized!!, only for ${role}`))
    }
    next()
  }
}

app.use("/", indexRouter);
app.use("/auth", jwt(), auth, authRouter)
app.use("/auth", jwt(), auth, role('ADMIN'), roleBaseRouter)
app.use("/auth", jwt(), auth, userRouter)
app.use("/store", jwt(), auth, categoryRouter)
app.use("/store", jwt(), auth, productRouter)
app.use('/store', jwt(), auth, tableRouter)
app.use("/store", jwt(), auth, dailySellRouter)
app.use("/store", jwt(), auth, invoiceRouter)
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
