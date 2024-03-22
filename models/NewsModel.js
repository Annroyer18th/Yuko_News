const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//user模型===》users集合

const NewsType = {
  title: String,
  content: String,
  category: Number, //类别， 1.新番，2.动画库，3通知公告
  cover: String, //封面
  isPublish: Number, //发布状态，0.未发布，1.已发布
  editTime: Date, //编辑时间
};
const NewsModel = mongoose.model("news", new Schema(NewsType));

module.exports = NewsModel;
