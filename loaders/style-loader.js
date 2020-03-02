const loaderUtils = require('loader-utils');

function loader(source) {
  const style = `
    const style = document.createElement("style");
    style.innerHTML = ${JSON.stringify(source)};
    document.head.appendChild(style);
  `;
  return style;
}

loader.pitch = function (remainingRequest) {
  const style = `
    const style = document.createElement("style");
    style.innerHTML = require(${loaderUtils.stringifyRequest(this, '!!' + remainingRequest)});
    document.head.appendChild(style);
  `;
  return style;
}

module.exports = loader;
