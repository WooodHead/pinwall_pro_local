'use strict';

const BaseController = require('../BaseController');
const fs = require('fs');
//node.js 路径操作对象
const path = require('path');
//egg.js Controller
const Controller = require('egg').Controller;
//故名思意 异步二进制 写入流
const awaitWriteStream = require('await-stream-ready').write;
//管道读入一个虫洞。
const sendToWormhole = require('stream-wormhole');


class FileController extends BaseController {

    async uploadFile() {
        const ctx = this.ctx;
        let fileType = ctx.query.type;
        let userId = ctx.query.userId;

        let fileTagget = '';

        if (fileType == 1){
          fileTagget = path.join(ctx.helper.basePath, ctx.helper.imagePath);
        }
        else if (fileType == 2){
          fileTagget = path.join(ctx.helper.basePath, ctx.helper.pdfPath);
        }
        else if (fileType == 3){
          fileTagget = path.join(ctx.helper.basePath, ctx.helper.rar_zipPath);
        }
        else if (fileType == 4){
          fileTagget = path.join(ctx.helper.basePath, ctx.helper.videoPath);
        }
        else if (fileType == 5){
          fileTagget = path.join(ctx.helper.basePath, ctx.helper.othersPath);
        }

        if(!fs.existsSync(fileTagget)){
          fs.mkdirSync(fileTagget);
        }

        fileTagget = path.join(fileTagget, userId);

        if(!fs.existsSync(fileTagget)){
          fs.mkdirSync(fileTagget);
        }

        //egg-multipart 已经帮我们处理文件二进制对象
        // node.js 和 php 的上传唯一的不同就是 ，php 是转移一个 临时文件
        // node.js 和 其他语言（java c#） 一样操作文件流
        const stream = await ctx.getFileStream();
        //新建一个文件名
        const filename = ctx.helper.randomString(8) + path.extname(stream.filename);
        //文件生成绝对路径
        //当然这里这样市不行的，因为你还要判断一下是否存在文件路径
        const target = path.join(fileTagget, filename);

        //生成一个文件写入 文件流
        const writeStream = fs.createWriteStream(target);
        try {
            //异步把文件流 写入
            await awaitWriteStream(stream.pipe(writeStream));
        } catch (err) {
            //如果出现错误，关闭管道
            await sendToWormhole(stream);
            throw err;
        }
        //文件响应
        ctx.body = {
            url: path.join(ctx.helper.baseUrl, fileTagget, filename)
        };
    }
}

module.exports = FileController;