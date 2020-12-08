'use strict';
const Service = require('egg').Service;
const SSH = require('simple-ssh');

class piciService extends Service {
  async list(query) {
    const { queryItems, currPage: page, pageSize: size } = query;
    const defaultOrder = [[ 'created_at', 'desc' ]];

    const res = await this.ctx.model2.Pici.findAndCountAll({
      where: this.ctx.helper.getWhere(queryItems),
      limit: size,
      offset: size * (page - 1),
      order: defaultOrder,
    });

    const records = res.rows;

    return {
      records,
      page,
      size,
      total: res.count,
    };
  }

  async check() {
    return await this.ctx.model2.Pici.findOne({
      where: { status: 1 },
    });
  }

  async create(body) {
    const option = {
      status: 0,
      step: 0,
      progress: '0/0',
      ...body,
    };
    return await this.ctx.model2.Pici.create(option);
  }
  async destroy(id) {
    const pici = await this.ctx.model2.Pici.findByPk(id);
    if (!pici) this.ctx.throw(404, 'pici not found');
    pici.destroy();
  }
  detail(id) {
    return this.ctx.model2.Pici.findByPk(id);
  }

  updateWithInterval(progress, obj, pici) {
    const interval = 1000;
    const { lastUpdate } = obj;
    const [ a, b ] = progress.split('/');
    const isFinished = a === b && a !== '0';
    const data = {
      progress,
    };
    if (isFinished) {
      const { step, subStep, hasDoneStep } = pici;
      const curDoneStep = [ 4, 5 ].includes(step) ? step + '.' + subStep : step;
      const isNoStep = hasDoneStep === null;
      const arr = isNoStep ? [] : hasDoneStep.split(',');
      const index = arr.indexOf(curDoneStep);
      if (index !== -1) {
        arr.splice(index, 1);
      }
      data.hasDoneStep = !isNoStep ? (hasDoneStep + ',' + curDoneStep) : curDoneStep;
      data.status = 2;
      data.endTime = new Date();
    }
    if (!lastUpdate) {
      obj.lastUpdate = Date.now();
      this.updateAndEmit(pici, data);
    } else {
      clearTimeout(obj.timer);
      const distance = Date.now() - lastUpdate;
      if (distance < interval) {
        obj.timer = setTimeout(() => {
          obj.lastUpdate = Date.now();
          this.updateAndEmit(pici, data);
        }, interval - distance);
      } else {
        obj.lastUpdate = Date.now();
        this.updateAndEmit(pici, data);
      }
    }
  }

  async updateAndEmit(pici, data) {
    const res = await pici.update(data);
    if (data.status === 2) {
      this.emitProcessingPici('');
    }
    const obj = this.ctx.app.io.of('/').connected;
    Object.keys(obj).forEach(one => {
      const socket = obj[one];
      socket.emit('pici' + pici.id, res);
    });
  }

  async emitProcessingPici(id) {
    const obj = this.ctx.app.io.of('/').connected;
    Object.keys(obj).forEach(one => {
      const socket = obj[one];
      socket.emit('processingPici', id);
    });
  }

  async update(id, body) {
    const option = {
      ...body,
    };
    const pici = await this.ctx.model2.Pici.findByPk(id);

    if (!pici) this.ctx.throw(404, 'pici not found');

    return await pici.update({ ...option });
  }


  async stopSsh(id) {
    const obj = this.ctx.app.piciObj && this.ctx.app.piciObj[id];
    if (obj) {
      const { timer, ssh } = obj;
      clearTimeout(timer);
      ssh.end();
      const cmd = "kill $(ps -ef|grep DataProcessProgram/master.py |grep -v grep |awk '{print $2}')";
      const newSsh = this.getSshClient();

      await new Promise(resolve => {
        newSsh.exec(cmd, {
          exit: resolve,
        }).start();
      });
      delete this.ctx.app.piciObj[id];
    }
  }

  async stopExecute(id) {
    try {
      await this.stopSsh(id);
      const pici = await this.ctx.model2.Pici.findByPk(id);
      console.log(`===============停止${pici.name}===========`);
      await this.updateAndEmit(pici, { endTime: new Date(), status: 3, progress: '' });
      this.emitProcessingPici('');
    } catch (e) {
      console.log(e);
    }
  }


  getSshClient() {
    const { host, user, pass } = this.ctx.app.config.ssh;
    this.ctx.app.sshClient = new SSH({
      host,
      user,
      pass,
    });
    return this.ctx.app.sshClient;
  }

  async checkIsCanExecute() {
    const ssh = this.getSshClient();
    const cmd = "ps -ef|grep python3|grep -v grep|grep batch|awk '{print $2}'";
    return await new Promise(resolve => {
      ssh.exec(cmd, {
        out: () => {
          resolve(false);
        },
        exit: () => {
          resolve(true);
        },
      }).start();
    });
  }

  async handleStd(std, obj, pici) {
    const arr = std.split('处理进度：');
    if (arr.length >= 2) {
      const lastOne = arr.pop();
      const res = /(\d*)\/(\d*)/.exec(lastOne);
      if (res) {
        const progress = `${res[1]}/${res[2]}`;
        console.log(progress);
        this.updateWithInterval(progress, obj, pici);
      }
    }
  }

  async execute(id, { step, subStep, metaFile }) {
    const isOk = await this.checkIsCanExecute();
    if (!isOk) {
      this.ctx.body = {
        code: -1,
        msg: '有其他批次正在处理，请稍后再试',
      };
      return;
    }
    const pici = await this.ctx.model2.Pici.findByPk(id);

    this.emitProcessingPici(id);
    await this.updateAndEmit(pici, { startTime: new Date(), status: 1, step, subStep, progress: '' });


    let cmd = `python3 /usr/local/DataProcessProgram/master.py -current=${step} -batch=${pici.name}`;

    if (step === 0) {
      cmd = `${cmd} --metaFile=${metaFile}`;
    } else if ([ 4, 5 ].includes(step)) {
      cmd = cmd + ' -step=' + (subStep + 1);
    }
    console.log(`======================${cmd}========================`);
    const ssh = this.getSshClient();
    if (!this.ctx.app.piciObj) {
      this.ctx.app.piciObj = {};
    }

    const obj = this.ctx.app.piciObj[id] = {
      ssh,
      timer: null,
      lastUpdate: null,
    };

    ssh.exec(cmd, {
      out: stdout => {
        console.log('==========执行的输出========', stdout);
        this.handleStd(stdout, obj, pici);
      },
      exit: code => {
        console.log('退出执行的', code);
        delete this.ctx.app.piciObj[id];
      },
      err: stderr => {
        console.log('-------执行的出错---', stderr);
        this.handleStd(stderr, obj, pici);
        // await pici.update({ startTime: new Date(), status: 3, progress: '' });
      },
    }).start();
  }
}
module.exports = piciService;
