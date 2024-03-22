const NewsService = require("../../services/admin/NewsService");

const NewsController = {
  add: async (req, res) => {
    //调用service
    console.log("后端控制处理");
    console.log(req.file, req.body); //打印文件信息

    const cover = req.file ? `/newsuploads/${req.file.filename}` : "";
    const { title, content, category, isPublish } = req.body;
    await NewsService.add({
      title,
      content,
      category: Number(category),
      cover,
      isPublish: Number(isPublish),
      editTime: new Date(),
    });
    res.send({
      ActionType: "OK",
    });
  },

  getList: async (req, res) => {
    //没有await前端会报错，因为接收不到数据，res.data.data为空值
    console.log(req.params.id);
    const result = await NewsService.getList({ _id: req.params.id });
    res.send({
      ActionType: "OK",
      data: result,
    });
  },
  updateList: async (req, res) => {
    const cover = req.file ? `/newsuploads/${req.file.filename}` : "";
    const { _id, title, content, category, isPublish } = req.body;
    await NewsService.updateList({
      _id,
      title,
      content,
      category: Number(category),
      cover,
      isPublish: Number(isPublish),
      editTime: new Date(),
    });
    res.send({
      ActionType: "OK",
    });
  },

  delList: async (req, res) => {
    //没有await前端会报错，因为接收不到数据，res.data.data为空值
    //_id为数据库所需的key值，req.params.id为接口路径中的占位符
    await NewsService.delList({ _id: req.params.id });
    res.send({
      ActionType: "OK",
    });
  },

  publish: async (req, res) => {
    //req.body,即包含_id和isPublish的对象
    //console.log(req.body);
    //每次修改发布状态后，更改编辑时间
    await NewsService.publish({ ...req.body, editTime: new Date() });
    res.send({
      ActionType: "OK",
    });
  },
};
module.exports = NewsController;
