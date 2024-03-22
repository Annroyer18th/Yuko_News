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
};
module.exports = NewsController;
