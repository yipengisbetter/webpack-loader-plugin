const less = require('less');

function loader(source) {
  let css;
  less.render(source, function (err, res) {
    if (err) {
      console.log(err);
    } else {
      css = res.css;
    }
  });
  return css;
}

module.exports = loader;
