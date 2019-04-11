'use strict';

const BaseController = require('../BaseController');
const fs = require('fs');
const path = require('path');
const Controller = require('egg').Controller;
const awaitWriteStream = require('await-stream-ready').write;
const sendToWormhole = require('stream-wormhole');


class FileController extends BaseController {

    async uploadFile() {
        const ctx = this.ctx;
        let fileType = ctx.params.fileType;
        let userId = ctx.user.Id;
        let fileTagget = '';

        if(!fs.existsSync(ctx.helper.basePath)){
          fs.mkdirSync(ctx.helper.basePath);
        }

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

        fileTagget = path.join(fileTagget, userId+'');

        if(!fs.existsSync(fileTagget)){
          fs.mkdirSync(fileTagget);
        }

        let result = {
          status:200
        };

        try {
          const stream = await ctx.getFileStream();
          const filename = ctx.helper.randomString(8) + path.extname(stream.filename);
          const target = path.join(fileTagget, filename);
          const writeStream = fs.createWriteStream(target);
          await awaitWriteStream(stream.pipe(writeStream));
          result.url = ctx.helper.baseUrl + fileTagget.replace(ctx.helper.basePath,'') + '/' + filename;
          result.fileName = filename;
        } catch (err) {
            //如果出现错误，关闭管道
          await sendToWormhole(stream);
          result.status = 500;
        }
        //文件响应
        ctx.body = result;
    }
}

module.exports = FileController;
