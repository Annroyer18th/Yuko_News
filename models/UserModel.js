const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//user模型===》users集合

const UserType = {
  username: String,
  password: String,
  gender: Number, //性别，0女1男
  introduction: String, //简介
  avatar: String, //头像
  role: Number, //1管理员，2编辑
};
const UserModel = mongoose.model("user", new Schema(UserType));

module.exports = UserModel;
