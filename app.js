'use strict';
class AppBootHook {
  constructor(app) {
    this.app = app;
  }

  async beforeClose() {
    if (this.app.piciObj) {
      const ctx = await this.app.createAnonymousContext();
      const promises = Object.keys(this.app.piciObj).map(id =>
        ctx.service.pici.stopExecute(id)
      );
      await Promise.all(promises);
    }
  }
}

module.exports = AppBootHook;
