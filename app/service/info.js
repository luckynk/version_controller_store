'use strict';

const Service = require('egg').Service;

class InfoService extends Service {
  async getInfo(params) {
    
    const { app, ctx } = this;

    let results = null;

    try {
      if(!params.timestamp) {
        results =  await app.mysql.select('info', {
          where: { name: params.name },
          columns: ['value'],
          orders: [['timestamp','desc']],
          limit: 1
        });
      } else {
        results = await app.mysql.query("select value from info  where name = ? and timestamp < FROM_UNIXTIME(?)  order by timestamp desc limit 1;", [params.name, params.timestamp]);
      }
    } catch (error) {
      ctx.status = 500
      throw(error)
    }

    return results;
  }


  async createInfo(info) {
    const { app, ctx } = this;
    let results = null;

    try {
      let insertInfo = await app.mysql.insert('info', info);

      if(insertInfo.affectedRows === 1) {
        let id = insertInfo.insertId;

        results = await app.mysql.query("select name `key`, value, timestamp from info where id = ?", [id]);
      }
    } catch (error) {
      ctx.status = 500
      throw(error)
    }
    
    return results
  }

}

module.exports = InfoService;