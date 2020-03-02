const fs = require('fs');
const loaderUtils = require('loader-utils');
const validateOptions = require('schema-utils');

function loader(source) {
  this.cacheable && this.cacheable();   // 是否缓存，参数填false表示不缓存loader的计算
  const options = loaderUtils.getOptions(this);
  const cb = this.async();
  const schema = {
    type: 'object',
    properties: {
      text: {
        type: 'string'
      },
      filename: {
        type: 'string'
      }
    }
  }
  validateOptions(schema, options);
  if (options.filename) {
    this.addDependency(options.filename);   // 添加文件依赖，这样watch可以监听到改变
    fs.readFile(options.filename, 'utf8', function(err, result) {
      cb(err, `/**${result}*/${source}`);
    });
  }else {
    cb(null, `/**${options.text}*/${source}`);
  }
}

module.exports = loader;
