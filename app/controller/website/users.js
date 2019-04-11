'use strict'

const BaseController = require('../BaseController');
const Captcha = require('svg-captcha');
const request = require('request');

class UsersController extends BaseController{

  async index() {
    const ctx = this.ctx;
    const query = {
      limit: ctx.helper.parseInt(ctx.query.limit),
      offset: ctx.helper.parseInt(ctx.query.offset),
    };

    try{
      const result = await ctx.service.users.list(query);
      super.success(result);
    }
    catch(e){
      super.failure(e.message);
    }
  }

  async show() {
    const ctx = this.ctx;
    try{
      const result = await ctx.service.users.find(ctx.helper.parseInt(ctx.params.id));
      super.success(result);
    }
    catch(e){
      super.failure(e.message);
    }
  }

  async createUser() {
    const ctx = this.ctx;
    try{
      let data = ctx.request.body;
      if (data.captchaText != this.ctx.session.captcha){
        super.failure('验证码错误!');
      }
      else{
        const user = await ctx.service.users.createUser(data);
        super.success('创建成功!');
      }

    }
    catch(e){
      super.failure(e.message);
    }
  }

  async update() {
    const ctx = this.ctx;
    const id = ctx.params.id;
    const updates = {
      mobile: ctx.request.body.mobile,
    };

    try{
      await ctx.service.users.update({ id, updates });
      super.success('更新成功!');
    }
    catch(e){
      super.failure(e.message);
    }
  }

  async destroy() {
    const ctx = this.ctx;
    const id = ctx.helper.parseInt(ctx.params.id);

    try{
      await ctx.service.users.del(id);
      super.success('删除成功!');
    }
    catch(e){
      super.failure(e.message);
    }
  }

  async updateAcviveByUserId(){
    const ctx = this.ctx;
    const userId = ctx.helper.parseInt(ctx.params.id);

    try{
      await ctx.service.users.updateAcviveByUserId(userId);
      super.success('更新成功!');
    }
    catch(e){
      super.failure(e.message);
    }
  }

  async getCaptcha(){
    let codeConfig = {
        size: 5,// 验证码长度
        ignoreChars: '0o1i', // 验证码字符中排除 0o1i
        noise: 2, // 干扰线条的数量
        height: 44
    }
    var captcha = Captcha.create(codeConfig);
    this.ctx.session.captcha = captcha.text.toLowerCase(); //存session用于验证接口获取文字码

    this.ctx.body = captcha.data;
  }

  async checkCaptcha(){
    const captchaText = this.ctx.query.captchaText;
    if (captchaText == this.ctx.session.captcha){
      super.success('校验成功!');
    }
    else{
      super.failure('校验失败!');
    }
  }


  async getUserByUnionId(){
    const unionId = this.ctx.query.unionId;
    return await ctx.service.users.findByUnionId(unionId);
  }

  async updatePwd(){
    const ctx = this.ctx;
    const password = ctx.request.body.password;
    const newPwd = ctx.request.body.newPwd;
    if(ctx.user){
      const userObject = await ctx.service.users.find(ctx.user.Id);
      const app = this.ctx.helper;
      const crypwd = ctx.helper.cryptoPwd(ctx.helper.cryptoPwd(password));
      if(userObject.password != crypwd){
        super.failure('旧密码不正确!');
      }
      else{
        const result = await ctx.service.users.updatePwd(ctx.user.Id, ctx.helper.cryptoPwd(ctx.helper.cryptoPwd(newPwd)));
        if (result){
          super.success('修改成功');
        }
        else{
          super.failure('修改失败');
        }
      }
    }
    else{
      ctx.redirect('/login');
    }
  }

  async updatePwdWithMobileAndSmsCode(){
    const ctx = this.ctx;
    const mobile = ctx.request.body.mobile;
    const smsCode = ctx.request.body.smsCode;
    const newPwd = ctx.request.body.newPwd;
    const result = await ctx.service.users.updatePwdWithMobileAndSmsCode(mobile, smsCode, newPwd);
    if (result.success){
      super.success('修改成功');
    }
    else{
      super.failure(result.message);
    }
  }

  async updateUserRole(){
    const ctx = this.ctx;
    const userId = ctx.request.body.userId;
    const operation = ctx.request.body.operation;
    const result = await ctx.service.users.updateUserRole(userId,operation);
    if (result){
      super.success('设置成功');
    }
    else{
      super.failure('设置失败');
    }
  }

  async searchByUsername(){
    const ctx = this.ctx;
    const limit = ctx.helper.parseInt(ctx.query.limit);
    const offset = ctx.helper.parseInt(ctx.query.offset);
    const fullname = ctx.query.fullname;
    const query = {
      limit:limit,
      offset:offset,
      fullname:fullname
    };
    try{
      let result = await ctx.service.users.searchByUsername(query);
      super.success(result);
    }
    catch(e){
        console.log(e);
      super.failure('获取数据失败');
    }
  }

  async searchByMobile(){
    const ctx = this.ctx;
    const limit = ctx.helper.parseInt(ctx.query.limit);
    const offset = ctx.helper.parseInt(ctx.query.offset);
    const mobile = ctx.query.mobile;
    const query = {
      limit:limit,
      offset:offset,
      mobile:mobile
    };
    try{
      let result = await ctx.service.users.searchByMobile(query);
      super.success(result);
    }
    catch(e){
      super.failure('获取数据失败');
    }
  }

  async updateUserAvatarUrl(){
    const ctx = this.ctx;
    const userId = ctx.helper.parseInt(ctx.params.id);
    const avatarUrl = ctx.request.body.avatarUrl;

    const data = {
      userId:userId,
      avatarUrl:avatarUrl
    };
    try{
      let result = await ctx.service.users.updateUserAvatarUrl(data);
      super.success(result);
    }
    catch(e){
      super.failure('更新数据失败');
    }
  }
}

module.exports = UsersController;
