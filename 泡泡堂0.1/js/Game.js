(function(){
	var Game = window.Game = function(){
		this.canvas = document.getElementById("canvas");
		this.ctx = this.canvas.getContext("2d");
		this.f = 0;
		//炸弹泡泡数组
		this.paopaoArr = [];
		//最底层地图1,地板
		this.diceng1 = [
			
			[0,0,0,3,3,3,0,0,0],
			[0,0,0,2,5,2,0,0,0],
			[0,0,0,2,5,2,0,0,0],
			[0,0,0,2,5,2,0,0,0],
			[0,0,0,2,5,2,0,0,0],
			[0,0,0,2,5,2,0,0,0],
			[0,0,0,3,3,3,0,0,0]
		];
		//最底层地图1,纯障碍物
		this.diceng2 = [
			
			[0,0,4,0,0,0,4,0,0],
			[0,0,0,0,0,0,0,1,0],
			[2,0,4,0,0,0,0,0,0],
			[0,4,0,0,0,0,0,4,0],
			[0,0,0,0,0,0,4,0,2],
			[0,3,0,0,0,0,0,0,0],
			[0,0,4,0,0,0,4,0,0]
		];
		this.R = {
			"p1" : "images/p1f.png",					//玩家
			"ai" : "images/aif.png",					//AI
			"xiaochu" : "images/xiaochu.png",			//草丛
			"di" : "images/di.png",						//地板
			"fangziheshu" : "images/fangziheshu.png",	//房子	
			"paopao" : "images/paopao.png",				//泡泡		
			"liwupao" : "images/liwupao1.png",			//礼物泡泡			
			"liwuxie" : "images/liwuxie1.png",			//礼物鞋子	
			"liwuyao" : "images/liwuyao1.png",			//礼物药水					
			"baozha"  :	"images/baozha.png"	,			//爆炸动画
			"siwang"  : "images/siwang.png"				//死亡动画
		}
		this.Robj = {};
		var amount = _.keys(this.R).length;
		var already = 0;
		var self = this;

		for(var k in this.R){
			this.Robj[k] = new Image();
			this.Robj[k].src = this.R[k];
			this.Robj[k].onload = function(){
				already++;
				//清屏
				self.ctx.clearRect(0, 0, self.canvas.width, self.canvas.height);
				//显示当前加载了都少张
				self.ctx.fillText("正在加载资源" + already + "/" + amount , 10, 20);
				//当已经加载好的图片个数，和所有图片个数一样，说明都好了，开始游戏
				if(already == amount){
					self.start();
				}
			}
		}

		Game.prototype.start = function(){
			//地图实例
			this.map = new Map();
			//玩家实例
			this.p1 = new P1();
			//ai实例
			this.ai = new Ai();
			//主循环开始
			this.timer = setInterval(function(){
				g.mainloop();
			},20);
		}
		//主循环
		Game.prototype.mainloop = function(){
			this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
			this.f++;
			//渲染地图，底层2层，可消除一层
			this.map.render();
			//渲染玩家
			this.p1.render();
			this.ai.render();
			//渲染炸弹泡泡
			if(this.paopaoArr.length != 0){
				for(var p = 0; p<this.paopaoArr.length;p++){
					this.paopaoArr[p].render();
					// this.p1.render();
					// console.log();
				}
			}
			this.p1.checkdeth();
			this.ai.checkdeth();
		}
		















	};
})();