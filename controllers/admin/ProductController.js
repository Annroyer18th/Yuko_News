const ProductService = require("../../services/admin/ProductService");

const ProductController = {
  add: async (req, res) => {
    //调用service
    // console.log("后端控制处理");
    // console.log(req.file, req.body); //打印文件信息

    const cover = req.file ? `/productuploads/${req.file.filename}` : "";
    const { title, introduction, detail } = req.body;
    await ProductService.add({
      title,
      introduction,
      detail,
      cover,
      editTime: new Date(),
    });
    res.send({
      ActionType: "OK",
    });
  },
  getList: async (req, res) => {
    //没有await前端会报错，因为接收不到数据，res.data.data为空值
    console.log(req.params.id);
    const result = await ProductService.getList({ _id: req.params.id });
    res.send({
      ActionType: "OK",
      data: result,
    });
  },

  updateList: async (req, res) => {
    const cover = req.file ? `/productuploads/${req.file.filename}` : "";
    const { _id, title, introduction, detail } = req.body;
    await ProductService.updateList({
      _id,
      title,
      introduction,
      detail,
      cover,
      editTime: new Date(),
    });
    res.send({
      ActionType: "OK",
    });
  },

  delList: async (req, res) => {
    //没有await前端会报错，因为接收不到数据，res.data.data为空值
    //_id为数据库所需的key值，req.params.id为接口路径中的占位符
    await ProductService.delList({ _id: req.params.id });
    res.send({
      ActionType: "OK",
    });
  },
};
module.exports = ProductController;
