/**
 * 渲染页脚
 * @param {Element} wrap 元素 dom
 * @param {Number} opt.curPage 当前页
 * @param {Number} opt.pages 总页数
 * @param {Function} opt.callback 回调函数
 */
export const PageList = ((doc) => {
  var PageList = function (wrap, opt = {}) {
    this.wrap = doc.querySelector(wrap);
    this.curPage = opt.curPage || 1;
    this.pages = opt.pages || parseInt(this.wrap.dataset.pages) || 0;
    this.pages = Math.ceil(this.pages / (opt.pageSize || 1));
    this.pageListClick = opt.pageListClick;
    this.pageSearchBtnClick = opt.pageSearchBtnClick;
  }

  PageList.prototype = {
    init: function () {
      if (!this.wrap) {
        console.warn('pagination元素不存在');
        return;
      }

      this.initPageList();
      this.bindEvent();
    },

    initPageList: function () {
      var oList = doc.createElement('div'),
          oSearch = doc.createElement('div'),
          frag = doc.createDocumentFragment();

      oList.className = 'page-list J_pageList';
      oSearch.className = 'page-search-wrap';
      oList.innerHTML = this.renderPageList(this.curPage, this.pages);
      oSearch.innerHTML = this.pageTpl('search');
      frag.appendChild(oList);
      this.pages > 1 && frag.appendChild(oSearch);
      this.wrap.appendChild(frag);
      this.oList = oList;
      this.oSearchInput = oSearch.querySelector('.J_page-search');
      this.oSearchBtn = oSearch.querySelector('.J_page-search-btn');
    },

    bindEvent: function () {
      const { oList, oSearchBtn, oSearchInput } = this;

      oList.addEventListener('click', this.onPageListClick.bind(this));
      oSearchInput && oSearchInput.addEventListener('input', this.onPageSearchInputChange.bind(this));
      oSearchBtn && oSearchBtn.addEventListener('click', this.onPageSearchBtnClick.bind(this));
    },

    onPageSearchInputChange () {
      const { oSearchInput } = this;

      oSearchInput.value = oSearchInput.value.replace(/\D|^0/g, '');

      const { value } = oSearchInput;

      if (value) {
        this.value = value.trim();
      }
    },

    onPageSearchBtnClick () {
      const { pageSearchBtnClick, value, pages } = this;

      if (value && typeof pageSearchBtnClick === 'function') {
        const val = parseInt(value);

        if (val) {
          if (val <= pages) {
            pageSearchBtnClick(val);
            this.oSearchInput.value = this.value = '';
            return;
          }

          console.log('输入页码超过总页数');
        }
      }
    },

    onPageListClick: function (e) {
      var e = e || window.event,
          tar = e.target || e.srcElement,
          className = tar.className,
          curPage = this.curPage,
          pages = this.pages;
      const { pageListClick } = this;

      if (className) {
        switch (className) {
          case 'page-btn':
            curPage = parseInt(tar.getAttribute('data-page'));
            this.oList.innerHTML = this.renderPageList(curPage, pages);
            typeof (pageListClick) == 'function' && pageListClick(curPage, pages);
            break;
          case 'backward-btn':
            curPage--;
            this.oList.innerHTML = this.renderPageList(curPage, pages);
            typeof (pageListClick) == 'function' && pageListClick(curPage, pages);
            break;
          case 'forward-btn':
            curPage++;
            this.oList.innerHTML = this.renderPageList(curPage, pages);
            typeof (pageListClick) == 'function' && pageListClick(curPage, pages);
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
        list += this.pageTpl('btn', i, curPage);
      }
      return list;
    },

    pageTpl: function (type, num, cur, pages) {
      switch (type) {
        case 'btn':
          return num === cur ?
            '<span class="cur-page">' + num + '</span>' :
            '<a class="page-btn" data-page=' + num + '>' + num + '</a>';

        case 'points':
          return '<span class="points">……</span>';

        case 'backward':
          return cur === 1 ?
            '<span class="disabled-btn">&lt;</span>' :
            '<a class="backward-btn">&lt;</a>';

        case 'forward':
          return cur === pages ?
            '<span class="disabled-btn">&gt;</span>' :
            '<a class="forward-btn">&gt;</a>';

        case 'search':
          return ('<input type="text" placeholder="页码" class="page-search J_page-search" maxlength="5" />\
                    <button class="page-search-btn J_page-search-btn">⇨</button>');
        default:
          break;
      }
    },

    renderPageList: function (curPage, pages) {
      if (pages <= 0) {
        return '';
      }

      if (pages == 1) {
        return this.pageTpl('btn', 1, 1, 1);
      }

      var btnGroup = this.pageTpl('backward', '', curPage);

      if (pages > 8) {
        if (curPage < 3) {
          btnGroup += this.makeBtns(1, 3, curPage) +
            this.pageTpl('points') +
            this.makeBtns(pages - 1, pages, curPage);

        } else if (curPage >= 3 && curPage < 5) {
          btnGroup += this.makeBtns(1, curPage + 1, curPage) +
            this.pageTpl('points') +
            this.makeBtns(pages - 1, pages, curPage);

        } else if (curPage == 5) {
          btnGroup += this.makeBtns(1, 2, curPage) +
            this.pageTpl('points') +
            this.makeBtns(curPage - 1, curPage + 1, curPage) +
            this.pageTpl('points') +
            this.makeBtns(pages - 1, pages, curPage);

        } else if (curPage >= 6 && curPage < pages - 4) {
          btnGroup += this.makeBtns(1, 2, curPage) +
            this.pageTpl('points') +
            this.makeBtns(curPage - 2, curPage + 2, curPage) +
            this.pageTpl('points') +
            this.makeBtns(pages - 1, pages, curPage);

        } else if (curPage == pages - 4) {
          btnGroup += this.makeBtns(1, 2, curPage) +
            this.pageTpl('points') +
            this.makeBtns(curPage - 1, curPage + 1, curPage) +
            this.pageTpl('points') +
            this.makeBtns(pages - 1, pages, curPage);

        } else if (curPage >= pages - 3 && curPage <= pages - 2) {
          btnGroup += this.makeBtns(1, 2, curPage) +
            this.pageTpl('points') +
            this.makeBtns(curPage - 1, pages, curPage);

        } else if (curPage > pages - 2 && curPage <= pages) {
          btnGroup += this.makeBtns(1, 2, curPage) +
            this.pageTpl('points') +
            this.makeBtns(pages - 2, pages, curPage);
        }

      } else {
        btnGroup += this.makeBtns(1, pages, curPage);
      }

      btnGroup += this.pageTpl('forward', '', curPage, pages);

      return btnGroup;
    }
  }

  return PageList;
})(globalThis.document);
