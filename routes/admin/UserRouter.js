var express = require("express");
const UserController = require("../../controllers/admin/UserController");
var UserRouter = express.Router();
const multer = require("multer");
const upload = multer({ dest: "public/avataruploads/" }); //确定目标文件夹，没有则创建

UserRouter.post("/adminapi/user/login", UserController.login);
UserRouter.post(
  "/adminapi/user/upload",
  upload.single("file"),
  UserController.upload
);
UserRouter.post(
  "/adminapi/user/add",
  upload.single("file"),
  UserController.add
);

//进入编辑界面时，获取所有用户信息
UserRouter.get("/adminapi/user/list", UserController.getList);

//点击编辑用户时，传入id值，根据id拿到用户信息，显示在编辑表上，要包含密码
UserRouter.get("/adminapi/user/list/:id", UserController.getList);

//列表中编辑用户后数据库对应用户信息
UserRouter.put("/adminapi/user/list/:id", UserController.putList);

//删除用户操作，前端带携带id信息才能访问,:idb表示占位符
UserRouter.delete("/adminapi/user/list/:id", UserController.delList);

/* 回调函数基础模版. */
/*
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});*/

module.exports = UserRouter;
