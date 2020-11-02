'use strict';

const BaseController = require('../core/base_controller');

class InfoController extends BaseController {
  async get() {
    const { ctx } = this;

    let params = {
      name: ctx.params.name,
      timestamp: ctx.query.timestamp
    }

    try {
      ctx.validate({
        name: { type: 'string', required: true },
        timestamp: { type: 'timestamp', required: false },
      }, params);
    } catch (e) {
      this.error({
        status: 400,
        message: `${e.errors[0].field}: ${e.errors[0].message}` 
      })
      return
    }

    let results =  await ctx.service.info.getInfo(params);

    let responseData = results[0]? results[0] : null;

    this.success(responseData);
  }

  async create() {
    const { ctx } = this;

    let body = ctx.request.body;

    let bodyKeys = Object.keys(body)

    if(bodyKeys.length === 0) {
      
      this.error({
        status: 400,
        message: "Request body is none"
      })

    } else {
      let key = bodyKeys[0];

      let storeInfo = {
        name: key,
        value: body[key]
      };

      let results = await ctx.service.info.createInfo(storeInfo);

      this.success(results[0]);
    }
  }
}

module.exports = InfoController;
