const HtmlWebpackPlugin = require('html-webpack-plugin');

class InlineSourcePlugin {
  constructor({
    match
  }) {
    this.match = match;
  }

  processTag(tag, compilation) {
    let newTag;
    let url;
    if (tag.tagName === 'link' && this.match.test(tag.attributes.href)) {
      newTag = {
        tagName: 'style',
        attributes: {
          type: 'text/css'
        }
      };
      url = tag.attributes.href;
    }
    if (tag.tagName === 'script' && this.match.test(tag.attributes.src)) {
      newTag = {
        tagName: 'script',
        attributes: {
          type: 'application/javascript'
        }
      };
      url = tag.attributes.src;
    }
    if (url) {
      const source = compilation.assets[url].source();
      Reflect.deleteProperty(compilation.assets, url);
      newTag.innerHTML = source;
    }
    return newTag || tag;
  }

  processTags(data, compilation) {
    const headTags = [];
    const bodyTags = [];
    data.headTags.forEach(headTag => {
      headTags.push(this.processTag(headTag, compilation));
    });
    data.bodyTags.forEach(bodyTag => {
      bodyTags.push(this.processTag(bodyTag, compilation));
    });
    return {
      ...data,
      headTags,
      bodyTags
    };
  }

  apply(compiler) {
    compiler.hooks.compilation.tap('InlineSourcePlugin', compilation => {
      HtmlWebpackPlugin.getHooks(compilation).alterAssetTagGroups.tapAsync('alertPlugin', (data, cb) => {
        data = this.processTags(data, compilation);
        cb(null, data);
      });
    });
  }
}

module.exports = InlineSourcePlugin;
