'use strict';
const Service = require('egg').Service;
const path = require('path');
const fs = require('fs');
const request = require('request');
const WebHDFS = require('webhdfs');
const xlsx = require('xlsx');
const PassThrough = require('stream').PassThrough;

const hdfs = WebHDFS.createClient({
  user: 'hdfs',
  host: '192.168.1.212',
  port: 50070,
  path: 'webhdfs/v1',
});

class WebhdfsService extends Service {
  getDownloadPath(filePath) {
    return encodeURI(this.app.config.remote.webhdfs + filePath);
  }
  async downloadFile(remoteFilePath, downloadFolderPath) {
    const url = this.getDownloadPath(remoteFilePath) + '?op=OPEN';
    const fileName = path.basename(remoteFilePath);
    const downloadFilePath = path.resolve(downloadFolderPath, fileName);

    await this.ctx.helper.requestFile(url, downloadFilePath);
    return {
      downloadFilePath,
      fileName,
    };
  }

  downloadFileWithStream(remoteFilePath) {
    const url = this.getDownloadPath(remoteFilePath) + '?op=OPEN';
    return request(url);
  }

  async getList(filePath) {
    const url = this.getDownloadPath(filePath) + '?op=LISTSTATUS';
    const {
      FileStatuses: { FileStatus },
    } = await this.ctx.helper.requestGet(url);
    return FileStatus.map(one => ({
      remoteFilePath: filePath + '/' + one.pathSuffix,
      type: one.type,
    }));
  }

  async downloadFolder(remoteFilePath, downloadPath) {
    if (!fs.existsSync(downloadPath)) {
      fs.mkdirSync(downloadPath);
    }
    const dirName = path.basename(remoteFilePath);
    const folderPath = path.resolve(downloadPath, dirName);
    const arr = await this.getList(remoteFilePath);
    await this.download(arr, folderPath);
  }

  async downloadMultiple(arr, downloadFolderPath) {
    const folders = arr.filter(one => one.type !== 'FILE');
    const files = arr.filter(one => one.type === 'FILE');
    const folderPromises = folders.map(({ remoteFilePath }) =>
      this.downloadFolder(remoteFilePath, downloadFolderPath)
    );
    const filePromises = files.map(one =>
      this.downloadFile(one.remoteFilePath, downloadFolderPath)
    );
    await Promise.all([ ...filePromises, ...folderPromises ]);
  }

  async uploadOne(localFileStream, pathToUpload) {
    await new Promise((resolve, reject) => {
      const remoteFileStream = hdfs.createWriteStream(
        encodeURI(pathToUpload + '/' + localFileStream.filename)
      );
      localFileStream.pipe(remoteFileStream);
      remoteFileStream.on('error', function onError(err) {
        if (
          [ 'HPE_LF_EXPECTED', 'HPE_INVALID_HEADER_TOKEN' ].includes(err.code)
        ) {
          resolve();
          return;
        }
        console.log('出错', err, err.code);
        reject(err);
      });
      remoteFileStream.on('finish', function onFinish() {
        console.log('完成' + localFileStream.filename);
        resolve();
      });
    });
  }
  async upload(localFileStream, pathToUpload, getJson, piciId) {
    if (getJson) {
      const p1 = this.getExcelJsonFromStream(localFileStream);
      const p2 = this.uploadOne(localFileStream, pathToUpload);
      const [ json ] = await Promise.all([ p1, p2 ]);
      const newJson = this.ctx.service.quota.transformJson(json);
      await this.ctx.service.quota.createOrUpdate(newJson, piciId);
      return newJson;
    }
    await this.uploadOne(localFileStream, pathToUpload);
  }

  async getJsonFromHdfs(filePath) {
    const url = this.getDownloadPath(filePath) + '?op=OPEN';
    const json = await this.getExcelJsonFromStream(request(url));
    return json;
  }

  getExcelJsonFromStream(localFileStream) {
    const pass = new PassThrough();
    return new Promise(resolve => {
      const buf = [];
      localFileStream.pipe(pass);
      pass.on('data', chunk => {
        buf.push(chunk);
      });
      pass.on('end', function() {
        const buffer = Buffer.concat(buf);
        const { SheetNames, Sheets } = xlsx.read(buffer, {
          type: 'buffer',
          // cellDates: true,
          // cellNF: false,
          // cellText: false,
        });
        const res = xlsx.utils.sheet_to_json(Sheets[SheetNames[0]], {
          raw: false,
        });
        resolve(res);
      });
    });
  }

  async download(arr, downloadFolderPath) {
    if (!fs.existsSync(downloadFolderPath)) {
      fs.mkdirSync(downloadFolderPath);
    }
    const isSingleFolder = arr.length === 1 && arr[0].type !== 'FILE';

    const compressPath = isSingleFolder
      ? path.resolve(downloadFolderPath, path.basename(arr[0].remoteFilePath))
      : downloadFolderPath;

    await this.downloadMultiple(arr, downloadFolderPath);
    return {
      compressPath,
      fileName: path.basename(compressPath) + '.zip',
      filePath: compressPath + '.zip',
      isSingleFolder,
    };
  }
}

module.exports = WebhdfsService;
