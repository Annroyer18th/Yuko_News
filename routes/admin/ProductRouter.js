var express = require("express");
const ProductController = require("../../controllers/admin/ProductController");
var ProductRouter = express.Router();
const multer = require("multer");
const upload = multer({ dest: "public/productuploads/" }); //确定目标文件夹，没有则创建

//涉及文件上传，需要加multer中间件
ProductRouter.post(
  "/adminapi/product/add",
  upload.single("file"),
  ProductController.add
);
ProductRouter.get("/adminapi/product/list", ProductController.getList);
//编辑商品更新对应商品
ProductRouter.post(
  "/adminapi/product/list",
  upload.single("file"),
  ProductController.updateList
);
//编辑商品页面带id请求商品信息
ProductRouter.get("/adminapi/product/list/:id", ProductController.getList);

ProductRouter.delete("/adminapi/product/list/:id", ProductController.delList);

// NewsRouter.put("/adminapi/news/publish", NewsController.publish);
module.exports = ProductRouter;
