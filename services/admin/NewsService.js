const NewsModel = require("../../models/NewsModel");

const NewsService = {
  add: async ({ title, content, category, cover, isPublish, editTime }) => {
    //console.log("数据库模型处理");
    return NewsModel.create({
      title,
      content,
      category,
      cover,
      isPublish,
      editTime,
    });
  },

  getList: async ({ _id }) => {
    console.log(_id);
    return _id ? NewsModel.find({ _id }) : NewsModel.find({});
  },

  updateList: async ({
    _id,
    title,
    content,
    category,
    cover,
    isPublish,
    editTime,
  }) => {
    //console.log("数据库模型处理");
    //如果cover非空则更新
    if (cover) {
      return NewsModel.updateOne(
        { _id },
        { title, content, category, cover, isPublish, editTime }
      );
    } else {
      return NewsModel.updateOne(
        { _id },
        { title, content, category, isPublish, editTime }
      );
    }
  },

  delList: async ({ _id }) => {
    console.log("数据删除");
    return NewsModel.deleteOne({ _id });
  },

  //必须加{}，{_id, isPublish, editTime}形式，
  //因为在controller中重构过，不加{}的话数据库无法识别格式，会无法更新
  publish: async ({ _id, isPublish, editTime }) => {
    return NewsModel.updateOne(
      { _id },
      {
        isPublish,
        editTime,
      }
    );
  },
};
module.exports = NewsService;
