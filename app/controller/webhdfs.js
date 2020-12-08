'use strict';
const Controller = require('egg').Controller;
const fs = require('fs');
const path = require('path');
const getId = require('../extend/utils/getId');
const tarUtils = require('../extend/utils/tar');
class webhdfsController extends Controller {
  async getJson() {
    const ctx = this.ctx;
    const res = await ctx.service.webhdfs.getJsonFromHdfs(ctx.query.filePath);
    ctx.body = res;
  }
  async upload() {
    const ctx = this.ctx;
    try {
      const stream = await ctx.getFileStream();
      const getJson = ctx.query.getJson === '1';
      const json = await ctx.service.webhdfs.upload(stream, decodeURIComponent(ctx.query.path), getJson, ctx.query.piciId);
      if (getJson) {
        ctx.body = json;
      }
    } catch (e) {
      ctx.body = {
        code: -1,
        msg: e.message,
      };
    }
  }


  async downloadFromHdfs() {
    const ctx = this.ctx;
    const { remoteFilePath, size } = ctx.query;
    const fileName = path.basename(remoteFilePath);
    this.ctx.set('Content-Length', size);
    this.ctx.set('Content-Type', 'application/octet-stream');
    this.ctx.attachment(fileName);
    ctx.body = this.ctx.service.webhdfs.downloadFileWithStream(remoteFilePath);
  }

  async downloadFromNode() {
    const ctx = this.ctx;
    const { fileName, fullDownloadFolder, isSingleFolder, filePath } = ctx.query;
    const size = fs.statSync(filePath).size;
    this.ctx.set('Content-Length', size);
    this.ctx.set('Content-Type', 'application/octet-stream');
    this.ctx.attachment(fileName);
    const stream = fs.createReadStream(filePath);
    ctx.body = stream;
    stream.on('end', () => {
      ctx.helper.removeDir(fullDownloadFolder);
      !isSingleFolder && fs.unlinkSync(filePath);
    });
  }

  async download() {
    const ctx = this.ctx;
    const data = ctx.request.body.pathOrFile;
    const downloadPath = path.resolve(__dirname, '../../', 'download');
    if (!fs.existsSync(downloadPath)) {
      fs.mkdirSync(downloadPath);
    }
    const downloadFolderName = getId();
    const fullDownloadFolder = path.resolve(downloadPath, downloadFolderName);

    const { fileName, compressPath, isSingleFolder, filePath } = await ctx.service.webhdfs.download(data, fullDownloadFolder);

    await tarUtils.zipDir(compressPath, filePath);
    this.ctx.body = {
      fileName,
      fullDownloadFolder,
      isSingleFolder,
      filePath,
    };
  }
}
module.exports = webhdfsController;
