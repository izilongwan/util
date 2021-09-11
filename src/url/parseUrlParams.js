/**
 * 解析URL参数
 * @param {String} url
 * @returns {Object}
 */
export function parseUrlParams(url = '') {
  const [host, args] = url.split('?')
  const values = args.split('&');

  return values.reduce((prev, curr) => {
    let [key, value] = curr.split('=');

    value = decodeURIComponent(value);
    value = isNaN(parseFloat(value)) ? value : parseFloat(value);

    prev[key] = prev.hasOwnProperty(key)
      ? [].cancat(prev[key], value)
      : value;

    return prev;
  }, { host })
}