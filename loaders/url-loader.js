const loaderUtils = require('loader-utils');
const mime = require('mime');

function loader(source) {
  const {
    limit,
    mimeType,
    fallback = 'file-loader'
  } = loaderUtils.getOptions(this);
  if (limit && limit > source.length) {
    return `module.exports="data:${mimeType || mime.getType(this.resourcePath)};base64,${source.toString('base64')}"`;
  } else {
    return require(fallback).call(this, source);
  }
}

loader.raw = true;

module.exports = loader;
