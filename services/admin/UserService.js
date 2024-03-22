const UserModel = require("../../models/UserModel");

const UserService = {
  login: async ({ username, password }) => {
    return UserModel.find({ username, password });
  },
  upload: async ({ _id, username, introduction, gender, avatar }) => {
    //判断avatar是否改变，即用户是否修改头像。只有头像改变的情况下才更新avatar字段
    if (avatar) {
      return UserModel.updateOne(
        {
          _id,
        },
        {
          username,
          introduction,
          gender,
          avatar,
        }
      );
    } else {
      return UserModel.updateOne(
        {
          _id,
        },
        {
          username,
          introduction,
          gender,
        }
      );
    }
  },

  add: async ({ username, password, role, avatar, gender, introduction }) => {
    return UserModel.create({
      username,
      introduction,
      gender,
      avatar,
      password,
      role,
    });
  },
  //获取用户列表，取回除密码外所有用户数据
  getList: async ({ id }) => {
    //若传入id，则是在列表中编辑，要返回部分信息到编辑表，要包含密码
    //如果没有传入id，则是加载列表所有信息
    return id
      ? UserModel.find({ _id: id }, [
          "username",
          "role",
          "password",
          "introduction",
        ])
      : UserModel.find({}, [
          "username",
          "role",
          "avatar",
          "gender",
          "introduction",
        ]);
  },

  putList: async (body) => {
    return UserModel.updateOne({ _id: body._id }, body);
  },

  //解构出_id
  delList: async ({ _id }) => {
    return UserModel.deleteOne({ _id });
  },
};
module.exports = UserService;
