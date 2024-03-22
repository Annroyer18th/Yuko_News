const UserService = require("../../services/admin/UserService");
const JWT = require("../../util/JWT");
//require("../../util/JWT");
const UserController = {
  login: async (req, res) => {
    var result = await UserService.login(req.body);
    if (result.length === 0) {
      res.send({
        code: "-1",
        error: "用户名密码不匹配",
      });
    } else {
      const token = JWT.generate(
        {
          _id: result[0]._id,
          username: result[0].username,
        },
        "10s"
      ); //(输入内容，过期时间)
      //console.log(token);
      res.header("Authorization", token); //返回token字符
      res.send({
        ActionType: "OK", //自定义响应头
        data: {
          username: result[0].username,
          gender: result[0].gender ? result[0].gender : 0,
          introduction: result[0].introduction,
          avatar: result[0].avatar,
          role: result[0].role,
        },
      });
    }
  },

  upload: async (req, res) => {
    //console.log(req.body, req.file);
    const { username, introduction, gender } = req.body; //从输入中解构出所需信息
    const token = req.headers["authorization"].split(" ")[1];
    const avatar = req.file ? `/avataruploads/${req.file.filename}` : ""; //头像数据保存为相对地址.要判断file是否为null，因为用户如果不修改头像，file值为null
    var payload = JWT.verify(token);
    //console.log(payload._id);
    //调用services，更新数据
    await UserService.upload({
      _id: payload._id,
      username,
      introduction,
      gender: Number(gender),
      avatar,
    });
    //判断avatar是否改变，即用户是否修改头像。只有头像改变的情况下才返回avatar字段。
    //不判断的话会返回null，使得前端头像错误赋值，使得找不到地址
    if (avatar) {
      res.send({
        ActionType: "OK",
        data: {
          username,
          introduction,
          gender: Number(gender),
          avatar,
        },
      });
    } else {
      res.send({
        ActionType: "OK",
        data: {
          username,
          introduction,
          gender: Number(gender),
        },
      });
    }
  },

  add: async (req, res) => {
    //console.log(req.body, req.file);
    const { username, password, role, gender, introduction } = req.body; //从输入中解构出所需信息
    const avatar = req.file ? `/avataruploads/${req.file.filename}` : ""; //头像数据保存为相对地址.要判断file是否为null，因为用户如果不修改头像，file值为null
    //console.log(payload._id);
    //调用services，更新数据
    await UserService.add({
      username,
      introduction,
      gender: Number(gender),
      avatar,
      role: Number(role),
      password,
    });
    res.send({
      ActionType: "OK",
    });
  },

  getList: async (req, res) => {
    //req.params表示传入的id值，在列表中编辑用户才会传入。查看列表时不会传入
    const result = await UserService.getList(req.params);
    res.send({
      ActionType: "OK",
      data: result,
    });
  },

  putList: async (req, res) => {
    //req.params表示传入的id值，在列表中编辑用户才会传入。查看列表时不会传入
    const result = await UserService.putList(req.body);
    res.send({
      ActionType: "OK",
    });
  },

  delList: async (req, res) => {
    //console.log(req.params.id);

    //网络流中的id为req.params.id，数据库中的id字段为_id
    const result = await UserService.delList({ _id: req.params.id });
    res.send({
      ActionType: "OK",
    });
  },
}; //req前端返回的数据，res返回给前端的内容
module.exports = UserController;
