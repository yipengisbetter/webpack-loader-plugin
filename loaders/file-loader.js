const loaderUtils = require('loader-utils');
const mime = require('mime');

function loader(source) {
  let {
    name,
    mimeType
  } = loaderUtils.getOptions(this) || {};
  if (mimeType) {
    const type = mime.getExtension(mimeType);
    if (name) {
      const arr = name.split('.');
      arr.pop();
      arr.push(type);
      name = arr.join('.');
    }
  }
  // 根据文件内容形成新文件名
  const filename = loaderUtils.interpolateName(this, name || '[hash].[ext]', {
    content: source
  });
  this.emitFile(filename, source);
  return `module.exports="${filename}"`;
}

loader.raw = true; // 读取二进制传过来

module.exports = loader;
