/**
 * 左边的__proto__上是否有右边的prototype
 * @param {Object} tar 目标值
 * @param {Object} org 原始的
 * @returns {Boolean}
 */
export function myInstanceOf(tar, org) {
  var originPrototype = org.prototype,
      theProto = Object.getPrototypeOf(tar);

  while (theProto !== originPrototype) {

    if (theProto === null) {
      return false;
    }

    theProto = Object.getPrototypeOf(theProto);
  }

  return true;
}
