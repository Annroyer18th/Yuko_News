var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
const UserRouter = require("./routes/admin/UserRouter");
const NewsRouter = require("./routes/admin/NewsRouter");
const WebNewsRouter = require("./routes/web/NewsRouter");
const ProductRouter = require("./routes/admin/ProductRouter");
const JWT = require("./util/JWT");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use(WebNewsRouter);

/*
API分类
webapi 官网用的
adminapi  后台系统用的

该注释上面的router不经过token验证
该注释下面的router要经过token验证才运行

*/

//中间件，在引入api前检测token
app.use((req, res, next) => {
  //如果token有效，放行；
  //如果token过期，返回401错误
  if (req.url === "/adminapi/user/login") {
    next();
    return;
  } //进入登录页面(未登录无token)，直接放行

  //如果是请求home的话
  const token = req.headers["authorization"].split(" ")[1]; //取出token，数组方法,以元素为区分分割字符串为字符数组
  if (token) {
    //console.log(token);
    var payload = JWT.verify(token); //使用JWT，解密验证token值，返回bool值
    //console.log(payload);
    if (payload) {
      //如果token值有效,更新token值（保证用户登录状态下不会因为token到期而被强制退出），放行
      const newToken = JWT.generate(
        { _id: payload._id, username: payload.username },
        "1d" //token保存一天
      ); //更新token
      res.header("Authorization", newToken);
      next();
    } else {
      res.status(401).send({ errCode: "-1", errorInfo: "token过期了喵" });
    }
  }
});

//引入后端api
app.use(UserRouter);
app.use(NewsRouter);
app.use(ProductRouter);

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
