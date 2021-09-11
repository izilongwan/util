/**
 * 圣杯继承
 * @param {Object} Org 被克隆对象
 * @param {Object} Tar 克隆对象
 * @reutrns {Object}
 */
export const inherit = (() => {
  function Buffer() {};

  return (Org, Tar = {}) => {
    Buffer.prototype = Org.prototype;
    Tar.prototype = new Buffer();
    Tar.prototype.constructor = Tar;
    Tar.prototype.superConstructor = Org;

    return Tar;
  }
})();