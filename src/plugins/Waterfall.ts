// import { xhr } from '..';
// import { getStyle } from '../element';
// import { addEvent } from '../element/event'
// import { getClientPort, getScrollOffset, getScrollSize } from '../element/position';
// import { throttle, debounce } from '../func'
// import { ICommonObject } from '../types/typing';

// /**
//  * 图片瀑布流
//  * @param {Element} wrap 元素
//  * @param {String} opt.url 地址
//  * @param {Number} opt.column 列数
//  * @param {Number} opt.gap 图片间隙
//  * @param {Boolean} opt.infinity 无限瀑布流
//  */
// export const Waterfall = (function(doc, win) {
//   var t: NodeJS.Timeout | null = null;
//   var Waterfall = function(this: ICommonObject, wrap: string, opt: ICommonObject= {}) {
//     this.oWrap = doc.querySelector(wrap);
//     this.column = opt.column || 6;
//     this.gap = opt.gap || 10;
//     this.API = opt.url;
//     this.infinity = opt.infinity || false;

//     this.pages = 0;
//     this.curPage = 0;
//     this.idx = 0;
//     this.cache = [];
//     this.heightArr = [];
//     if (!this.API) {
//       throw new Error('url未填写');
// 		}

// 		this.init();
//   };

//   Waterfall.prototype = {
//     init: function() {
//       this.bindEvent();
//       this.getImgDatas(this.curPage);
//       t = setTimeout(function() {
//         win.scroll(0, 0);
//         clearTimeout(t!);
//         t = null;
//       }, 400);
//     },

//     bindEvent: function() {
// 			var _moreImagDatas = throttle(this.moreImgDatas, 500).bind(this),
// 					_resetWaterfall = debounce(this.resetWaterfall, 500).bind(this);

// 			addEvent(<HTMLElement><unknown>win, 'scroll', _moreImagDatas);
// 			addEvent(<HTMLElement><unknown>win, 'resize', _resetWaterfall);
//     },

//     moreImgDatas: function() {
//       if (getClientPort().h + getScrollOffset().y >= getScrollSize().h) {
//         this.curPage++;

//         if (this.curPage <= this.pages - 1) {
//           this.getImgDatas(this.curPage);
//         } else if (this.infinity){
//           this.renderImgs(this.cache[this.idx]);
//           this.idx = this.idx === this.pages - 1
//                    ? 0
//                    : this.idx + 1;
//         }
//       }
//     },

//     getImgDatas: function(curPage: number) {
//       var _self = this;
//       (<any>xhr).ajax({
//         url: this.API,
//         type: 'POST',
//         data: {
//           pageNum: curPage
//         },
//         success: function(data: any) {
//           var res = JSON.parse(data.pageData);
//           _self.pages = data.pageSize;
//           _self.renderImgs(res, curPage);
//           _self.infinity && _self.cache.push(res);
//         }
//       });
//     },

//     renderImgs: function(this: ICommonObject, data: {width: number, height: number, img: string}[], curPage: number) {
// 			var oFrag = doc.createDocumentFragment(),
// 					wrapWidth = getStyle(this.oWrap, 'width'),
// 					liWidth = Math.round((wrapWidth - this.gap * (this.column - 1)) / this.column),
// 					liHeight = 0,
// 					oLi = null,
// 					oImg = null,
// 					minIdx = 0;

//       data.forEach((val, idx) => {
// 				liHeight = Math.round((liWidth * val.height) / val.width);
// 				oLi = doc.createElement('li');
// 				const liStyle: ICommonObject = oLi.style;
//         liStyle.position = 'absolute';
//         liStyle.width = liWidth + 'px';
//         liStyle.height = liHeight + 'px';
//         oImg = new Image();
//         oImg.src = val.img;
//         oLi.appendChild(oImg);
//         oFrag.appendChild(oLi);

//         if (this.column > idx && curPage === 0) {
//           liStyle.top = 0;
// 					liStyle.left = (liWidth + this.gap) * idx + 'px';
//           this.heightArr.push(liHeight + this.gap);
//         } else {
//           minIdx = this.getArrIdx(this.heightArr);
//           liStyle.left = (liWidth + this.gap) * minIdx + 'px';
//           liStyle.top = this.heightArr[minIdx] + 'px';
//           this.heightArr[minIdx] += liHeight + this.gap;
//         }
//         (<any>oImg.style).opacity = 1;
//       }, this);
// 			this.oWrap.style.height = Math.max.apply(null, this.heightArr) + 'px';
// 			this.oWrap.appendChild(oFrag);
//     },

//     getArrIdx: function(arr: number[]) {
//       return ([].indexOf as any).call(arr, Math.min.apply(null, arr));
// 		},

// 		resetWaterfall: function() {
// 			this.oWrap.innerHTML = '';
// 			this.heightArr = [];
//       this.curPage = 0;
//       this.cache = [];
//       this.idx = 0;
// 			this.getImgDatas(this.curPage);
// 		}
//   };

//   return Waterfall;
// })(globalThis.document, globalThis.window);
