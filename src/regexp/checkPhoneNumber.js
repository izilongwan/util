/**
 * 匹配手机号
 * @param {Number} str
 */
export function checkPhoneNumber (str) {
  var reg = /^(\(\+86\))?1[3-9]\d{9}$/;
  return reg.test(str);
}
