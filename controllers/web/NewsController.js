const NewsService = require("../../services/web/NewsService");

const NewsController = {
  getList: async (req, res) => {
    //没有await前端会报错，因为接收不到数据，res.data.data为空值
    console.log(req.params.id);
    const result = await NewsService.getList({ _id: req.params.id });
    res.send({
      ActionType: "OK",
      data: result,
    });
  },
  //给出推荐新闻，limit为限制数量，目前暂时为最新编辑过的4条
  getRecommend: async (req, res) => {
    const result = await NewsService.getRecommend({ limit: req.query.limit });
    res.send({
      ActionType: "OK",
      data: result,
    });
  },
};
module.exports = NewsController;
