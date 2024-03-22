const NewsModel = require("../../models/NewsModel");

const NewsService = {
  getList: async ({ _id }) => {
    console.log(_id);
    return _id
      ? NewsModel.find({ _id, isPublish: 1 })
      : NewsModel.find({ isPublish: 1 }).sort({ editTime: -1 });
    //如果带id访问，则输出相关已发布新闻
    //如果不带id访问，则输出全部已发布新闻且按发布时间先后排序
  },
};
module.exports = NewsService;
