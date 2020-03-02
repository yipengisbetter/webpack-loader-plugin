function loader(source) {
  let pos = 0;
  let current;
  const reg = /url\((.+?)\)/g;
  const arr = ['const list = []'];
  while (current = reg.exec(source)) {
    const [match, matchUrl] = current;
    const last = reg.lastIndex - match.length;
    arr.push(`list.push(${JSON.stringify(source.slice(pos, last))})`);
    arr.push(`list.push('url('+require(${matchUrl})+')')`);
    pos = reg.lastIndex;
  }
  arr.push(`list.push(${JSON.stringify(source.slice(pos))})`);
  arr.push(`module.exports=list.join('')`);
  return arr.join('\r\n');
}

module.exports = loader;
