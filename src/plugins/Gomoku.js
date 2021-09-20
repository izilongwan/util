import { throttle } from '../function'

/**
 * 五子棋
 * @param {Element} wrap 元素
 * @param {Number} opt.gap 两条线的间隔
 * @param {Number} opt.radius 棋子半径
 */
export const Gomoku = (function (doc) {
  var Gomoku = function (wrap, opt = {}) {
    this.wrap = doc.querySelector(wrap);
    this.oCanvas = doc.createElement('canvas');
    this.gap = opt.gap || 40;
    this.hGap = this.gap / 2;
    this.radius = opt.radius || 16;
    this.column = 15;
    this.size = this.gap * this.column;

    this.allChesses = [];
    this.existChesses = [];
    this.winsCount = 0;
    this.wins = [];
    this.myWins = [];
    this.computerWins = [];
    this.player = 1;

    this._moveFocus = throttle(this.moveFocus.bind(this), 300);
		this._leaveCanvas = this.leaveCanvas.bind(this);
		this.init();
  }

  Gomoku.prototype = {
    init: function () {
      this.initChess();
      this.bindEvent();
    },

    initChess: function () {
      this.oCanvas.width = this.size;
      this.oCanvas.height = this.size;
      this.oCanvas.style.cssText = 'background-color: #dab488; box-shadow: 0 0 4px 2px #ccc';
      this.wrap.appendChild(this.oCanvas);
      this.context = this.oCanvas.getContext('2d');
      this.makeBoard();
      this.computedArrs();
    },

    makeBoard: function () {
      this.context.clearRect(0, 0, this.size, this.size);
      this.context.beginPath();
      this.context.lineWidth = 1;
      this.context.strokeStyle = '#333';

      for (var i = 0; i < 15; i++) {
        this.context.moveTo(this.hGap + i * this.gap, this.hGap);
        this.context.lineTo(this.hGap + i * this.gap, this.size - this.hGap);
        this.context.moveTo(this.hGap, this.hGap + i * this.gap);
        this.context.lineTo(this.size - this.hGap, this.hGap + i * this.gap);
        this.context.stroke();
      }
    },

    computedArrs: function () {
      for (var i = 0; i < this.column; i++) {
        this.allChesses[i] = [];
        this.wins[i] = [];
        for (var j = 0; j < this.column; j++) {
          this.allChesses[i][j] = 0;
          this.wins[i][j] = [];
        }
      }

      this.ComputedWins();

      for (var k = 0; k < this.winsCount; k++) {
        this.myWins[k] = 0;
        this.computerWins[k] = 0;
      }
    },

    ComputedWins: function () {
      for (var i = 0; i < this.column; i++) {
        for (var j = 0; j < this.column - 4; j++) {
          for (var k = 0; k < 5; k++) {
            this.wins[i][j + k][this.winsCount] = true;
          }
          this.winsCount++;
        }
      }

      for (i = 0; i < this.column; i++) {
        for (j = 0; j < this.column - 4; j++) {
          for (k = 0; k < 5; k++) {
            this.wins[j + k][i][this.winsCount] = true;
          }
          this.winsCount++;
        }
      }

      for (i = 0; i < this.column - 4; i++) {
        for (j = 0; j < this.column - 4; j++) {
          for (k = 0; k < 5; k++) {
            this.wins[i + k][j + k][this.winsCount] = true;
          }
          this.winsCount++;
        }
      }

      for (i = this.column - 1; i >= 4; i--) {
        for (j = 0; j < this.column - 4; j++) {
          for (k = 0; k < 5; k++) {
            this.wins[i - k][j + k][this.winsCount] = true;
          }
          this.winsCount++;
        }
      }
    },

    bindEvent: function () {
      addEvent(this.oCanvas, 'click', this.canvasClick.bind(this));
      addEvent(this.oCanvas, 'mouseenter', this.enterCanvas.bind(this));
    },

    canvasClick: function (e) {
      var e = e || window.event,
          i = Math.floor(e.offsetX / this.gap),
          j = Math.floor(e.offsetY / this.gap);

          if (this.allChesses[j][i]) {
            return;
          }

          this.player = 1;
          this.dropChess(i, j);
          this.player = 2;
          this.t = setTimeout(function () {
            this.dropChess();
            clearTimeout(this.t);
          }.bind(this), 200);
    },

    dropChess: function (i, j) {
      switch (this.player) {
        case 1:
          this.makeChess(i * this.gap + this.hGap, j * this.gap + this.hGap, this.player);
          this.existChesses.push({x: i, y: j, player: this.player});
          this.allChesses[j][i] = this.player;
          this.checkWin(i, j, this.myWins);
          break;
        case 2:
          this.computerAI();
          break;
        default:
          break;
			}
			var flag = this.allChesses.jEvery(function (val) {
				if (val === 0) {
					return false;
				}
			});
			if (flag) {
				this.resetAllChess();
			}
    },

    computerAI: function (){
      var myScore = [],
          computerScore = [],
          max = 0
          u = 0,
          v = 0;

      for (var i = 0; i < this.column; i++){
        myScore[i] = [];
        computerScore[i] = [];
        for (var j = 0; j < this.column; j++){
          myScore[i][j] = 0;
          computerScore[i][j] = 0;
          if(this.allChesses[j][i] == 0){
            for (var k = 0; k < this.winsCount; k++){
              if(this.wins[i][j][k]){
                switch(this.myWins[k]){
                  case 1: myScore[i][j] += 200;
                    break;
                  case 2: myScore[i][j] += 500;
                    break;
                  case 3: myScore[i][j] += 2000;
                    break;
                  case 4: myScore[i][j] += 10000;
                    break;
                  default:
                    break;
                }

                switch(this.computerWins[k]){
                  case 1: computerScore[i][j] += 220;
                    break;
                  case 2: computerScore[i][j] += 520;
                    break;
                  case 3: computerScore[i][j] += 2200;
                    break;
                  case 4: computerScore[i][j] += 20000;
                    break;
                  default:
                    break;
                }
              }
            }

            if (myScore[i][j] > max){
              max = myScore[i][j];
              u = i;
              v = j;
            } else if(myScore[i][j] == max){
              if (computerScore[i][j] > computerScore[u][v]){
                u = i;
                v = j;
              }
            }

            //进攻

            if (computerScore[i][j] > max){
              max = computerScore[i][j];
              u = i;
              v = j;
            } else if (computerScore[i][j] == max){
              if (myScore[i][j] > myScore[u][v]){
                u = i;
                v = j;
              }
            }
          }
        }
      }

      this.makeChess(u * this.gap + this.hGap, v * this.gap + this.hGap, this.player);
      this.existChesses.push({x: u, y: v, player: this.player});
      this.allChesses[v][u] = this.player;
      this.checkWin(u, v, this.computerWins);
    },

    makeChess: function (x, y, player) {
      var grd = this.context.createRadialGradient(x - 3, y, 10, x + 6, y - 4, 0),
          startColor = '',
          endColor = '',
          strokeColor = '';

      if (player == 1) {
        startColor = '#0a0a0a';
        endColor = '#636766';
        strokeColor = '#333';
      } else if (player == 2) {
        startColor = '#d1d1d1';
        endColor = '#f9f9f9';
        strokeColor = '#ccc';
      }
      grd.addColorStop(0, startColor);
      grd.addColorStop(1, endColor);
      this.context.fillStyle = grd;
      this.context.strokeStyle = strokeColor;
      this.context.beginPath();
      this.context.arc(x, y, this.radius, 0, Math.PI * 2, false);
      this.context.fill();
      this.context.stroke();
    },

    checkWin: function (u, v, arr) {
      for(var k = 0; k < this.winsCount; k++){
        if(this.wins[u][v][k]){
          arr[k]++;
          if(arr[k] == 5){
            alert((this.player === 1 ? '~ You' : '~ Computer') + ' Win!');
            this.resetAllChess();
          }
        }
      }
    },

    resetAllChess: function () {
      this.allChesses = [];
      this.existChesses = [];
      this.winsCount = 0;
      this.wins = [];
      this.myWins = [];
      this.computerWins = [];
      this.player = 1;

      this.initBoard();
      this.computedArrs();
    },

    enterCanvas: function () {
      addEvent(this.oCanvas, 'mousemove', this._moveFocus);
      addEvent(this.oCanvas, 'mouseleave', this._leaveCanvas);
    },

    moveFocus: function (e) {
      var e = e || window.event,
          i = Math.floor(e.offsetX / this.gap),
          j = Math.floor(e.offsetY / this.gap);

      this.renderChess();
      if (!this.allChesses[j][i]) {
        this.context.beginPath();
        this.context.strokeStyle = '#f00';
        this.context.lineWidth = 5;
        this.context.lineCap = 'round';

        this.context.moveTo(i * this.gap + this.hGap - 12, j * this.gap + this.hGap);
        this.context.lineTo(i * this.gap + this.hGap + 12, j * this.gap + this.hGap);
        this.context.moveTo(i * this.gap + this.hGap, j * this.gap + this.hGap - 12);
        this.context.lineTo(i * this.gap + this.hGap, j * this.gap + this.hGap + 12);
        this.context.stroke();
      }
    },

    renderChess: function () {
      this.makeBoard();
      var len = this.existChesses.length,
          item = null;

      for (var i = 0; i < len; i++) {
        item = this.existChesses[i];
        this.makeChess(item.x * this.gap + this.hGap, item.y * this.gap + this.hGap, item.player);
      }
    },

    leaveCanvas: function () {
      removeEvent(this.oCanvas, 'mousemove', this._moveFocus);
      removeEvent(this.oCanvas, 'mouseleave', this._leaveCanvas);
      this.t = setTimeout(function () {
        this.renderChess();
        clearTimeout(this.t);
      }.bind(this), 300);
    }
  }

  return Gomoku;
})(globalThis.document);
