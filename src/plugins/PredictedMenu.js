import { addEvent } from '../element/event'
import { getPagePos } from '../element/position';
import { isPointInTriangle } from '../geometric'

/**
 * 鼠标行为预测菜单
 * @param {Element} wrap 元素
 * @param {String} mianMenu 主菜单的类名
 * @param {String} mainItem 主菜单子项的类名
 * @param {String} subMenu 子菜单的类名
 * @param {String} subItem 子菜单子项的类名
 * @param {String} mainItemCurrent 移入主菜单子项显示的新增类名
 * @param {String} subMenuShow 移入主菜单，子菜单显示新增类名
 * @param {String} subItemActive 移入主菜单子项，子菜单子项显示新增类名
 */
export const PredictedMenu = (function (win, doc) {
	var PredictedMenu = function (wrap, opt) {
		this.oWrap = doc.querySelector(wrap);
		this.oMainMenu = this.oWrap.getElementsByClassName(opt.mainMenu)[0];
		this.oMainItems = this.oWrap.getElementsByClassName(opt.mainItem);
		this.oSubMenu = this.oWrap.getElementsByClassName(opt.subMenu)[0];
		this.oSubItems = this.oWrap.getElementsByClassName(opt.subItem);
		this.mainItem = opt.mainItem;
		this.subItem = opt.subItem;
		this.subMenu = opt.subMenu;
		this.mainItemCurrent = opt.mainItemCurrent || 'cur';
		this.subItemActive = opt.subItemActive || 'active';
		this.subMenuShow = opt.subMenuShow || 'show';

		this.mousePos = [];
		this.isInSub = false;
		this.isFirstEnter = true;
		this.isLeave = false;
		this.t = null;
		this.t1 = null;
		this.toDelay = false;

		this._mouseMove = this.mouseMove.bind(this);
		this._leaveMenu = this.leaveMenu.bind(this);
		this._leaveSubmenu = this.leaveSubmenu.bind(this);
	}

	PredictedMenu.prototype = {
		init: function () {
			this.bindEvent();
		},

		bindEvent: function () {
			var _self = this;

			addEvent(this.oWrap, 'mouseenter', this.enterMenu.bind(this));
			addEvent(this.oSubMenu, 'mouseenter', this.enterSubmenu.bind(this));
			this.oMainItems._forEach(function (val) {
				addEvent(val, 'mouseenter', _self.enterMianMenu.bind(_self));
			});
		},

		enterMenu: function () {
			this.oSubMenu.classList.add(this.subMenuShow);
			addEvent(doc, 'mousemove', this._mouseMove);
			addEvent(this.oWrap, 'mouseleave', this._leaveMenu);
		},

		enterSubmenu: function () {
			this.isInSub = true;
			addEvent(this.oSubMenu, 'mouseleave', this._leaveSubmenu);
		},

		mouseMove: function (e) {
			if (!this.isInSub) {
				var e = e || win.event;
				this.mousePos.push({
					x: getPagePos(e).x,
					y: getPagePos(e).y
				});
				this.mousePos.length > 2 && this.mousePos.shift();
			}
		},

		enterMianMenu: function (e) {
			var e = e || win.event,
					tar = e.target || e.srcElement,
					idx = [].indexOf.call(this.oMainItems, tar),
					mousePosLen = this.mousePos.length,
					last = this.mousePos[mousePosLen - 2] || { x: 0, y: 0 },
					cur = this.mousePos[mousePosLen - 1] || { x: 0, y: 0 },
					_self = this;

			this.isLeave = false;
			this.toDelay = this.doTimeout(cur, last);
			this.t && clearTimeout(this.t);
			if (this.isFirstEnter) {
				_self.showMenuItem(idx);
				this.isFirstEnter = false;
				return;
			}
			if (this.toDelay) {
				this.t = setTimeout(function () {
					if (!_self.isInSub) {
						_self.t1 = setTimeout(function () {
							_self.showMenuItem(idx);
							clearTimeout(_self.t1);
							_self.t1 = null;
						}, 80);
						_self.t = null;
					}
				}, 500);
				return;
			}
			this.t1 = setTimeout(function () {
				_self.showMenuItem(idx);
				clearTimeout(this.t1);
				this.t1 = null;
			}, 80);
		},

		doTimeout: function (cur, last) {
			var menuTop = getElemPos(this.oWrap).top,
					menuLeft = getElemPos(this.oWrap).left,
					menuW = getStyle(this.oWrap, 'width'),
					menuH = getStyle(this.oWrap, 'height');

			return isPointInTriangle({
				topRightPoint: { x: menuLeft + menuW, y: menuTop },
				bottomRightPoint: { x: menuLeft + menuW, y: menuTop + menuH },
				lastPoint: last,
				curPoint: cur
			})
		},

		leaveMenu: function () {
			this.oSubMenu.classList.remove(this.subMenuShow);
			this.restoreMenuItems();
			removeEvent(doc, 'mousemove', this._mouseMove);
			removeEvent(this.oWrap, 'mouseleave', this._leaveMenu);
			this.isLeave = true;
		},

		leaveSubmenu: function () {
			this.isInSub = false;
			removeEvent(this.oSubMenu, 'mouseleave', this._leaveSubmenu);
		},

		showMenuItem: function (idx) {
			this.restoreMenuItems();
			if (!this.isLeave) {
				this.oMainItems[idx].classList.add(this.mainItemCurrent);
				this.oSubItems[idx].classList.add(this.subItemActive);
			}
		},

		restoreMenuItems: function () {
			var _self = this;
			this.oMainItems._forEach(function (val) {
				val.classList.remove(_self.mainItemCurrent);
			});
			this.oSubItems._forEach(function (val) {
				val.classList.remove(_self.subItemActive);
			});
		}
	}

	return PredictedMenu;
}(window, document));
