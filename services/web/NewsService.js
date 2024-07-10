const NewsModel = require("../../models/NewsModel");

const NewsService = {
  getList: async ({ _id }) => {
    console.log("接收到新闻id：", _id);
    return _id
      ? NewsModel.find({ _id, isPublish: 1 })
      : NewsModel.find({ isPublish: 1 }).sort({ editTime: -1 });
    //如果带id访问，则输出相关已发布新闻
    //如果不带id访问，则输出全部已发布新闻且按发布时间先后排序
  },
  //给出推荐新闻，limit为限制数量，目前暂时为最新编辑过的4条
  getRecommend: async ({ limit }) => {
    console.log("限制数量为：" + limit);
    return NewsModel.find({ isPublish: 1 }).sort({ editTime: -1 }).limit(limit);
  },
};
module.exports = NewsService;
