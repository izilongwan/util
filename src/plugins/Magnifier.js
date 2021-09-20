import { addEvent } from '../element/event'
import { getElemPos, getPagePos } from '../element/position';

/**
 * 放大镜
 * @param {Element} elem 元素
 * @param {String} opt.mode 放大模式 inner/outer
 * @param {String} opt.imgUrl 图片地址
 * @param {String} opt.magnifierImgUrl 放大图片地址
 * @param {Number} opt.scale 放大因数
 * @param {Number} opt.magnifierWidth 放大镜宽度
 * @param {Number} opt.magnifierHeight 放大镜高度
 * @param {Number} opt.outerWidth 外部图片宽度
 * @param {Number} opt.outerHeight 外部图片高度
 * @param {Numberr} opt.outerTop 以图片右上方为原点，外部图片
 * @param {Number} opt.outerLeft 以图片左上方为原点，外部图片
 */
export const Magnifier = (function (doc, win) {
	var Magnifier = function (elem, opt = {}) {
		if (!opt.imgUrl) {
			throw new Error('图片地址未填写！')
		}
		this.elem = doc.querySelector(elem);
		this.elemWidth = getStyle(this.elem, 'width');
		this.elemHeight = getStyle(this.elem, 'height');
		this.mode = opt.mode || 'inner';
		this.scale = opt.scale || 1.5;
		this.imgUrl = opt.imgUrl;
		this.magnifierImgUrl = opt.magnifierImgUrl || opt.imgUrl;
		this.opt = opt;
    this._moveWrap = this.moveWrap.bind(this);
		this._leaveWrap = this.leaveWrap.bind(this);

		this.init();
	}

	Magnifier.prototype = {
		init: function () {
			this.bindEvent();
			this.initMode();
			this.getElement();
		},

		initMode: function () {
			if (this.mode === 'inner') {
				this.magnifierWidth = (this.opt.magnifierWidth || 200) / this.scale;
				this.magnifierHeight = (this.opt.magnifierHeight || 200) / this.scale;
			} else {
				this.magnifierWidth = this.opt.magnifierWidth || 180;
				this.magnifierHeight = this.opt.magnifierHeight || 180;
				this.outerTop = this.opt.outerTop || 0;
				this.outerLeft = (this.opt.outerLeft || 20) + this.elemWidth;
				this.outerWidth = this.opt.outerWidth || 300;
				this.outerHeight = this.opt.outerHeight || 300;
			}
			this.maxX = this.elemWidth - this.magnifierWidth;
      this.maxY = this.elemHeight - this.magnifierHeight;
      this.hMagW = this.magnifierWidth / 2,
      this.hMagH = this.magnifierHeight / 2,
			this.createElement();
		},

		createElement: function () {
			let html = '<div class="J_myMagnifierWrap" \
                  style="position: relative;\
                  width: ' + this.elemWidth + 'px; \
                  height: ' + this.elemHeight + 'px; ">\
                  <img style="display:block; height: 100%" \
                  src="' + this.imgUrl + '" />\
                  <span class="J_myMagnifier" \
                  style="display: none; position: absolute; top: 0; left: 0; box-shadow: 0 0 8px 1px #ccc; cursor: move; overflow: hidden; \
                  width: ' + this.magnifierWidth + 'px; \
                  height: ' + this.magnifierHeight + 'px; ">\
                  <img class="J_myAbsImg" \
                  style="position: absolute; top: 0; left: 0; \
                  width: ' + this.elemWidth + 'px; \
                  height: ' + this.elemHeight + 'px"\
                  src="'+ this.imgUrl + '" />\
                  </span>\
                  </div>';
      this.elem.innerHTML = html;
		},

		getElement: function () {
      this.oMagnifierWrap = this.elem.querySelector('.J_myMagnifierWrap');
			this.oMagnifier = this.elem.querySelector('.J_myMagnifier');
			this.oAbsImg = this.elem.querySelector('.J_myAbsImg');
			if (this.mode === 'outer') {
        var oDiv = doc.createElement('div');

        oDiv.className = 'J_myOuterWrap';
        oDiv.style.cssText = 'display: none;position: absolute; border: 1px solid #ccc; overflow: hidden;\
          top:' + this.outerTop + 'px; \
          left:' + this.outerLeft + 'px; \
          width: ' + this.outerWidth + 'px; \
          height: ' + this.outerHeight + 'px; \
          ';
        this.oMagnifier.style.backgroundColor = 'rgba(0, 0, 0, .4)';
        this.oMagnifier.style.boxShadow = 'none';
        this.oAbsImg.style.width = this.elemWidth * this.scale + 'px';
        this.oAbsImg.style.height = this.elemHeight * this.scale + 'px';
        this.width = this.elemWidth * this.scale - this.outerWidth;
        this.height = this.elemHeight * this.scale - this.outerHeight;
        oDiv.appendChild(this.oAbsImg);
        this.oMagnifierWrap.appendChild(oDiv);
        this.oOuterWrap = this.elem.querySelector('.J_myOuterWrap');
			}
		},

		bindEvent: function () {
			addEvent(this.elem, 'mouseenter', this.enterWrap.bind(this));
		},

		magnifierStatus: function (status) {
			if (this.mode === 'inner') {
        this.oMagnifier.style.display = status ? 'block' : 'none';
			} else {
				if (status) {
					this.oMagnifier.style.display = 'block';
					this.oOuterWrap.style.display = 'block';
				} else {
					this.oMagnifier.style.display = 'none';
					this.oOuterWrap.style.display = 'none';
				}
			}
    },

		enterWrap: function () {
      addEvent(this.elem, 'mousemove', this._moveWrap);
			addEvent(this.elem, 'mouseleave', this._leaveWrap);
      this.magnifierStatus(true);
		},

		moveWrap: function (e) {
			var e = e || win.event,
          x = getPagePos(e).x - getElemPos(this.elem).left - this.hMagW,
          y = getPagePos(e).y - getElemPos(this.elem).top - this.hMagH;
          // x = e.offsetX - this.hMagW,
          // y = e.offsetY - this.hMagH;

			if (x <= 0) {
				x = 0;
			} else if (x >= this.maxX) {
				x = this.maxX;
			}

			if (y <= 0) {
				y = 0;
			} else if (y >= this.maxY) {
				y = this.maxY;
			}

			if (this.mode === 'inner') {
        this.oMagnifier.style.transform = 'translate(' + x + 'px, ' + y + 'px) scale(' + this.scale + ')';
        this.oAbsImg.style.transform = 'translate(-' + x + 'px, -' + y + 'px)';
			} else {
        this.oMagnifier.style.transform = 'translate(' + x + 'px, ' + y + 'px)';
        this.oAbsImg.style.transform = '\
          translate(\
            -' + (x / this.maxX * this.width) + 'px, \
            -' + (y / this.maxY * this.height) + 'px\
          )';
      }
		},

		leaveWrap: function () {
			removeEvent(this.elem, 'mousemove', this._moveWrap);
			removeEvent(this.elem, 'mouseleave', this._leaveWrap);
      this.magnifierStatus(false);
		}
	}

	return Magnifier;
})(globalThis.document, globalThis.window);
