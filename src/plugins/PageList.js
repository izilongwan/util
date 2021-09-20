import { addEvent } from '../element/event'

/**
 * 渲染页脚
 * @param {Element} wrap 元素 dom
 * @param {Number} opt.curPage 当前页
 * @param {Number} opt.pages 总页数
 * @param {Function} opt.callback 回调函数
 */
export const PageList = (function (doc) {
	var PageList = function (wrap, opt) {
		this.wrap = doc.querySelector(wrap);
		this.curPage = opt.curPage || 1;
		this.pages = opt.pages || 0;
	}

	PageList.prototype = {
		init: function () {
			this.initPageList();
			this.bindEvent();
		},

		initPageList: function () {
			var oDiv = doc.createElement('div');
			oDiv.className = 'page-list J_pageList';
			oDiv.innerHTML = this.renderPageList(this.curPage, this.pages);
			this.wrap.appendChild(oDiv);
			this.elem = doc.querySelector('.J_pageList');
		},

		bindEvent: function () {
			addEvent(this.elem, 'click', this.pageListClick.bind(this));
		},


		pageListClick: function (e) {
			var e = e || window.event,
					tar = e.target || e.srcElement,
					className = tar.className,
					curPage = this.curPage,
					pages = this.pages;

			if (className) {
				switch (className) {
					case 'page-btn':
						curPage = parseInt(tar.getAttribute('data-page'));
						this.elem.innerHTML = this.renderPageList(curPage, pages);
						typeof (callback) == 'function' && callback();
						break;
					case 'backward-btn':
						curPage--;
						this.elem.innerHTML = this.renderPageList(curPage, pages);
						typeof (callback) == 'function' && callback();
						break;
					case 'forward-btn':
						curPage++;
						this.elem.innerHTML = this.renderPageList(curPage, pages);
						typeof (callback) == 'function' && callback();
						break;
					default:
						break;
				}
				this.curPage = curPage;
				this.pages = pages;
			}
		},

		makeBtns: function (start, end, curPage) {
			var list = '';
			for (var i = start; i <= end; i++) {
				list += this.pageBtnTpl('btn', i, curPage);
			}
			return list;
		},

		pageBtnTpl: function (type, num, cur, pages) {
			switch (type) {
				case 'btn':
					return num === cur ?
						'<span class="cur-page">' + num + '</span>' :
						'<a class="page-btn" data-page=' + num + '>' + num + '</a>';
					break;
				case 'points':
					return '<span class="points">…</span>';
				case 'backward':
					return cur === 1 ?
						'<span class="disabled-btn">&lt;</span>' :
						'<a class="backward-btn">&lt;</a>';
				case 'forward':
					return cur === pages ?
						'<span class="disabled-btn">&gt;</span>' :
						'<a class="forward-btn">&gt;</a>';
					break;
				default:
					break;
			}
		},

		renderPageList: function (curPage, pages) {
			if (pages <= 0) {
				return '';
			}

			if (pages == 1) {
				return this.pageBtnTpl('btn', 1, 1, 1);
			}

			var btnGroup = this.pageBtnTpl('backward', '', curPage);
			if (pages > 8) {
				if (curPage < 3) {
					btnGroup += this.makeBtns(1, 3, curPage) +
						this.pageBtnTpl('points') +
						this.makeBtns(pages - 1, pages, curPage);
				} else if (curPage >= 3 && curPage < 5) {
					btnGroup += this.makeBtns(1, curPage + 1, curPage) +
						this.pageBtnTpl('points') +
						this.makeBtns(pages - 1, pages, curPage);
				} else if (curPage == 5) {
					btnGroup += this.makeBtns(1, 2, curPage) +
						this.pageBtnTpl('points') +
						this.makeBtns(curPage - 1, curPage + 1, curPage) +
						this.pageBtnTpl('points') +
						this.makeBtns(pages - 1, pages, curPage);
				} else if (curPage >= 6 && curPage < pages - 4) {
					btnGroup += this.makeBtns(1, 2, curPage) +
						this.pageBtnTpl('points') +
						this.makeBtns(curPage - 2, curPage + 2, curPage) +
						this.pageBtnTpl('points') +
						this.makeBtns(pages - 1, pages, curPage);
				} else if (curPage == pages - 4) {
					btnGroup += this.makeBtns(1, 2, curPage) +
						this.pageBtnTpl('points') +
						this.makeBtns(curPage - 1, curPage + 1, curPage) +
						this.pageBtnTpl('points') +
						this.makeBtns(pages - 1, pages, curPage);
				} else if (curPage >= pages - 3 && curPage <= pages - 2) {
					btnGroup += this.makeBtns(1, 2, curPage) +
						this.pageBtnTpl('points') +
						this.makeBtns(curPage - 1, pages, curPage);
				} else if (curPage > pages - 2 && curPage <= pages) {
					btnGroup += this.makeBtns(1, 2, curPage) +
						this.pageBtnTpl('points') +
						this.makeBtns(pages - 2, pages, curPage);
				}
			} else {
				btnGroup += this.makeBtns(1, pages, curPage);
			}
			return btnGroup += this.pageBtnTpl('forward', '', curPage, pages);
		}
	}

	return PageList;
})(globalThis.document);
