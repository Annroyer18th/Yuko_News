var express = require("express");
const NewsController = require("../../controllers/admin/NewsController");
var NewsRouter = express.Router();
const multer = require("multer");
const upload = multer({ dest: "public/newsuploads/" }); //确定目标文件夹，没有则创建

//涉及文件上传，需要加multer中间件
NewsRouter.post(
  "/adminapi/news/add",
  upload.single("file"),
  NewsController.add
);
NewsRouter.get("/adminapi/news/list", NewsController.getList);
NewsRouter.post(
  "/adminapi/news/list",
  upload.single("file"),
  NewsController.updateList
);
//编辑新闻页面带id请求新闻信息
NewsRouter.get("/adminapi/news/list/:id", NewsController.getList);

NewsRouter.delete("/adminapi/news/list/:id", NewsController.delList);

NewsRouter.put("/adminapi/news/publish", NewsController.publish);
module.exports = NewsRouter;
