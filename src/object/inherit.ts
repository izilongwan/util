/**
 * 圣杯继承
 * @param {Object} Org 被克隆对象
 * @param {Object} Tar 克隆对象
 * @reutrns {Object}
 */
export const inherit = (() => {
  class Buffer{}

  return (Org: { prototype: any; }, Tar: { prototype: any; }) => {
    Buffer.prototype = Org.prototype;
    Tar.prototype = new Buffer();
    Tar.prototype.constructor = Tar;
    Tar.prototype.superConstructor = Org;

    return Tar;
  }
})();
