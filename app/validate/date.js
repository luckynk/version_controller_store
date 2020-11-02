'use strict';


module.exports = app =>{

  let { validator } = app;

  // check timestamp
  validator.addRule('timestamp', (rule, value)=>{

    if(value) {
      if (!(/^\d{1,10}$/.test(value))) {
        return "invalid value";
      }
    } else if(rule.required){
      return "timestamp required"
    }
  })
};