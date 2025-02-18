var express = require("express");
const NewsController = require("../../controllers/web/NewsController");
var NewsRouter = express.Router();

//涉及文件上传，需要加multer中间件

NewsRouter.get("/webapi/news/list", NewsController.getList);
NewsRouter.get("/webapi/news/list/:id", NewsController.getList);
NewsRouter.get("/webapi/news/recommend", NewsController.getRecommend);

module.exports = NewsRouter;
