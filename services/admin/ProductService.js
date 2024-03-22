const ProductModel = require("../../models/ProductModel");

const ProductService = {
  add: async ({ title, introduction, detail, cover, editTime }) => {
    //console.log("数据库模型处理");
    return ProductModel.create({
      title,
      introduction,
      detail,
      cover,
      editTime,
    });
  },
  getList: async ({ _id }) => {
    console.log(_id);
    return _id ? ProductModel.find({ _id }) : ProductModel.find({});
  },

  updateList: async ({ _id, title, introduction, detail, cover, editTime }) => {
    //console.log("数据库模型处理");
    //如果cover非空则更新
    if (cover) {
      return ProductModel.updateOne(
        { _id },
        { title, introduction, detail, cover, editTime }
      );
    } else {
      return ProductModel.updateOne(
        { _id },
        { title, introduction, detail, cover, editTime }
      );
    }
  },

  delList: async ({ _id }) => {
    console.log("数据删除");
    return ProductModel.deleteOne({ _id });
  },
};
module.exports = ProductService;
