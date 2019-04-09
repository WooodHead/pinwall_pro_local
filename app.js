const LocalStrategy = require('passport-local').Strategy;
const WeixinStrategy = require('passport-weixin');

module.exports = app => {

  app.passport.use(new LocalStrategy({
    passReqToCallback: true,
  }, (req, username, password, done) => {
    // format user
    const user = {
      provider: 'local',
      message: '',
      success: false,
      username,
      password,
    };
    app.passport.doVerify(req, user, done);

  }));

  // 处理用户信息

  app.passport.verify(async (ctx, user) => {
    const existsUser = await ctx.service.users.loginFindByUserWithMobile(user.username);

    if (existsUser) {
      if (ctx.helper.cryptoPwd(ctx.helper.cryptoPwd(user.password)) == existsUser.password){
        existsUser.password = '';
        return existsUser;
      }
      else{
         return false;
       }
    }
    else {
      return false;
    }
  });

  
  // 将用户信息序列化后存进 session 里面，一般需要精简，只保存个别字段
  app.passport.serializeUser(async (ctx, user) => {
    // 处理 user
    // ...
    return user;
  });

  // 反序列化后把用户信息从 session 中取出来，反查数据库拿到完整信息
  app.passport.deserializeUser(async (ctx, user) => {
    // 处理 user
    // ...
    return user;
  });

};
