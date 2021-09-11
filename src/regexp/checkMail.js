/**
 * 匹配邮箱
 * @param {Number} str
 */
export function checkMail (str) {
  var reg = /^[A-z0-9_\-\.]+\@[A-z0-9_\-\.]+\.[A-z0-9]{2,4}$/;
  return reg.test(str);
}
