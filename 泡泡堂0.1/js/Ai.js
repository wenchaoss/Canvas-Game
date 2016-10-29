(function(){
	var Ai = window.Ai = function(){
		//44*59  ren
		//54*66  Ai
		this.row = 1;
		this.cow = 0;
		this.dirction = 1;
		//自己最大的泡泡数
		this.maxpaopao = 3;
		//当前已放泡泡数
		this.onpaopao = 0;
		//爆炸范围
		this.fanwei = 1;
		//是否在走路
		this.onmove = 0;
		//信号量 走路
		this.zlfram = 0;
		this.zlidx = 0;
		this.det = 0;

		//死亡信号量
		this.dfram = 0;
		this.didx = 0;
		this.death = false;
		// 绑定监听。
		// keycode 37 = Left ←
		// keycode 38 = Up ↑
		// keycode 39 = Right →
		// keycode 40 = Down ↓
		var self = this;
		document.addEventListener("keydown",function(event){
			//wasd运动，k放炸弹
			if(self.onmove == 0){
				if(event.keyCode == 87){
					self.dirction = 0;
					self.onmove = 1;
				}else if(event.keyCode == 83){
					self.dirction = 1;
					self.onmove = 1;
				}else if(event.keyCode == 65){
					self.dirction = 2;
					self.onmove = 1;
				}else if(event.keyCode == 68){
					self.dirction = 3;
					self.onmove = 1;
				}else if(event.keyCode == 75){
					if(self.onpaopao<self.maxpaopao){
						var paopao = new Paopao(self);
						self.onpaopao++;
					}
				}
			}
		},false);
	}
	//渲染人的位置
	Ai.prototype.render = function(){
		//静稳0，移动1，死亡2
		if(this.onmove == 0){
			g.ctx.drawImage(g.Robj["ai"],0,this.dirction*66,54,66,this.cow*40-7,this.row*40-26,54,66);
			this.zlfram = 0;
			// this.checkdeth();
		}else if(this.onmove == 1){
			this.move();
			// this.checkdeth();
		}else{
			this.gg();
		}
	}
	//检查是否被炸死
	Ai.prototype.checkdeth = function(){
		if(g.map.boommap[this.row][this.cow+1]==1 || g.map.boommap[this.row][this.cow+1]==3){
			// console.log("炸死了");
			this.death = true;
			// this.gg();
			this.onmove = 2;
		}
	}

	//死亡动画
	Ai.prototype.gg = function(){
		
		this.dfram ++;
		if((this.dfram%10 == 0)&&(this.dfram <=100)){
			if(this.didx >8){
				this.didx = 8;
			}else{
				this.didx++;
			}
			// console.log(this.idx)
		}
		
			g.ctx.drawImage(g.Robj["siwang"],68*this.didx,0,68,68,this.cow*40-14,this.row*40-28,68,68);
		
	}

	// 走路动画
	Ai.prototype.move = function(){
		// console.log(222)
		//按2下走一个40px
		//0上   1下   2左   3右
		if(this.dirction ==0){
			if(g.map.boommap[this.row-1][this.cow+1]!=2&&g.map.shangceng[this.row-1][this.cow+1]==0||(this.row != 2 && g.map.shangceng[this.row-1][this.cow+1]==1 && g.map.shangceng[this.row-2][this.cow+1] == 0)){
				
				this.zlfram++;
				if((this.zlfram%5 == 0)){
					if(this.zlidx >4){
						this.zlidx = 0;
					}else{
						this.zlidx++;
					}
				}
				if(this.zlfram - this.det <=20){
					g.ctx.drawImage(g.Robj["ai"],this.zlidx*54,this.dirction*66,54,66,this.cow*40-7,this.row*40-26-this.zlfram*2,54,66);
					//推箱子
					if((this.row != 2 && g.map.shangceng[this.row-1][this.cow+1]==1 && g.map.shangceng[this.row][this.cow+1] == 0)){
						g.ctx.drawImage(g.Robj["xiaochu"],40,0,40,57,this.cow*40,this.row*40-17-40-this.zlfram*2,40,57);
					}

				}else{
					this.row--;
					g.ctx.drawImage(g.Robj["ai"],0,this.dirction*66,54,66,this.cow*40-7,this.row*40-26,54,66);
					if((g.map.shangceng[this.row][this.cow+1]==1 && g.map.shangceng[this.row+1][this.cow+1] == 0)){
						//原来位置成0
						g.map.pmap[this.row][this.cow+1] = g.map.shangceng[this.row][this.cow+1] =0;
						//推上去的位置成1
						g.map.pmap[this.row-1][this.cow+1] = g.map.shangceng[this.row-1][this.cow+1] =1;
					}
					this.onmove = 0;
					this.render();
				}
			}else{
				this.onmove = 0;
				this.render();
			}
		}else if(this.dirction ==1){
			if(g.map.boommap[this.row+1][this.cow+1]!=2&&g.map.shangceng[this.row+1][this.cow+1]==0 || (this.row != 7 && g.map.shangceng[this.row+1][this.cow+1]==1 && g.map.shangceng[this.row+2][this.cow+1]==0)){
				this.zlfram++;
				if((this.zlfram%5 == 0)){
					if(this.zlidx >4){
						this.zlidx = 0;
					}else{
						this.zlidx++;
					}
				}
				if(this.zlfram <=20){
					g.ctx.drawImage(g.Robj["ai"],this.zlidx*54,this.dirction*66,54,66,this.cow*40-7,this.row*40-26+this.zlfram*2,54,66);
					//推箱子
					if((this.row != 7 && g.map.shangceng[this.row+1][this.cow+1]==1 && g.map.shangceng[this.row+2][this.cow+1]==0)){
						g.ctx.drawImage(g.Robj["xiaochu"],40,0,40,57,this.cow*40,this.row*40-17+40+this.zlfram*2,40,57);
					}

				}else{
					this.row++;
					g.ctx.drawImage(g.Robj["ai"],0,this.dirction*66,54,66,this.cow*40-7,this.row*40-26,54,66);
					if((g.map.shangceng[this.row][this.cow+1]==1 && g.map.shangceng[this.row+1][this.cow+1] == 0)){
						//原来位置成0
						g.map.pmap[this.row][this.cow+1] = g.map.shangceng[this.row][this.cow+1] =0;
						//推上去的位置成1
						g.map.pmap[this.row+1][this.cow+1] = g.map.shangceng[this.row+1][this.cow+1] =1;
					}
					this.onmove = 0;
					this.render();
				}

			}else{
				this.onmove = 0;
				this.render();
			}
		}else if(this.dirction ==2){
			if(g.map.boommap[this.row][this.cow]!=2&&g.map.shangceng[this.row][this.cow]==0 || (this.cow!=1&&g.map.shangceng[this.row][this.cow]==1)&&g.map.shangceng[this.row][this.cow-1]==0){
				this.zlfram++;
				if((this.zlfram%5 == 0)){
					if(this.zlidx >4){
						this.zlidx = 0;
					}else{
						this.zlidx++;
					}
				}
				if(this.zlfram <=20){
					g.ctx.drawImage(g.Robj["ai"],this.zlidx*54,this.dirction*66,54,66,this.cow*40-7-this.zlfram*2,this.row*40-26,54,66);
					//推箱子
					if((this.cow!=1&&g.map.shangceng[this.row][this.cow]==1)&&g.map.shangceng[this.row][this.cow-1]==0){
						g.ctx.drawImage(g.Robj["xiaochu"],40,0,40,57,this.cow*40-40-this.zlfram*2,this.row*40-17,40,57);
					}

				}else{
					this.cow--;
					g.ctx.drawImage(g.Robj["ai"],0,this.dirction*66,54,66,this.cow*40-7,this.row*40-26,54,66);
					if((g.map.shangceng[this.row][this.cow+1]==1 && g.map.shangceng[this.row+1][this.cow+2] == 0)){
						//原来位置成0
						g.map.pmap[this.row][this.cow+1] = g.map.shangceng[this.row][this.cow+1] =0;
						//推上去的位置成1
						g.map.pmap[this.row][this.cow] = g.map.shangceng[this.row][this.cow] =1;
					}
					this.onmove = 0;
					this.render();
				}

			}else{
				this.onmove = 0;
				this.render();
			}
		}else if(this.dirction ==3){
			if(g.map.boommap[this.row][this.cow+2]!=2&&g.map.shangceng[this.row][this.cow+2]==0 || (this.cow!=9&&g.map.shangceng[this.row][this.cow+2]==1)&&g.map.shangceng[this.row][this.cow+3]==0){
				this.zlfram++;
				if((this.zlfram%5 == 0)){
					if(this.zlidx >4){
						this.zlidx = 0;
					}else{
						this.zlidx++;
					}
				}
				if(this.zlfram <=20){
					g.ctx.drawImage(g.Robj["ai"],this.zlidx*54,this.dirction*66,54,66,this.cow*40-7+this.zlfram*2,this.row*40-26,54,66);
					//推箱子
					if((this.cow!=9&&g.map.shangceng[this.row][this.cow+2]==1)&&g.map.shangceng[this.row][this.cow+3]==0){
						g.ctx.drawImage(g.Robj["xiaochu"],40,0,40,57,this.cow*40+40+this.zlfram*2,this.row*40-17,40,57);
					}

				}else{
					this.cow++;
					g.ctx.drawImage(g.Robj["ai"],0,this.dirction*66,54,66,this.cow*40-7,this.row*40-26,54,66);
					if((g.map.shangceng[this.row][this.cow+1]==1 && g.map.shangceng[this.row][this.cow+2] == 0)){
						//原来位置成0
						g.map.pmap[this.row][this.cow+1] = g.map.shangceng[this.row][this.cow+1] =0;
						//推上去的位置成1
						g.map.pmap[this.row][this.cow+2] = g.map.shangceng[this.row][this.cow+2] =1;
					}
					this.onmove = 0;
					this.render();
				}

			}else{
				this.onmove = 0;
				this.render();
			}
		}
	}
})();