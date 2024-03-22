const jsonwebtoken = require("jsonwebtoken");
const secret = "yuko"; //加密token和解密token用到的密钥
const JWT = {
  generate(value, expires) {
    return jsonwebtoken.sign(value, secret, { expiresIn: expires });
  }, //加密token函数，value为要加密的内容，secret为密钥，expires为token的过期时间
  verify(token) {
    try {
      return jsonwebtoken.verify(token, secret);
    } catch (e) {
      return false;
    }
  }, //解密token函数
};
/*
const token = JWT.generate({ name: "kerwin" }, "10s");
setTimeout(() => {
  console.log(JWT.verify(token));
}, 11000); //每11秒console一次


//每做一个小模块要及时进行测试，可以通过console.log方式检查结果是否符合预期*/
module.exports = JWT;
